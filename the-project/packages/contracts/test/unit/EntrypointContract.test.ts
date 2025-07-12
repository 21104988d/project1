import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { EntrypointContract } from '../../../typechain-types';

describe('EntrypointContract', () => {
  let entrypoint: EntrypointContract;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();

    const EntrypointContractFactory = await ethers.getContractFactory('EntrypointContract');
    entrypoint = await EntrypointContractFactory.deploy(owner.address);
    await entrypoint.waitForDeployment();
  });

  it('Should set the right owner', async () => {
    expect(await entrypoint.owner()).to.equal(owner.address);
  });

  it('Should allow owner to pause and unpause the contract', async () => {
    await entrypoint.connect(owner).pause();
    expect(await entrypoint.paused()).to.be.true;

    await entrypoint.connect(owner).unpause();
    expect(await entrypoint.paused()).to.be.false;
  });

  it('Should prevent non-owner from pausing or unpausing', async () => {
    await expect(entrypoint.connect(addr1).pause()).to.be.revertedWithCustomError(
      entrypoint,
      'OwnableUnauthorizedAccount'
    );
    await expect(entrypoint.connect(addr1).unpause()).to.be.revertedWithCustomError(
      entrypoint,
      'OwnableUnauthorizedAccount'
    );
  });
});
