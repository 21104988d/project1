// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../interfaces/IBridgeAdapter.sol";

/**
 * @title BridgeManager
 * @dev Manages multiple bridge adapters and routes to the best one
 */
contract BridgeManager is Ownable, ReentrancyGuard {
    struct RegisteredBridge {
        IBridgeAdapter adapter;
        bool isActive;
        uint256 priority; // Lower number = higher priority
        string name;
    }

    // Mapping of bridge ID to bridge info
    mapping(bytes32 => RegisteredBridge) public bridges;

    // Array of bridge IDs for iteration
    bytes32[] public bridgeIds;

    // Mapping of chain and token to preferred bridge
    mapping(uint16 => mapping(address => bytes32)) public preferredBridge;

    // Events
    event BridgeRegistered(bytes32 indexed bridgeId, address adapter, string name);
    event BridgeDeactivated(bytes32 indexed bridgeId);
    event BridgeActivated(bytes32 indexed bridgeId);
    event PreferredBridgeSet(uint16 indexed chainId, address indexed token, bytes32 bridgeId);
    event BridgeExecuted(
        bytes32 indexed bridgeId,
        uint16 indexed dstChainId,
        address indexed token,
        uint256 amount,
        address recipient
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Register a new bridge adapter
     */
    function registerBridge(string calldata _name, address _adapter, uint256 _priority) external onlyOwner {
        require(_adapter != address(0), "Invalid adapter");
        require(bytes(_name).length > 0, "Invalid name");

        bytes32 bridgeId = keccak256(abi.encodePacked(_name, _adapter));
        require(bridges[bridgeId].adapter == IBridgeAdapter(address(0)), "Bridge already registered");

        bridges[bridgeId] = RegisteredBridge({
            adapter: IBridgeAdapter(_adapter),
            isActive: true,
            priority: _priority,
            name: _name
        });

        bridgeIds.push(bridgeId);

        emit BridgeRegistered(bridgeId, _adapter, _name);
    }

    /**
     * @dev Deactivate a bridge
     */
    function deactivateBridge(bytes32 _bridgeId) external onlyOwner {
        require(address(bridges[_bridgeId].adapter) != address(0), "Bridge not found");
        bridges[_bridgeId].isActive = false;
        emit BridgeDeactivated(_bridgeId);
    }

    /**
     * @dev Activate a bridge
     */
    function activateBridge(bytes32 _bridgeId) external onlyOwner {
        require(address(bridges[_bridgeId].adapter) != address(0), "Bridge not found");
        bridges[_bridgeId].isActive = true;
        emit BridgeActivated(_bridgeId);
    }

    /**
     * @dev Set preferred bridge for a chain and token combination
     */
    function setPreferredBridge(uint16 _chainId, address _token, bytes32 _bridgeId) external onlyOwner {
        require(address(bridges[_bridgeId].adapter) != address(0), "Bridge not found");
        require(bridges[_bridgeId].isActive, "Bridge not active");

        preferredBridge[_chainId][_token] = _bridgeId;
        emit PreferredBridgeSet(_chainId, _token, _bridgeId);
    }

    /**
     * @dev Get the best bridge quote for a route
     */
    function getBestQuote(
        uint16 _dstChainId,
        address _token,
        uint256 _amount,
        address _recipient
    ) external view returns (bytes32 bestBridgeId, IBridgeAdapter.BridgeQuote memory bestQuote) {
        bestQuote.fee = type(uint256).max; // Start with max fee

        // Check preferred bridge first
        bytes32 preferred = preferredBridge[_dstChainId][_token];
        if (preferred != bytes32(0) && bridges[preferred].isActive) {
            if (bridges[preferred].adapter.isSupported(_dstChainId, _token)) {
                bestQuote = bridges[preferred].adapter.getBridgeQuote(_dstChainId, _token, _amount, _recipient);
                bestBridgeId = preferred;
                return (bestBridgeId, bestQuote);
            }
        }

        // Otherwise, find the best quote among all active bridges
        for (uint256 i = 0; i < bridgeIds.length; i++) {
            bytes32 bridgeId = bridgeIds[i];
            RegisteredBridge memory bridge = bridges[bridgeId];

            if (!bridge.isActive) continue;
            if (!bridge.adapter.isSupported(_dstChainId, _token)) continue;

            IBridgeAdapter.BridgeQuote memory quote = bridge.adapter.getBridgeQuote(
                _dstChainId,
                _token,
                _amount,
                _recipient
            );

            // Compare quotes (lower fee wins, but consider priority for ties)
            if (
                quote.fee < bestQuote.fee ||
                (quote.fee == bestQuote.fee && bridge.priority < bridges[bestBridgeId].priority)
            ) {
                bestQuote = quote;
                bestBridgeId = bridgeId;
            }
        }

        require(bestBridgeId != bytes32(0), "No suitable bridge found");
    }

    /**
     * @dev Execute bridge transaction using the best available bridge
     */
    function executeBridge(
        uint16 _dstChainId,
        address _token,
        uint256 _amount,
        address _recipient
    ) external payable nonReentrant {
        (bytes32 bridgeId, IBridgeAdapter.BridgeQuote memory quote) = this.getBestQuote(
            _dstChainId,
            _token,
            _amount,
            _recipient
        );

        require(msg.value >= quote.fee, "Insufficient bridge fee");

        // Execute bridge transaction
        bridges[bridgeId].adapter.executeBridge{ value: quote.fee }(
            _dstChainId,
            _token,
            _amount,
            _recipient,
            quote.routeData
        );

        emit BridgeExecuted(bridgeId, _dstChainId, _token, _amount, _recipient);

        // Refund excess fee
        if (msg.value > quote.fee) {
            (bool success, ) = payable(msg.sender).call{ value: msg.value - quote.fee }("");
            require(success, "Refund failed");
        }
    }

    /**
     * @dev Execute bridge transaction using a specific bridge
     */
    function executeBridgeWithSpecificAdapter(
        bytes32 _bridgeId,
        uint16 _dstChainId,
        address _token,
        uint256 _amount,
        address _recipient,
        bytes calldata _routeData
    ) external payable nonReentrant {
        require(address(bridges[_bridgeId].adapter) != address(0), "Bridge not found");
        require(bridges[_bridgeId].isActive, "Bridge not active");
        require(bridges[_bridgeId].adapter.isSupported(_dstChainId, _token), "Route not supported");

        bridges[_bridgeId].adapter.executeBridge{ value: msg.value }(
            _dstChainId,
            _token,
            _amount,
            _recipient,
            _routeData
        );

        emit BridgeExecuted(_bridgeId, _dstChainId, _token, _amount, _recipient);
    }

    /**
     * @dev Get all quotes for comparison
     */
    function getAllQuotes(
        uint16 _dstChainId,
        address _token,
        uint256 _amount,
        address _recipient
    ) external view returns (bytes32[] memory bridgeIds_, IBridgeAdapter.BridgeQuote[] memory quotes) {
        uint256 count = 0;

        // Count supported bridges
        for (uint256 i = 0; i < bridgeIds.length; i++) {
            bytes32 bridgeId = bridgeIds[i];
            if (bridges[bridgeId].isActive && bridges[bridgeId].adapter.isSupported(_dstChainId, _token)) {
                count++;
            }
        }

        bridgeIds_ = new bytes32[](count);
        quotes = new IBridgeAdapter.BridgeQuote[](count);

        uint256 index = 0;
        for (uint256 i = 0; i < bridgeIds.length; i++) {
            bytes32 bridgeId = bridgeIds[i];
            if (bridges[bridgeId].isActive && bridges[bridgeId].adapter.isSupported(_dstChainId, _token)) {
                bridgeIds_[index] = bridgeId;
                quotes[index] = bridges[bridgeId].adapter.getBridgeQuote(_dstChainId, _token, _amount, _recipient);
                index++;
            }
        }
    }

    /**
     * @dev Get bridge information
     */
    function getBridgeInfo(bytes32 _bridgeId) external view returns (RegisteredBridge memory) {
        return bridges[_bridgeId];
    }

    /**
     * @dev Get number of registered bridges
     */
    function getBridgeCount() external view returns (uint256) {
        return bridgeIds.length;
    }

    /**
     * @dev Emergency withdrawal
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        (bool success, ) = payable(owner()).call{ value: balance }("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Get the best bridge for a route (ID only)
     */
    function getBestBridge(uint16 _dstChainId, address _token) external view returns (bytes32 bestBridgeId) {
        // Check preferred bridge first
        bytes32 preferred = preferredBridge[_dstChainId][_token];
        if (preferred != bytes32(0) && bridges[preferred].isActive) {
            if (bridges[preferred].adapter.isSupported(_dstChainId, _token)) {
                return preferred;
            }
        }

        // Otherwise, find the best bridge among all active bridges by priority
        uint256 bestPriority = type(uint256).max;
        for (uint256 i = 0; i < bridgeIds.length; i++) {
            bytes32 bridgeId = bridgeIds[i];
            RegisteredBridge memory bridge = bridges[bridgeId];

            if (!bridge.isActive) continue;
            if (!bridge.adapter.isSupported(_dstChainId, _token)) continue;

            if (bridge.priority < bestPriority) {
                bestPriority = bridge.priority;
                bestBridgeId = bridgeId;
            }
        }

        require(bestBridgeId != bytes32(0), "No suitable bridge found");
    }

    receive() external payable {}
}
