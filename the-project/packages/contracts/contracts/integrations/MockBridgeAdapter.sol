// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IBridgeAdapter.sol";

/**
 * @title MockBridgeAdapter
 * @dev Simple mock implementation for testing
 */
contract MockBridgeAdapter is Ownable, IBridgeAdapter {
    constructor() Ownable(msg.sender) {}

    function getBridgeQuote(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient
    ) external pure override returns (BridgeQuote memory quote) {
        return
            BridgeQuote({
                fee: 0.001 ether,
                estimatedTime: 300,
                minAmountOut: amount,
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
        // Mock implementation
        require(msg.value >= 0.001 ether, "Insufficient fee");
    }

    function isSupported(uint16 dstChainId, address token) external pure override returns (bool) {
        return true; // Support everything for mock
    }

    function getBridgeName() external pure override returns (string memory) {
        return "Mock";
    }
}
