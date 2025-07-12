// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IBridgeAdapter
 * @dev Interface for bridge protocol adapters
 */
interface IBridgeAdapter {
    struct BridgeQuote {
        uint256 fee;
        uint256 estimatedTime;
        uint256 minAmountOut;
        bytes routeData;
    }

    /**
     * @dev Get a quote for bridging tokens
     */
    function getBridgeQuote(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient
    ) external view returns (BridgeQuote memory quote);

    /**
     * @dev Execute bridge transaction
     */
    function executeBridge(
        uint16 dstChainId,
        address token,
        uint256 amount,
        address recipient,
        bytes calldata routeData
    ) external payable;

    /**
     * @dev Check if bridge supports the token and chain combination
     */
    function isSupported(uint16 dstChainId, address token) external view returns (bool);

    /**
     * @dev Get bridge protocol name
     */
    function getBridgeName() external pure returns (string memory);
}
