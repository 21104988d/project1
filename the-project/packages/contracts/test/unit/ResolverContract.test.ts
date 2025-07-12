import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import { ResolverContract } from '../../../typechain-types';

describe('ResolverContract', () => {
  let resolver: ResolverContract;
  let owner: HardhatEthersSigner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    const ResolverContractFactory = await ethers.getContractFactory('ResolverContract');
    resolver = await ResolverContractFactory.deploy(owner.address);
    await resolver.waitForDeployment();
  });

  it('Should set the right owner', async () => {
    expect(await resolver.owner()).to.equal(owner.address);
  });
});
