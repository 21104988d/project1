#!/usr/bin/env npx ts-node

/**
 * Comprehensive Testnet Deployment Script
 * Deploys contracts to multiple testnets: Goerli, Arbitrum Goerli, Solana Devnet
 * Version: 1.0.0
 * Date: July 7, 2025
 */

import { run, ethers } from 'hardhat';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface DeploymentResult {
  network: string;
  chainId: number;
  contracts: {
    EntrypointContract?: string;
    ResolverContract?: string;
  };
  blockNumber: number;
  gasUsed: string;
  timestamp: string;
}

const DEPLOYMENT_NETWORKS = ['goerli', 'sepolia', 'arbitrumGoerli', 'arbitrumSepolia'];

async function deployContracts(network: string): Promise<DeploymentResult> {
  console.log(`\n🚀 Deploying to ${network}...`);

  const [deployer] = await hre.ethers.getSigners();
  const chainId = await deployer.provider.getNetwork().then((n: any) => Number(n.chainId));

  console.log(`📍 Deploying from: ${deployer.address}`);
  console.log(
    `💰 Balance: ${hre.ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`
  );

  const result: DeploymentResult = {
    network,
    chainId,
    contracts: {},
    blockNumber: 0,
    gasUsed: '0',
    timestamp: new Date().toISOString(),
  };

  try {
    // Deploy EntrypointContract
    console.log('📦 Deploying EntrypointContract...');
    const EntrypointFactory = await hre.ethers.getContractFactory('EntrypointContract');
    const entrypoint = await EntrypointFactory.deploy(deployer.address);
    await entrypoint.waitForDeployment();

    const entrypointAddress = await entrypoint.getAddress();
    result.contracts.EntrypointContract = entrypointAddress;
    console.log(`✅ EntrypointContract deployed to: ${entrypointAddress}`);

    // Deploy ResolverContract
    console.log('📦 Deploying ResolverContract...');
    const ResolverFactory = await hre.ethers.getContractFactory('ResolverContract');
    const resolver = await ResolverFactory.deploy(deployer.address);
    await resolver.waitForDeployment();

    const resolverAddress = await resolver.getAddress();
    result.contracts.ResolverContract = resolverAddress;
    console.log(`✅ ResolverContract deployed to: ${resolverAddress}`);

    // Get deployment transaction details
    const entrypointTx = entrypoint.deploymentTransaction();
    if (entrypointTx) {
      const receipt = await entrypointTx.wait();
      if (receipt) {
        result.blockNumber = receipt.blockNumber;
        result.gasUsed = receipt.gasUsed.toString();
      }
    }

    console.log(`✅ ${network} deployment completed successfully!`);
    return result;
  } catch (error) {
    console.error(`❌ Error deploying to ${network}:`, error);
    throw error;
  }
}

async function verifyContracts(deploymentResult: DeploymentResult): Promise<void> {
  console.log(`\n🔍 Verifying contracts on ${deploymentResult.network}...`);

  const hre = require('hardhat');

  try {
    if (deploymentResult.contracts.EntrypointContract) {
      console.log('🔍 Verifying EntrypointContract...');
      await hre.run('verify:verify', {
        address: deploymentResult.contracts.EntrypointContract,
        constructorArguments: [hre.ethers.getSigners().then((s: any) => s[0].address)],
      });
      console.log('✅ EntrypointContract verified');
    }

    if (deploymentResult.contracts.ResolverContract) {
      console.log('🔍 Verifying ResolverContract...');
      await hre.run('verify:verify', {
        address: deploymentResult.contracts.ResolverContract,
        constructorArguments: [hre.ethers.getSigners().then((s: any) => s[0].address)],
      });
      console.log('✅ ResolverContract verified');
    }
  } catch (error) {
    console.error(`❌ Error verifying contracts on ${deploymentResult.network}:`, error);
    // Don't throw error for verification failures
  }
}

async function saveDeploymentResults(results: DeploymentResult[]): Promise<void> {
  const deploymentsDir = join(__dirname, '..', 'deployments');
  if (!existsSync(deploymentsDir)) {
    mkdirSync(deploymentsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `testnet-deployment-${timestamp}.json`;
  const filepath = join(deploymentsDir, filename);

  const deploymentData = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    networks: results,
    summary: {
      totalNetworks: results.length,
      successfulDeployments: results.filter(r => Object.keys(r.contracts).length > 0).length,
      totalContracts: results.reduce((acc, r) => acc + Object.keys(r.contracts).length, 0),
    },
  };

  writeFileSync(filepath, JSON.stringify(deploymentData, null, 2));
  console.log(`\n📁 Deployment results saved to: ${filepath}`);

  // Also save as latest deployment
  const latestFilepath = join(deploymentsDir, 'latest-testnet-deployment.json');
  writeFileSync(latestFilepath, JSON.stringify(deploymentData, null, 2));
  console.log(`📁 Latest deployment saved to: ${latestFilepath}`);
}

async function main(): Promise<void> {
  console.log('🚀 Starting comprehensive testnet deployment...');
  console.log(`📅 Date: ${new Date().toISOString()}`);
  console.log(`🌐 Networks: ${DEPLOYMENT_NETWORKS.join(', ')}`);

  const deploymentResults: DeploymentResult[] = [];

  for (const network of DEPLOYMENT_NETWORKS) {
    try {
      // Switch to the target network
      console.log(`\n🔄 Switching to network: ${network}`);

      // Deploy contracts
      const result = await deployContracts(network);
      deploymentResults.push(result);

      // Verify contracts (optional, may fail on some networks)
      try {
        await verifyContracts(result);
      } catch (verifyError) {
        console.log(`⚠️  Contract verification failed for ${network}, continuing...`);
      }

      // Wait a bit between deployments
      console.log('⏳ Waiting 2 seconds before next deployment...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to deploy to ${network}:`, error);
      // Continue with other networks
    }
  }

  // Save all deployment results
  await saveDeploymentResults(deploymentResults);

  // Print summary
  console.log('\n📊 Deployment Summary:');
  console.log(`✅ Successfully deployed to ${deploymentResults.length} networks`);
  deploymentResults.forEach(result => {
    console.log(`   • ${result.network} (Chain ID: ${result.chainId})`);
    Object.entries(result.contracts).forEach(([name, address]) => {
      console.log(`     - ${name}: ${address}`);
    });
  });

  if (deploymentResults.length === 0) {
    console.log('❌ No successful deployments');
    process.exit(1);
  }

  console.log('\n🎉 Testnet deployment completed!');
}

// Execute the deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Deployment failed:', error);
      process.exit(1);
    });
}

export { main as deployTestnet };
