// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title EntrypointContract
 * @notice This contract is the main entry point for all user interactions.
 * It handles the initial validation, and then delegates the call to the appropriate resolver.
 * This contract is optimized for USDT transactions.
 */
contract EntrypointContract is Ownable, Pausable, ReentrancyGuard {
    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @notice Pause the contract
     * @dev Only the owner can call this function
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause the contract
     * @dev Only the owner can call this function
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
