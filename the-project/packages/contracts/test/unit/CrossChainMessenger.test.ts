import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('CrossChainMessenger', function () {
  let crossChainMessenger: any;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy CrossChainMessenger
    const CrossChainMessenger = await ethers.getContractFactory('CrossChainMessenger');
    crossChainMessenger = await CrossChainMessenger.deploy();
  });

  describe('Chain Management', function () {
    it('Should add supported chain', async function () {
      const chainId = 137; // Polygon
      const endpoint = '0x3c2269811836af69497E5F486A85D7316753cf62';

      await expect(crossChainMessenger.addSupportedChain(chainId, endpoint))
        .to.emit(crossChainMessenger, 'ChainSupported')
        .withArgs(chainId, endpoint);

      expect(await crossChainMessenger.supportedChains(chainId)).to.be.true;
      expect(await crossChainMessenger.chainEndpoints(chainId)).to.equal(endpoint);
    });

    it('Should not allow non-owner to add chain', async function () {
      await expect(
        crossChainMessenger
          .connect(user)
          .addSupportedChain(137, '0x3c2269811836af69497E5F486A85D7316753cf62')
      )
        .to.be.revertedWithCustomError(crossChainMessenger, 'OwnableUnauthorizedAccount')
        .withArgs(user.address);
    });

    it('Should remove supported chain', async function () {
      const chainId = 137;
      const endpoint = '0x3c2269811836af69497E5F486A85D7316753cf62';

      await crossChainMessenger.addSupportedChain(chainId, endpoint);

      await expect(crossChainMessenger.removeSupportedChain(chainId))
        .to.emit(crossChainMessenger, 'ChainRemoved')
        .withArgs(chainId);

      expect(await crossChainMessenger.supportedChains(chainId)).to.be.false;
    });
  });

  describe('Message Sending', function () {
    beforeEach(async function () {
      // Add supported chains
      await crossChainMessenger.addSupportedChain(1, '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675');
      await crossChainMessenger.addSupportedChain(
        137,
        '0x3c2269811836af69497E5F486A85D7316753cf62'
      );
    });

    it('Should send cross-chain message', async function () {
      const destinationChainId = 137;
      const recipient = user.address;
      const payload = ethers.toUtf8Bytes('Hello Cross-Chain!');

      const tx = await crossChainMessenger.sendMessage(destinationChainId, recipient, payload);

      const receipt = await tx.wait();
      const messageId = receipt.logs[0].topics[1]; // Extract messageId from event

      // Verify message was stored
      const message = await crossChainMessenger.messages(messageId);
      expect(message.destinationChainId).to.equal(destinationChainId);
      expect(message.recipient).to.equal(recipient);
      expect(message.sender).to.equal(owner.address);
      expect(message.status).to.equal(1); // SENT status
    });

    it('Should not send to unsupported chain', async function () {
      const unsupportedChainId = 999;
      const recipient = user.address;
      const payload = ethers.toUtf8Bytes('Hello!');

      await expect(
        crossChainMessenger.sendMessage(unsupportedChainId, recipient, payload)
      ).to.be.revertedWith('Destination chain not supported');
    });

    it('Should not send with zero recipient', async function () {
      const destinationChainId = 137;
      const payload = ethers.toUtf8Bytes('Hello!');

      await expect(
        crossChainMessenger.sendMessage(destinationChainId, ethers.ZeroAddress, payload)
      ).to.be.revertedWith('Invalid recipient');
    });
  });

  describe('Message Reception', function () {
    let messageId: string;

    beforeEach(async function () {
      await crossChainMessenger.addSupportedChain(1, '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675');
      await crossChainMessenger.addSupportedChain(
        137,
        '0x3c2269811836af69497E5F486A85D7316753cf62'
      );

      // Send a message first
      const tx = await crossChainMessenger.sendMessage(
        137,
        user.address,
        ethers.toUtf8Bytes('Test message')
      );
      const receipt = await tx.wait();
      messageId = receipt.logs[0].topics[1];
    });

    it('Should receive cross-chain message', async function () {
      await expect(crossChainMessenger.receiveMessage(messageId))
        .to.emit(crossChainMessenger, 'MessageReceived')
        .withArgs(messageId, 1337, user.address); // 1337 is the source chain (current hardhat chain)

      const message = await crossChainMessenger.messages(messageId);
      expect(message.status).to.equal(2); // DELIVERED status
    });

    it('Should not receive non-existent message', async function () {
      const fakeMessageId = ethers.keccak256(ethers.toUtf8Bytes('fake'));

      await expect(crossChainMessenger.receiveMessage(fakeMessageId)).to.be.revertedWith(
        'Message not found'
      );
    });
  });

  describe('Security Features', function () {
    it('Should pause and unpause contract', async function () {
      await crossChainMessenger.pause();
      expect(await crossChainMessenger.paused()).to.be.true;

      // Should not be able to send messages when paused
      await crossChainMessenger.addSupportedChain(
        137,
        '0x3c2269811836af69497E5F486A85D7316753cf62'
      );
      await expect(
        crossChainMessenger.sendMessage(137, user.address, ethers.toUtf8Bytes('test'))
      ).to.be.revertedWithCustomError(crossChainMessenger, 'EnforcedPause');

      await crossChainMessenger.unpause();
      expect(await crossChainMessenger.paused()).to.be.false;
    });

    it('Should only allow owner to pause', async function () {
      await expect(crossChainMessenger.connect(user).pause())
        .to.be.revertedWithCustomError(crossChainMessenger, 'OwnableUnauthorizedAccount')
        .withArgs(user.address);
    });
  });
});
