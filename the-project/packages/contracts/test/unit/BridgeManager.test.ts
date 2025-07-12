import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('BridgeManager', function () {
  let bridgeManager: any;
  let mockAdapter: any;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy BridgeManager
    const BridgeManager = await ethers.getContractFactory('BridgeManager');
    bridgeManager = await BridgeManager.deploy();

    // Deploy mock adapter for testing
    const MockBridgeAdapter = await ethers.getContractFactory('MockBridgeAdapter');
    mockAdapter = await MockBridgeAdapter.deploy();
  });

  describe('Bridge Registration', function () {
    it('Should register a new bridge adapter', async function () {
      const bridgeId = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['LayerZero', await mockAdapter.getAddress()]
      );

      await expect(bridgeManager.registerBridge('LayerZero', await mockAdapter.getAddress(), 1))
        .to.emit(bridgeManager, 'BridgeRegistered')
        .withArgs(bridgeId, await mockAdapter.getAddress(), 'LayerZero');

      const bridge = await bridgeManager.bridges(bridgeId);
      expect(bridge.isActive).to.be.true;
      expect(bridge.name).to.equal('LayerZero');
      expect(bridge.priority).to.equal(1);
    });

    it('Should not allow non-owner to register bridge', async function () {
      await expect(
        bridgeManager.connect(user).registerBridge('LayerZero', await mockAdapter.getAddress(), 1)
      )
        .to.be.revertedWithCustomError(bridgeManager, 'OwnableUnauthorizedAccount')
        .withArgs(user.address);
    });

    it('Should not register bridge with zero address', async function () {
      await expect(
        bridgeManager.registerBridge('Invalid', ethers.ZeroAddress, 1)
      ).to.be.revertedWith('Invalid adapter');
    });
  });

  describe('Bridge Management', function () {
    let bridgeId: string;

    beforeEach(async function () {
      bridgeId = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['LayerZero', await mockAdapter.getAddress()]
      );
      await bridgeManager.registerBridge('LayerZero', await mockAdapter.getAddress(), 1);
    });

    it('Should deactivate a bridge', async function () {
      await expect(bridgeManager.deactivateBridge(bridgeId))
        .to.emit(bridgeManager, 'BridgeDeactivated')
        .withArgs(bridgeId);

      const bridge = await bridgeManager.bridges(bridgeId);
      expect(bridge.isActive).to.be.false;
    });

    it('Should activate a bridge', async function () {
      await bridgeManager.deactivateBridge(bridgeId);

      await expect(bridgeManager.activateBridge(bridgeId))
        .to.emit(bridgeManager, 'BridgeActivated')
        .withArgs(bridgeId);

      const bridge = await bridgeManager.bridges(bridgeId);
      expect(bridge.isActive).to.be.true;
    });

    it('Should set preferred bridge for chain and token', async function () {
      const chainId = 137; // Polygon
      const tokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'; // USDC on Polygon

      await expect(bridgeManager.setPreferredBridge(chainId, tokenAddress, bridgeId))
        .to.emit(bridgeManager, 'PreferredBridgeSet')
        .withArgs(chainId, tokenAddress, bridgeId);

      const preferredBridge = await bridgeManager.preferredBridge(chainId, tokenAddress);
      expect(preferredBridge).to.equal(bridgeId);
    });
  });

  describe('Bridge Selection', function () {
    it('Should return best available bridge', async function () {
      const mockAdapter2 = await (await ethers.getContractFactory('MockBridgeAdapter')).deploy();
      const bridgeId1 = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['LayerZero', await mockAdapter.getAddress()]
      );
      const bridgeId2 = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['Stargate', await mockAdapter2.getAddress()]
      );

      await bridgeManager.registerBridge('LayerZero', await mockAdapter.getAddress(), 2);
      await bridgeManager.registerBridge('Stargate', await mockAdapter2.getAddress(), 1);

      const bestBridge = await bridgeManager.getBestBridge(
        137,
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
      );
      expect(bestBridge).to.equal(bridgeId2); // Stargate has higher priority (lower number)
    });

    it('Should return preferred bridge if set', async function () {
      const mockAdapter2 = await (await ethers.getContractFactory('MockBridgeAdapter')).deploy();
      const bridgeId1 = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['LayerZero', await mockAdapter.getAddress()]
      );
      const bridgeId2 = ethers.solidityPackedKeccak256(
        ['string', 'address'],
        ['Stargate', await mockAdapter2.getAddress()]
      );
      const chainId = 137;
      const tokenAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

      await bridgeManager.registerBridge('LayerZero', await mockAdapter.getAddress(), 2);
      await bridgeManager.registerBridge('Stargate', await mockAdapter2.getAddress(), 1);
      await bridgeManager.setPreferredBridge(chainId, tokenAddress, bridgeId1);

      const bestBridge = await bridgeManager.getBestBridge(chainId, tokenAddress);
      expect(bestBridge).to.equal(bridgeId1); // Should return preferred bridge
    });
  });
});
