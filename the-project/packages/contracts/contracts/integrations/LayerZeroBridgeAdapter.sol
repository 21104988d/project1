// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../interfaces/IBridgeAdapter.sol";
import "../interfaces/ILayerZeroEndpoint.sol";

/**
 * @title LayerZeroBridgeAdapter
 * @dev Adapter for LayerZero cross-chain bridging
 */
contract LayerZeroBridgeAdapter is Ownable, ReentrancyGuard, IBridgeAdapter {
    using SafeERC20 for IERC20;

    struct BridgeParams {
        uint16 dstChainId;
        address token;
        uint256 amount;
        address recipient;
        bytes adapterParams;
    }

    ILayerZeroEndpoint public immutable lzEndpoint;

    // Mapping of chain ID to trusted remote address
    mapping(uint16 => bytes) public trustedRemoteLookup;

    // Mapping of token to supported status
    mapping(address => bool) public supportedTokens;

    // Events
    event TokenBridged(
        uint16 indexed dstChainId,
        address indexed token,
        uint256 amount,
        address indexed recipient,
        bytes32 txHash
    );

    event BridgeInitiated(
        uint16 indexed dstChainId,
        address indexed token,
        uint256 amount,
        address indexed recipient,
        address sender
    );

    event TrustedRemoteSet(uint16 indexed chainId, bytes trustedRemote);
    event TokenSupportUpdated(address indexed token, bool supported);

    constructor(address _lzEndpoint) Ownable(msg.sender) {
        require(_lzEndpoint != address(0), "Invalid LayerZero endpoint");
        lzEndpoint = ILayerZeroEndpoint(_lzEndpoint);
    }

    /**
     * @dev Bridge tokens to another chain via LayerZero
     */
    function bridgeToken(BridgeParams calldata params) external payable nonReentrant {
        require(trustedRemoteLookup[params.dstChainId].length > 0, "Destination not trusted");
        require(supportedTokens[params.token], "Token not supported");
        require(params.amount > 0, "Invalid amount");
        require(params.recipient != address(0), "Invalid recipient");

        // Transfer tokens from user
        IERC20(params.token).safeTransferFrom(msg.sender, address(this), params.amount);

        // Prepare payload
        bytes memory payload = abi.encode(params.token, params.amount, params.recipient, msg.sender);

        // Send via LayerZero
        lzEndpoint.send{ value: msg.value }(
            params.dstChainId,
            trustedRemoteLookup[params.dstChainId],
            payload,
            payable(msg.sender),
            address(0),
            params.adapterParams
        );

        emit TokenBridged(params.dstChainId, params.token, params.amount, params.recipient, keccak256(payload));
    }

    /**
     * @dev Estimate bridge fees
     */
    function estimateBridgeFee(
        uint16 _dstChainId,
        address _token,
        uint256 _amount,
        address _recipient,
        bytes calldata _adapterParams
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        require(trustedRemoteLookup[_dstChainId].length > 0, "Destination not trusted");

        bytes memory payload = abi.encode(_token, _amount, _recipient, msg.sender);

        return lzEndpoint.estimateFees(_dstChainId, address(this), payload, false, _adapterParams);
    }

    /**
     * @dev Set trusted remote for a chain
     */
    function setTrustedRemote(uint16 _chainId, bytes calldata _trustedRemote) external onlyOwner {
        require(_chainId != 0, "Invalid chain ID");
        require(_trustedRemote.length > 0, "Invalid trusted remote");

        trustedRemoteLookup[_chainId] = _trustedRemote;
        emit TrustedRemoteSet(_chainId, _trustedRemote);
    }

    /**
     * @dev Update token support status
     */
    function setSupportedToken(address _token, bool _supported) external onlyOwner {
        require(_token != address(0), "Invalid token");

        supportedTokens[_token] = _supported;
        emit TokenSupportUpdated(_token, _supported);
    }

    /**
     * @dev Receive bridged tokens (called by LayerZero)
     */
    function lzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) external {
        require(msg.sender == address(lzEndpoint), "Only LayerZero endpoint");
        require(keccak256(_srcAddress) == keccak256(trustedRemoteLookup[_srcChainId]), "Invalid source");

        (address token, uint256 amount, address recipient, address sender) = abi.decode(
            _payload,
            (address, uint256, address, address)
        );

        require(supportedTokens[token], "Token not supported");
        require(recipient != address(0), "Invalid recipient");

        // Transfer tokens to recipient
        IERC20(token).safeTransfer(recipient, amount);
    }

    /**
     * @dev Emergency withdrawal (owner only)
     */
    function emergencyWithdraw(address _token, uint256 _amount) external onlyOwner {
        if (_token == address(0)) {
            // Withdraw native token
            require(address(this).balance >= _amount, "Insufficient balance");
            (bool success, ) = payable(owner()).call{ value: _amount }("");
            require(success, "Transfer failed");
        } else {
            // Withdraw ERC20 token
            IERC20(_token).safeTransfer(owner(), _amount);
        }
    }

    /**
     * @dev Check if a remote is trusted
     */
    function isTrustedRemote(uint16 _chainId, bytes calldata _srcAddress) external view returns (bool) {
        return keccak256(_srcAddress) == keccak256(trustedRemoteLookup[_chainId]);
    }

    // IBridgeAdapter implementation
    function getBridgeQuote(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient
    ) external view override returns (IBridgeAdapter.BridgeQuote memory quote) {
        // Basic implementation - can be enhanced
        (uint256 nativeFee, ) = lzEndpoint.estimateFees(
            dstChainId,
            address(this),
            abi.encode(token, amount, recipient),
            false,
            "0x"
        );

        return
            IBridgeAdapter.BridgeQuote({
                fee: nativeFee,
                estimatedTime: 300, // 5 minutes estimate
                minAmountOut: amount, // 1:1 for now
                routeData: abi.encode(dstChainId, token, amount, recipient)
            });
    }

    function executeBridge(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient,
        bytes calldata routeData
    ) external payable override {
        // Basic implementation - can be enhanced
        require(isSupported(dstChainId, token), "Bridge not supported");

        if (token == address(0)) {
            require(msg.value >= amount, "Insufficient value");
        } else {
            IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        }

        bytes memory payload = abi.encode(token, amount, recipient);
        bytes memory trustedRemote = trustedRemoteLookup[dstChainId];
        require(trustedRemote.length > 0, "Trusted remote not set");

        lzEndpoint.send{ value: msg.value }(dstChainId, trustedRemote, payload, payable(msg.sender), address(0), "0x");

        emit BridgeInitiated(dstChainId, token, amount, recipient, msg.sender);
    }

    function isSupported(uint16 dstChainId, address token) public view override returns (bool) {
        return trustedRemoteLookup[dstChainId].length > 0;
    }

    function getBridgeName() external pure override returns (string memory) {
        return "LayerZero";
    }

    receive() external payable {}
}
