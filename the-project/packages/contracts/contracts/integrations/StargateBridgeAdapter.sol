// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../interfaces/IBridgeAdapter.sol";
import "../interfaces/IStargateRouter.sol";

/**
 * @title StargateBridgeAdapter
 * @dev Adapter for Stargate Finance cross-chain bridging
 */
contract StargateBridgeAdapter is Ownable, ReentrancyGuard, IBridgeAdapter {
    using SafeERC20 for IERC20;

    struct StargateSwapParams {
        uint16 dstChainId;
        uint256 srcPoolId;
        uint256 dstPoolId;
        uint256 amount;
        uint256 minAmountOut;
        address recipient;
        uint256 dstGasForCall;
        uint256 dstNativeAmount;
    }

    IStargateRouter public immutable stargateRouter;

    // Mapping of token to pool ID
    mapping(address => uint256) public tokenToPoolId;

    // Mapping of chain ID to supported status
    mapping(uint16 => bool) public supportedChains;

    // Events
    event StargateSwap(
        uint16 indexed dstChainId,
        uint256 indexed srcPoolId,
        uint256 indexed dstPoolId,
        uint256 amount,
        address recipient
    );

    event BridgeInitiated(
        uint16 indexed dstChainId,
        address indexed token,
        uint256 amount,
        address indexed recipient,
        address sender
    );

    event PoolIdSet(address indexed token, uint256 poolId);
    event ChainSupportUpdated(uint16 indexed chainId, bool supported);

    constructor(address _stargateRouter) Ownable(msg.sender) {
        require(_stargateRouter != address(0), "Invalid Stargate router");
        stargateRouter = IStargateRouter(_stargateRouter);
    }

    /**
     * @dev Execute cross-chain swap via Stargate
     */
    function swapViaStargate(address _token, StargateSwapParams calldata params) external payable nonReentrant {
        require(supportedChains[params.dstChainId], "Chain not supported");
        require(tokenToPoolId[_token] == params.srcPoolId, "Invalid source pool");
        require(params.amount > 0, "Invalid amount");
        require(params.recipient != address(0), "Invalid recipient");

        // Transfer tokens from user
        IERC20(_token).safeTransferFrom(msg.sender, address(this), params.amount);

        // Approve Stargate router
        IERC20(_token).safeIncreaseAllowance(address(stargateRouter), params.amount);

        // Prepare LZ transaction parameters
        IStargateRouter.lzTxObj memory lzTxParams = IStargateRouter.lzTxObj({
            dstGasForCall: params.dstGasForCall,
            dstNativeAmount: params.dstNativeAmount,
            dstNativeAddr: abi.encodePacked(params.recipient)
        });

        // Execute swap
        stargateRouter.swap{ value: msg.value }(
            params.dstChainId,
            params.srcPoolId,
            params.dstPoolId,
            payable(msg.sender), // refund address
            params.amount,
            params.minAmountOut,
            lzTxParams,
            abi.encodePacked(params.recipient),
            "" // no payload
        );

        emit StargateSwap(params.dstChainId, params.srcPoolId, params.dstPoolId, params.amount, params.recipient);
    }

    /**
     * @dev Quote LayerZero fee for Stargate swap
     */
    function quoteStargateFee(
        uint16 _dstChainId,
        address _recipient,
        uint256 _dstGasForCall,
        uint256 _dstNativeAmount
    ) external view returns (uint256 fee, uint256 zroFee) {
        require(supportedChains[_dstChainId], "Chain not supported");

        IStargateRouter.lzTxObj memory lzTxParams = IStargateRouter.lzTxObj({
            dstGasForCall: _dstGasForCall,
            dstNativeAmount: _dstNativeAmount,
            dstNativeAddr: abi.encodePacked(_recipient)
        });

        return
            stargateRouter.quoteLayerZeroFee(
                _dstChainId,
                1, // TYPE_SWAP_REMOTE
                abi.encodePacked(_recipient),
                "",
                lzTxParams
            );
    }

    /**
     * @dev Set pool ID for a token
     */
    function setTokenPoolId(address _token, uint256 _poolId) external onlyOwner {
        require(_token != address(0), "Invalid token");
        require(_poolId > 0, "Invalid pool ID");

        tokenToPoolId[_token] = _poolId;
        emit PoolIdSet(_token, _poolId);
    }

    /**
     * @dev Update chain support status
     */
    function setSupportedChain(uint16 _chainId, bool _supported) external onlyOwner {
        require(_chainId != 0, "Invalid chain ID");

        supportedChains[_chainId] = _supported;
        emit ChainSupportUpdated(_chainId, _supported);
    }

    /**
     * @dev Get pool ID for a token
     */
    function getPoolId(address _token) external view returns (uint256) {
        return tokenToPoolId[_token];
    }

    /**
     * @dev Check if chain is supported
     */
    function isChainSupported(uint16 _chainId) external view returns (bool) {
        return supportedChains[_chainId];
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

    // IBridgeAdapter implementation
    function getBridgeQuote(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient
    ) external view override returns (IBridgeAdapter.BridgeQuote memory quote) {
        // Basic implementation for Stargate
        uint256 srcPoolId = tokenToPoolId[token];
        uint256 dstPoolId = srcPoolId; // Assume same pool ID for simplicity

        if (srcPoolId == 0) {
            revert("Token not supported");
        }

        // Get LayerZero fee estimate
        (uint256 fee, ) = stargateRouter.quoteLayerZeroFee(
            dstChainId,
            1, // TYPE_SWAP_REMOTE
            abi.encodePacked(recipient),
            "0x",
            IStargateRouter.lzTxObj(0, 0, "0x")
        );

        return
            IBridgeAdapter.BridgeQuote({
                fee: fee,
                estimatedTime: 600, // 10 minutes estimate for Stargate
                minAmountOut: (amount * 9980) / 10000, // 0.2% slippage
                routeData: abi.encode(dstChainId, srcPoolId, dstPoolId, amount, recipient)
            });
    }

    function executeBridge(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient,
        bytes calldata routeData
    ) external payable override {
        require(isSupported(dstChainId, token), "Bridge not supported");

        uint256 srcPoolId = tokenToPoolId[token];
        uint256 dstPoolId = srcPoolId; // Assume same pool ID
        uint256 minAmountOut = (amount * 9980) / 10000; // 0.2% slippage

        // Transfer tokens from user
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        IERC20(token).forceApprove(address(stargateRouter), amount);

        // Execute Stargate swap
        stargateRouter.swap{ value: msg.value }(
            dstChainId,
            srcPoolId,
            dstPoolId,
            payable(msg.sender), // refund address
            amount,
            minAmountOut,
            IStargateRouter.lzTxObj(0, 0, "0x"),
            abi.encodePacked(recipient),
            "0x"
        );

        emit BridgeInitiated(dstChainId, token, amount, recipient, msg.sender);
    }

    function isSupported(uint16 dstChainId, address token) public view override returns (bool) {
        return tokenToPoolId[token] != 0 && supportedChains[dstChainId];
    }

    function getBridgeName() external pure override returns (string memory) {
        return "Stargate";
    }

    receive() external payable {}
}
