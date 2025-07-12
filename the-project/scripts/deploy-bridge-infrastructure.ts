// scripts/deploy-bridge-infrastructure.ts
// Deploy and configure cross-chain bridge infrastructure

import { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

interface NetworkConfig {
  chainId: number;
  name: string;
  layerZeroEndpoint?: string;
  stargateRouter?: string;
  supportedTokens: {
    [symbol: string]: {
      address: string;
      stargatePoolId?: number;
    };
  };
}

const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    layerZeroEndpoint: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
    stargateRouter: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
    supportedTokens: {
      USDT: {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        stargatePoolId: 2,
      },
      USDC: {
        address: '0xA0b86a33E6441c8C61829865afeD6f7e12e1aE4b',
        stargatePoolId: 1,
      },
    },
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    layerZeroEndpoint: '0x3c2269811836af69497E5F486A85D7316753cf62',
    stargateRouter: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
    supportedTokens: {
      USDT: {
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        stargatePoolId: 2,
      },
      USDC: {
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        stargatePoolId: 1,
      },
    },
  },
  goerli: {
    chainId: 5,
    name: 'Goerli Testnet',
    layerZeroEndpoint: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23',
    stargateRouter: '0x7612aE2a34E5A363E137De748801FB4c86499152',
    supportedTokens: {
      USDT: {
        address: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9',
        stargatePoolId: 2,
      },
      USDC: {
        address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
        stargatePoolId: 1,
      },
    },
  },
  arbitrumGoerli: {
    chainId: 421613,
    name: 'Arbitrum Goerli',
    layerZeroEndpoint: '0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab',
    stargateRouter: '0xb850873f4c993Ac2405A1AdD71F6ca5D4d4d6b28',
    supportedTokens: {
      USDT: {
        address: '0x533046F316590C19d99c74eE661c6d541b64471C',
        stargatePoolId: 2,
      },
      USDC: {
        address: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
        stargatePoolId: 1,
      },
    },
  },
};

