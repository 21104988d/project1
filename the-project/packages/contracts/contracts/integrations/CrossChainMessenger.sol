// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title CrossChainMessenger
 * @dev Handles cross-chain communication and message routing
 */
contract CrossChainMessenger is Ownable, ReentrancyGuard, Pausable {
    struct CrossChainMessage {
        uint16 sourceChainId;
        uint16 destinationChainId;
        bytes32 messageId;
        address sender;
        address recipient;
        bytes payload;
        uint256 timestamp;
        MessageStatus status;
    }

    enum MessageStatus {
        PENDING,
        SENT,
        DELIVERED,
        FAILED
    }

    // Mapping of message ID to CrossChainMessage
    mapping(bytes32 => CrossChainMessage) public messages;

    // Mapping of chain ID to supported status
    mapping(uint16 => bool) public supportedChains;

    // Mapping of chain ID to endpoint address
    mapping(uint16 => address) public chainEndpoints;

    // Events
    event MessageSent(
        bytes32 indexed messageId,
        uint16 indexed sourceChainId,
        uint16 indexed destinationChainId,
        address sender,
        address recipient
    );

    event MessageReceived(bytes32 indexed messageId, uint16 indexed sourceChainId, address recipient);

    event ChainSupported(uint16 indexed chainId, address endpoint);
    event ChainRemoved(uint16 indexed chainId);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Send a cross-chain message
     */
    function sendMessage(
        uint16 _destinationChainId,
        address _recipient,
        bytes calldata _payload
    ) external payable nonReentrant whenNotPaused returns (bytes32 messageId) {
        require(supportedChains[_destinationChainId], "Destination chain not supported");
        require(_recipient != address(0), "Invalid recipient");

        messageId = keccak256(
            abi.encodePacked(
                block.chainid,
                _destinationChainId,
                msg.sender,
                _recipient,
                _payload,
                block.timestamp,
                block.number
            )
        );

        messages[messageId] = CrossChainMessage({
            sourceChainId: uint16(block.chainid),
            destinationChainId: _destinationChainId,
            messageId: messageId,
            sender: msg.sender,
            recipient: _recipient,
            payload: _payload,
            timestamp: block.timestamp,
            status: MessageStatus.PENDING
        });

        emit MessageSent(messageId, uint16(block.chainid), _destinationChainId, msg.sender, _recipient);

        // Update status to SENT after emitting event
        messages[messageId].status = MessageStatus.SENT;

        return messageId;
    }

    /**
     * @dev Receive and process a new cross-chain message
     */
    function receiveNewMessage(
        bytes32 _messageId,
        uint16 _sourceChainId,
        address _sender,
        address _recipient,
        bytes calldata _payload
    ) external onlyOwner nonReentrant whenNotPaused {
        require(supportedChains[_sourceChainId], "Source chain not supported");
        require(_recipient != address(0), "Invalid recipient");

        CrossChainMessage storage message = messages[_messageId];
        require(message.messageId == bytes32(0), "Message already processed");

        message.sourceChainId = _sourceChainId;
        message.destinationChainId = uint16(block.chainid);
        message.messageId = _messageId;
        message.sender = _sender;
        message.recipient = _recipient;
        message.payload = _payload;
        message.timestamp = block.timestamp;
        message.status = MessageStatus.DELIVERED;

        emit MessageReceived(_messageId, _sourceChainId, _recipient);

        // Execute the message if recipient is a contract
        if (_recipient.code.length > 0) {
            (bool success, ) = _recipient.call(_payload);
            if (!success) {
                message.status = MessageStatus.FAILED;
            }
        }
    }

    /**
     * @dev Simple receive message function for testing (updates existing message status)
     */
    function receiveMessage(bytes32 _messageId) external onlyOwner nonReentrant whenNotPaused {
        CrossChainMessage storage message = messages[_messageId];
        require(message.messageId != bytes32(0), "Message not found");
        require(message.status == MessageStatus.SENT, "Message not in correct state");

        message.status = MessageStatus.DELIVERED;

        emit MessageReceived(_messageId, message.sourceChainId, message.recipient);

        // Execute the message if recipient is a contract
        if (message.recipient.code.length > 0) {
            (bool success, ) = message.recipient.call(message.payload);
            if (!success) {
                message.status = MessageStatus.FAILED;
            }
        }
    }

    /**
     * @dev Add support for a new chain
     */
    function addSupportedChain(uint16 _chainId, address _endpoint) external onlyOwner {
        require(_chainId != 0, "Invalid chain ID");
        require(_endpoint != address(0), "Invalid endpoint");

        supportedChains[_chainId] = true;
        chainEndpoints[_chainId] = _endpoint;

        emit ChainSupported(_chainId, _endpoint);
    }

    /**
     * @dev Remove support for a chain
     */
    function removeSupportedChain(uint16 _chainId) external onlyOwner {
        require(supportedChains[_chainId], "Chain not supported");

        supportedChains[_chainId] = false;
        delete chainEndpoints[_chainId];

        emit ChainRemoved(_chainId);
    }

    /**
     * @dev Get message details
     */
    function getMessage(bytes32 _messageId) external view returns (CrossChainMessage memory) {
        return messages[_messageId];
    }

    /**
     * @dev Check if a chain is supported
     */
    function isChainSupported(uint16 _chainId) external view returns (bool) {
        return supportedChains[_chainId];
    }

    /**
     * @dev Pause contract (emergency only)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraw contract balance (for gas fees)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        (bool success, ) = payable(owner()).call{ value: balance }("");
        require(success, "Withdrawal failed");
    }
}
