// scripts/verify-contracts.ts
// 合約驗證腳本 (TypeScript)

import { run } from 'hardhat';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface DeploymentData {
  network: string;
  chainId: number;
  contracts: {
    [contractName: string]: string;
  };
  deployer: string;
}

async function verifyContract(
  contractAddress: string,
  contractName: string,
  constructorArguments: any[] = []
): Promise<void> {
  console.log(`🔍 Verifying ${contractName} at ${contractAddress}...`);

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: constructorArguments,
    });
    console.log(`✅ ${contractName} verified successfully`);
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log(`ℹ️  ${contractName} is already verified`);
    } else {
      console.error(`❌ Failed to verify ${contractName}:`, error.message);
      throw error;
    }
  }
}

async function loadDeploymentData(network?: string): Promise<DeploymentData | null> {
  const deploymentsDir = join(__dirname, '..', 'deployments');

  if (network) {
    const networkFile = join(deploymentsDir, `${network}-deployment.json`);
    if (existsSync(networkFile)) {
      return JSON.parse(readFileSync(networkFile, 'utf8'));
    }
  }

  // Try to load latest deployment
  const latestFile = join(deploymentsDir, 'latest-testnet-deployment.json');
  if (existsSync(latestFile)) {
    const data = JSON.parse(readFileSync(latestFile, 'utf8'));
    // Return the first network's deployment data
    if (data.networks && data.networks.length > 0) {
      return data.networks[0];
    }
  }

  return null;
}

async function main(): Promise<void> {
  const networkName = process.env.HARDHAT_NETWORK || process.argv[2];
  const contractAddress = process.argv[3];

  if (contractAddress) {
    // Verify single contract by address
    console.log(`🚀 Verifying contract at address: ${contractAddress}`);
    await verifyContract(contractAddress, 'Contract', []);
    return;
  }

  if (!networkName) {
    console.error('❌ Please specify network name or contract address');
    console.log('Usage: npm run verify -- <network> or npm run verify -- <address>');
    console.log('Example: npm run verify -- goerli');
    console.log('Example: npm run verify -- 0x1234567890123456789012345678901234567890');
    process.exit(1);
  }

  console.log(`🚀 Starting contract verification for network: ${networkName}`);

  // Load deployment data
  const deploymentData = await loadDeploymentData(networkName);

  if (!deploymentData) {
    console.error(`❌ No deployment data found for network: ${networkName}`);
    console.log('Make sure you have deployed contracts to this network first.');
    process.exit(1);
  }

  console.log(`📍 Network: ${deploymentData.network} (Chain ID: ${deploymentData.chainId})`);
  console.log(`👤 Deployer: ${deploymentData.deployer}`);

  // Verify each contract
  for (const [contractName, contractAddress] of Object.entries(deploymentData.contracts)) {
    try {
      // Constructor arguments for each contract type
      let constructorArgs: any[] = [];

      switch (contractName) {
        case 'EntrypointContract':
        case 'ResolverContract':
          constructorArgs = [deploymentData.deployer]; // initialOwner
          break;
        default:
          constructorArgs = [];
      }

      await verifyContract(contractAddress, contractName, constructorArgs);

      // Wait between verifications to avoid rate limiting
      console.log('⏳ Waiting 2 seconds before next verification...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to verify ${contractName}:`, error);
      // Continue with other contracts
    }
  }

  console.log('🎉 Contract verification process completed!');
}

main().catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});