async function deployBridgeInfrastructure(hre: HardhatRuntimeEnvironment) {
  const { ethers, network } = hre;
  const [deployer] = await ethers.getSigners();
  const networkName = network.name;
  const config = NETWORK_CONFIGS[networkName];

  if (!config) {
    throw new Error(`Network ${networkName} not configured`);
  }

  console.log(`🚀 Deploying bridge infrastructure on ${config.name}...`);
  console.log(`📍 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);

  const deployedContracts: Record<string, string> = {};

  try {
    // 1. Deploy CrossChainMessenger
    console.log('\n📡 Deploying CrossChainMessenger...');
    const CrossChainMessenger = await ethers.getContractFactory('CrossChainMessenger');
    const crossChainMessenger = await CrossChainMessenger.deploy();
    await crossChainMessenger.deployed();
    deployedContracts.crossChainMessenger = crossChainMessenger.address;
    console.log(`✅ CrossChainMessenger deployed at: ${crossChainMessenger.address}`);

    // 2. Deploy LayerZero Bridge Adapter
    if (config.layerZeroEndpoint) {
      console.log('\n🌉 Deploying LayerZero Bridge Adapter...');
      const LayerZeroBridgeAdapter = await ethers.getContractFactory('LayerZeroBridgeAdapter');
      const layerZeroBridge = await LayerZeroBridgeAdapter.deploy(config.layerZeroEndpoint);
      await layerZeroBridge.deployed();
      deployedContracts.layerZeroBridge = layerZeroBridge.address;
      console.log(`✅ LayerZero Bridge Adapter deployed at: ${layerZeroBridge.address}`);

      // Configure supported tokens
      for (const [symbol, tokenConfig] of Object.entries(config.supportedTokens)) {
        console.log(`   📝 Setting up ${symbol} support...`);
        await layerZeroBridge.setSupportedToken(tokenConfig.address, true);
        console.log(`   ✅ ${symbol} support enabled`);
      }
    }

    // 3. Deploy Stargate Bridge Adapter
    if (config.stargateRouter) {
      console.log('\n⭐ Deploying Stargate Bridge Adapter...');
      const StargateBridgeAdapter = await ethers.getContractFactory('StargateBridgeAdapter');
      const stargateBridge = await StargateBridgeAdapter.deploy(config.stargateRouter);
      await stargateBridge.deployed();
      deployedContracts.stargateBridge = stargateBridge.address;
      console.log(`✅ Stargate Bridge Adapter deployed at: ${stargateBridge.address}`);

      // Configure pool IDs for tokens
      for (const [symbol, tokenConfig] of Object.entries(config.supportedTokens)) {
        if (tokenConfig.stargatePoolId) {
          console.log(`   📝 Setting ${symbol} pool ID to ${tokenConfig.stargatePoolId}...`);
          await stargateBridge.setTokenPoolId(tokenConfig.address, tokenConfig.stargatePoolId);
          console.log(`   ✅ ${symbol} pool ID configured`);
        }
      }
    }

    // 4. Deploy Bridge Manager
    console.log('\n🎯 Deploying Bridge Manager...');
    const BridgeManager = await ethers.getContractFactory('BridgeManager');
    const bridgeManager = await BridgeManager.deploy();
    await bridgeManager.deployed();
    deployedContracts.bridgeManager = bridgeManager.address;
    console.log(`✅ Bridge Manager deployed at: ${bridgeManager.address}`);

    // 5. Register bridges with manager
    if (deployedContracts.layerZeroBridge) {
      console.log('\n📋 Registering LayerZero bridge...');
      await bridgeManager.registerBridge(
        'LayerZero',
        deployedContracts.layerZeroBridge,
        1 // High priority
      );
      console.log('✅ LayerZero bridge registered');
    }

    if (deployedContracts.stargateBridge) {
      console.log('\n📋 Registering Stargate bridge...');
      await bridgeManager.registerBridge(
        'Stargate',
        deployedContracts.stargateBridge,
        2 // Medium priority
      );
      console.log('✅ Stargate bridge registered');
    }

    // 6. Configure cross-chain endpoints
    console.log('\n🔗 Configuring cross-chain endpoints...');
    const chainIds = Object.values(NETWORK_CONFIGS).map(c => c.chainId);
    const currentChainId = config.chainId;

    for (const chainId of chainIds) {
      if (chainId !== currentChainId) {
        console.log(`   📡 Adding support for chain ${chainId}...`);
        await crossChainMessenger.addSupportedChain(
          chainId,
          deployedContracts.crossChainMessenger // Will be updated with actual remote addresses
        );

        if (deployedContracts.stargateBridge) {
          await ethers.getContractAt('StargateBridgeAdapter', deployedContracts.stargateBridge);
          const stargateBridge = await ethers.getContractAt(
            'StargateBridgeAdapter',
            deployedContracts.stargateBridge
          );
          await stargateBridge.setSupportedChain(chainId, true);
        }
      }
    }

    // 7. Save deployment info
    const deploymentInfo = {
      network: config.name,
      chainId: config.chainId,
      timestamp: new Date().toISOString(),
      deployer: deployer.address,
      contracts: deployedContracts,
      configuration: {
        supportedTokens: config.supportedTokens,
        endpoints: {
          layerZero: config.layerZeroEndpoint,
          stargate: config.stargateRouter,
        },
      },
    };

    console.log('\n💾 Saving deployment information...');
    const fs = require('fs');
    const path = require('path');
    const deploymentsDir = path.join(__dirname, '../deployments');

    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(deploymentsDir, `bridge-${networkName}.json`),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('\n🎉 Bridge infrastructure deployment complete!');
    console.log('📋 Deployment Summary:');
    console.log('====================================');
    for (const [name, address] of Object.entries(deployedContracts)) {
      console.log(`${name}: ${address}`);
    }

    console.log('\n📝 Next Steps:');
    console.log('1. Deploy on other target networks');
    console.log('2. Configure trusted remotes for LayerZero adapters');
    console.log('3. Set preferred bridges for specific token/chain pairs');
    console.log('4. Fund bridge adapters with native tokens for gas');
    console.log('5. Test cross-chain transactions on testnet');

    return deployedContracts;
  } catch (error) {
    console.error('❌ Bridge infrastructure deployment failed:', error);
    throw error;
  }
}

// For standalone execution
async function main() {
  const hre = require('hardhat');
  await deployBridgeInfrastructure(hre);
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

export { deployBridgeInfrastructure, NETWORK_CONFIGS };
