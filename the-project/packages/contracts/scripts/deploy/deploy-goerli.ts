// Auto-generated deployment script for goerli
// Generated on: 2025-07-07T12:00:00.000Z

import { ethers, run } from 'hardhat';

async function main() {
  console.log('🚀 Deploying to goerli (Chain ID: 5)...');

  const [deployer] = await ethers.getSigners();
  console.log('📍 Deploying from:', deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log('💰 Balance:', ethers.formatEther(balance), 'ETH');

  // Deploy EntrypointContract
  console.log('📦 Deploying EntrypointContract...');
  const EntrypointFactory = await ethers.getContractFactory('EntrypointContract');
  const entrypoint = await EntrypointFactory.deploy(deployer.address);
  await entrypoint.waitForDeployment();

  const entrypointAddress = await entrypoint.getAddress();
  console.log('✅ EntrypointContract deployed to:', entrypointAddress);

  // Deploy ResolverContract
  console.log('📦 Deploying ResolverContract...');
  const ResolverFactory = await ethers.getContractFactory('ResolverContract');
  const resolver = await ResolverFactory.deploy(deployer.address);
  await resolver.waitForDeployment();

  const resolverAddress = await resolver.getAddress();
  console.log('✅ ResolverContract deployed to:', resolverAddress);

  // Verify contracts
  if (process.env.VERIFY_CONTRACTS === 'true') {
    console.log('🔍 Verifying contracts...');
    try {
      await run('verify:verify', {
        address: entrypointAddress,
        constructorArguments: [deployer.address],
      });
      console.log('✅ EntrypointContract verified');
    } catch (error) {
      console.log('⚠️ EntrypointContract verification failed:', error);
    }

    try {
      await run('verify:verify', {
        address: resolverAddress,
        constructorArguments: [deployer.address],
      });
      console.log('✅ ResolverContract verified');
    } catch (error) {
      console.log('⚠️ ResolverContract verification failed:', error);
    }
  }

  // Save deployment results
  const deploymentResult = {
    network: 'goerli',
    chainId: 5,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      EntrypointContract: entrypointAddress,
      ResolverContract: resolverAddress,
    },
    blockExplorer: 'https://goerli.etherscan.io',
  };

  console.log('📋 Deployment Summary:', deploymentResult);
  console.log('🎉 goerli deployment completed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
