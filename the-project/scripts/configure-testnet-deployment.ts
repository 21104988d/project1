/**
 * Configure Testnet Deployments Script
 * Sets up network configurations and deployment parameters
 * Version: 1.0.0
 * Date: July 7, 2025
 */

const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer: string;
  currency: string;
  testnet: boolean;
}

const TESTNET_CONFIGURATIONS: NetworkConfig[] = [
  {
    name: 'goerli',
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorer: 'https://goerli.etherscan.io',
    currency: 'ETH',
    testnet: true,
  },
  {
    name: 'sepolia',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorer: 'https://sepolia.etherscan.io',
    currency: 'ETH',
    testnet: true,
  },
  {
    name: 'arbitrumGoerli',
    chainId: 421613,
    rpcUrl: 'https://arbitrum-goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    blockExplorer: 'https://goerli.arbiscan.io',
    currency: 'ETH',
    testnet: true,
  },
  {
    name: 'arbitrumSepolia',
    chainId: 421614,
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    blockExplorer: 'https://sepolia.arbiscan.io',
    currency: 'ETH',
    testnet: true,
  },
];

async function generateDeploymentConfig() {
  console.log('🔧 Generating testnet deployment configurations...');

  const configDir = join(__dirname, '..', 'configs');
  if (!existsSync(configDir)) {
    mkdirSync(configDir, { recursive: true });
  }

  // Generate network configuration file
  const networkConfig = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    testnets: TESTNET_CONFIGURATIONS,
    deploymentOrder: TESTNET_CONFIGURATIONS.map(n => n.name),
    contractsToDeployy: ['EntrypointContract', 'ResolverContract'],
    verificationSettings: {
      enabled: true,
      retryAttempts: 3,
      delayBetweenAttempts: 5000,
    },
  };

  const configFilePath = join(configDir, 'testnet-deployment-config.json');
  writeFileSync(configFilePath, JSON.stringify(networkConfig, null, 2));
  console.log(`✅ Network configuration saved to: ${configFilePath}`);

  // Generate deployment scripts for each network
  for (const network of TESTNET_CONFIGURATIONS) {
    await generateNetworkScript(network);
  }

  console.log('🎉 Testnet deployment configuration completed!');
}

async function generateNetworkScript(network) {
  const scriptsDir = join(__dirname, '..', 'packages', 'contracts', 'scripts', 'deploy');
  if (!existsSync(scriptsDir)) {
    mkdirSync(scriptsDir, { recursive: true });
  }

  const scriptContent = `// Auto-generated deployment script for ${network.name}
// Generated on: ${new Date().toISOString()}

import { ethers, run } from 'hardhat';

async function main() {
  console.log('🚀 Deploying to ${network.name} (Chain ID: ${network.chainId})...');
  
  const [deployer] = await ethers.getSigners();
  console.log('📍 Deploying from:', deployer.address);
  
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log('💰 Balance:', ethers.formatEther(balance), '${network.currency}');

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
    network: '${network.name}',
    chainId: ${network.chainId},
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      EntrypointContract: entrypointAddress,
      ResolverContract: resolverAddress
    },
    blockExplorer: '${network.blockExplorer}'
  };

  console.log('📋 Deployment Summary:', deploymentResult);
  console.log('🎉 ${network.name} deployment completed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  });
`;

  const scriptPath = join(scriptsDir, `deploy-${network.name}.ts`);
  writeFileSync(scriptPath, scriptContent);
  console.log(`✅ Generated deployment script: ${scriptPath}`);
}

async function generateBridgeConfig() {
  console.log('🌉 Generating cross-chain bridge configuration...');

  const bridgeConfig = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    supportedChains: TESTNET_CONFIGURATIONS.map(n => ({
      name: n.name,
      chainId: n.chainId,
      currency: n.currency,
    })),
    bridgeProtocols: [
      {
        name: 'LayerZero',
        supported: true,
        endpoints: {
          goerli: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23',
          arbitrumGoerli: '0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab',
          sepolia: '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
          arbitrumSepolia: '0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3',
        },
      },
      {
        name: 'Wormhole',
        supported: true,
        endpoints: {
          goerli: '0x706abc4E45D419950511e474C7B9Ed348A4a716c',
          arbitrumGoerli: '0x23908A62110e21C04F3A4e011d24F901F911744A',
          sepolia: '0x4a8bc80Ed5a4067f1CCf107057b8270E0cC11A78',
          arbitrumSepolia: '0x41d2f98d32F39b046dCf5F8e8A5d36aE3D21a711',
        },
      },
    ],
    communicationSettings: {
      retryAttempts: 3,
      timeoutMs: 30000,
      gasLimitMultiplier: 1.2,
    },
  };

  const configDir = join(__dirname, '..', 'configs');
  const bridgeConfigPath = join(configDir, 'bridge-config.json');
  writeFileSync(bridgeConfigPath, JSON.stringify(bridgeConfig, null, 2));
  console.log(`✅ Bridge configuration saved to: ${bridgeConfigPath}`);
}

async function main() {
  console.log('🚀 Starting testnet configuration setup...');
  console.log(`📅 Date: ${new Date().toISOString()}`);

  await generateDeploymentConfig();
  await generateBridgeConfig();

  console.log('✅ All testnet configurations completed successfully!');
  console.log('📝 Next steps:');
  console.log('   1. Update .env file with actual RPC URLs and API keys');
  console.log('   2. Run: npm run deploy:testnet --network=<network>');
  console.log('   3. Verify contracts with: VERIFY_CONTRACTS=true npm run deploy:testnet');
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Configuration setup failed:', error);
      process.exit(1);
    });
}

module.exports = { generateDeploymentConfig, generateBridgeConfig };
