// Chain-related type definitions for The Project
// Focus: Multi-chain support with USDT/USDC priority chains

export interface Chain {
  id: number;
  name: string;
  symbol: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  iconUrl?: string;
  isMainnet: boolean;
  isTestnet: boolean;
}

export interface EVMChain extends Chain {
  type: 'EVM';
  gasToken: string; // 'ETH', 'MATIC', 'BNB', etc.
  maxGasLimit: string;
  avgBlockTime: number; // seconds
  confirmations: number; // Required confirmations
}

export interface SolanaChain extends Chain {
  type: 'SOLANA';
  cluster: 'mainnet-beta' | 'testnet' | 'devnet';
  commitment: 'confirmed' | 'finalized';
}

// Priority chains for Phase 1 (USDT/USDC focus)
export const PRIORITY_CHAINS = {
  ETHEREUM: 1,
  ARBITRUM: 42161,
  POLYGON: 137,
  BSC: 56,
  AVALANCHE: 43114,
  OPTIMISM: 10,
  SOLANA: 1001, // Using custom ID for Solana
} as const;

export type PriorityChainId = (typeof PRIORITY_CHAINS)[keyof typeof PRIORITY_CHAINS];

export interface ChainConfig {
  chain: Chain;
  rpcs: {
    primary: string;
    fallback: string[];
  };
  contracts: {
    multicall?: string;
    entrypoint?: string;
    resolver?: string;
  };
  bridges: string[]; // Supported bridge protocols
  dexes: string[]; // Available DEXs
  stablecoins: {
    USDT?: string; // Contract address
    USDC?: string;
    DAI?: string;
    // Future stablecoins...
  };
  features: {
    arbitrage: boolean;
    yield: boolean;
    bridging: boolean;
    fastFinality: boolean;
  };
  limits: {
    maxTransactionValue: string; // In USD
    maxGasPrice: string; // In gwei for EVM
    maxSlippage: number; // Percentage
  };
}

export interface BridgeInfo {
  name: string;
  protocol: string;
  fromChain: number;
  toChain: number;
  supportedTokens: string[]; // Token symbols
  fee: {
    fixed?: string; // Fixed fee in USD
    percentage?: number; // Percentage fee
  };
  timeEstimate: {
    min: number; // seconds
    max: number;
    average: number;
  };
  security: {
    type: 'LOCK_MINT' | 'BURN_MINT' | 'LIQUIDITY_POOL';
    audits: string[];
    tvl: string; // Total Value Locked
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  limits: {
    min: string; // Minimum bridge amount
    max: string; // Maximum bridge amount
    daily?: string; // Daily limit
  };
}

export interface ChainStatus {
  chainId: number;
  isOnline: boolean;
  blockHeight: number;
  lastBlockTime: string;
  gasPrice: {
    slow: string;
    standard: string;
    fast: string;
    unit: 'gwei' | 'lamports';
  };
  congestion: 'LOW' | 'MEDIUM' | 'HIGH';
  avgConfirmationTime: number; // seconds
  issues?: string[]; // Known issues
}

export interface CrossChainMessage {
  id: string;
  fromChain: number;
  toChain: number;
  protocol: string; // LayerZero, Hyperlane, etc.
  status: 'pending' | 'relayed' | 'delivered' | 'failed';
  payload: string;
  gasLimit: string;
  gasUsed?: string;
  timestamps: {
    initiated: string;
    relayed?: string;
    delivered?: string;
  };
}

export interface ChainMetrics {
  chainId: number;
  volume24h: string; // USD volume
  transactions24h: number;
  avgGasPrice: string;
  tvl: string; // Total Value Locked
  bridgeVolume24h: string;
  topTokens: {
    symbol: string;
    volume: string;
    tvl: string;
  }[];
  uptime: number; // Percentage
}

// Network constants for different environments
export interface NetworkEnvironment {
  name: 'mainnet' | 'testnet' | 'development';
  chains: ChainConfig[];
  defaultChain: number;
  features: {
    arbitrage: boolean;
    realMoney: boolean;
    analytics: boolean;
  };
}

export interface ChainValidator {
  isValidChainId: (chainId: number) => boolean;
  isSupported: (chainId: number) => boolean;
  isPriorityChain: (chainId: number) => boolean;
  getChainConfig: (chainId: number) => ChainConfig | null;
  getSupportedTokens: (chainId: number) => string[];
  getBridgeOptions: (fromChain: number, toChain: number) => BridgeInfo[];
}

// Events for chain monitoring
export interface ChainEvent {
  type: 'block' | 'transaction' | 'bridge' | 'gas_price_change';
  chainId: number;
  data: any;
  timestamp: string;
}

export interface ChainMonitor {
  subscribe: (chainId: number, callback: (event: ChainEvent) => void) => string;
  unsubscribe: (subscriptionId: string) => void;
  getStatus: (chainId: number) => Promise<ChainStatus>;
  getMetrics: (chainId: number) => Promise<ChainMetrics>;
}
