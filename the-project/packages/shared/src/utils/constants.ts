/**
 * Constants and configuration values for the cross-chain DApp router
 */

// Chain IDs
export const CHAIN_IDS = {
  ETHEREUM_MAINNET: 1,
  ETHEREUM_GOERLI: 5,
  ETHEREUM_SEPOLIA: 11155111,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  POLYGON_MAINNET: 137,
  POLYGON_MUMBAI: 80001,
  ARBITRUM_MAINNET: 42161,
  ARBITRUM_GOERLI: 421613,
  OPTIMISM_MAINNET: 10,
  OPTIMISM_GOERLI: 420,
  AVALANCHE_MAINNET: 43114,
  AVALANCHE_FUJI: 43113,
  FANTOM_MAINNET: 250,
  FANTOM_TESTNET: 4002,
  SOLANA_MAINNET: 101,
  SOLANA_DEVNET: 103,
} as const;

// Chain information
export const CHAIN_INFO = {
  [CHAIN_IDS.ETHEREUM_MAINNET]: {
    name: 'Ethereum',
    symbol: 'ETH',
    type: 'ethereum',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  [CHAIN_IDS.BSC_MAINNET]: {
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    type: 'ethereum',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org',
  },
  [CHAIN_IDS.POLYGON_MAINNET]: {
    name: 'Polygon',
    symbol: 'MATIC',
    type: 'ethereum',
    explorerUrl: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com',
  },
  [CHAIN_IDS.ARBITRUM_MAINNET]: {
    name: 'Arbitrum One',
    symbol: 'ETH',
    type: 'ethereum',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
  },
  [CHAIN_IDS.OPTIMISM_MAINNET]: {
    name: 'Optimism',
    symbol: 'ETH',
    type: 'ethereum',
    explorerUrl: 'https://optimistic.etherscan.io',
    rpcUrl: 'https://mainnet.optimism.io',
  },
  [CHAIN_IDS.AVALANCHE_MAINNET]: {
    name: 'Avalanche',
    symbol: 'AVAX',
    type: 'ethereum',
    explorerUrl: 'https://snowtrace.io',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  },
  [CHAIN_IDS.FANTOM_MAINNET]: {
    name: 'Fantom',
    symbol: 'FTM',
    type: 'ethereum',
    explorerUrl: 'https://ftmscan.com',
    rpcUrl: 'https://rpc.ftm.tools',
  },
  [CHAIN_IDS.SOLANA_MAINNET]: {
    name: 'Solana',
    symbol: 'SOL',
    type: 'solana',
    explorerUrl: 'https://explorer.solana.com',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
  },
} as const;

// Approved stablecoins for arbitrage
export const APPROVED_STABLECOINS = ['USDT', 'USDC'] as const;

// Stablecoin contract addresses by chain
export const STABLECOIN_ADDRESSES = {
  [CHAIN_IDS.ETHEREUM_MAINNET]: {
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86a33E6448193c3Cf4FB58E3E2e80e96C5B8B', // Note: Standard USDC address
  },
  [CHAIN_IDS.BSC_MAINNET]: {
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  },
  [CHAIN_IDS.POLYGON_MAINNET]: {
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  },
  [CHAIN_IDS.ARBITRUM_MAINNET]: {
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  },
  [CHAIN_IDS.OPTIMISM_MAINNET]: {
    USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    USDC: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  },
  [CHAIN_IDS.AVALANCHE_MAINNET]: {
    USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  },
  // Adding Fantom support as mentioned in approved list
  [CHAIN_IDS.FANTOM_MAINNET]: {
    USDT: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
  },
  // Adding Solana support as mentioned in approved list
  [CHAIN_IDS.SOLANA_MAINNET]: {
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Native USDC on Solana
  },
} as const;

// USDT contract addresses by chain (mainnet only)
export const USDT_CONTRACTS = {
  1: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Ethereum
  56: '0x55d398326f99059fF775485246999027B3197955', // BSC
  137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // Polygon
  42161: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // Arbitrum
  10: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // Optimism
  43114: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // Avalanche
};

export const SUPPORTED_USDT_CHAINS = [1, 56, 137, 42161, 10, 43114];

// DEX information
export const DEX_INFO = {
  UNISWAP_V3: {
    name: 'Uniswap V3',
    type: 'amm',
    fee: 0.003, // 0.3%
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.ARBITRUM_MAINNET,
      CHAIN_IDS.OPTIMISM_MAINNET,
    ],
  },
  PANCAKESWAP_V3: {
    name: 'PancakeSwap V3',
    type: 'amm',
    fee: 0.0025, // 0.25%
    supportedChains: [CHAIN_IDS.BSC_MAINNET],
  },
  TRADER_JOE: {
    name: 'Trader Joe',
    type: 'amm',
    fee: 0.003, // 0.3%
    supportedChains: [CHAIN_IDS.AVALANCHE_MAINNET],
  },
  JUPITER: {
    name: 'Jupiter',
    type: 'aggregator',
    fee: 0.001, // 0.1%
    supportedChains: [CHAIN_IDS.SOLANA_MAINNET],
  },
  CURVE_FINANCE: {
    name: 'Curve Finance',
    type: 'stable-amm',
    fee: 0.0004, // 0.04%
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.ARBITRUM_MAINNET,
      CHAIN_IDS.AVALANCHE_MAINNET,
      CHAIN_IDS.FANTOM_MAINNET,
    ],
  },
  BALANCER: {
    name: 'Balancer',
    type: 'weighted-amm',
    fee: 0.003, // 0.3%
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.ARBITRUM_MAINNET,
    ],
  },
  SUSHISWAP: {
    name: 'SushiSwap',
    type: 'amm',
    fee: 0.003, // 0.3%
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.BSC_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.ARBITRUM_MAINNET,
      CHAIN_IDS.AVALANCHE_MAINNET,
      CHAIN_IDS.FANTOM_MAINNET,
    ],
  },
  SPOOKYSWAP: {
    name: 'SpookySwap',
    type: 'amm',
    fee: 0.003, // 0.3%
    supportedChains: [CHAIN_IDS.FANTOM_MAINNET],
  },
} as const;

// Default configuration values
export const DEFAULT_CONFIG = {
  SLIPPAGE_TOLERANCE: 0.005, // 0.5%
  DEADLINE_MINUTES: 20,
  MAX_PRICE_IMPACT: 0.15, // 15%
  MIN_ARBITRAGE_PROFIT: 0.001, // 0.1%
  GAS_LIMIT_BUFFER: 1.2, // 20% buffer
  QUOTE_TIMEOUT_MS: 30000, // 30 seconds
  ROUTE_TIMEOUT_MS: 60000, // 1 minute
  MAX_HOPS: 3,
  REFRESH_INTERVAL_MS: 5000, // 5 seconds
} as const;

// Error codes
export const ERROR_CODES = {
  INVALID_CHAIN: 'INVALID_CHAIN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INSUFFICIENT_LIQUIDITY: 'INSUFFICIENT_LIQUIDITY',
  SLIPPAGE_TOO_HIGH: 'SLIPPAGE_TOO_HIGH',
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',
  TRANSACTION_FAILED: 'TRANSACTION_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  QUOTE_EXPIRED: 'QUOTE_EXPIRED',
  ROUTE_NOT_FOUND: 'ROUTE_NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  RATE_LIMITED: 'RATE_LIMITED',
  BRIDGE_ERROR: 'BRIDGE_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  QUOTE: '/api/v1/quote',
  ROUTE: '/api/v1/route',
  EXECUTE: '/api/v1/execute',
  STATUS: '/api/v1/status',
  TOKENS: '/api/v1/tokens',
  CHAINS: '/api/v1/chains',
  WEBSOCKET: '/ws',
} as const;

// WebSocket events
export const WS_EVENTS = {
  PRICE_UPDATE: 'price_update',
  ROUTE_UPDATE: 'route_update',
  TRANSACTION_UPDATE: 'transaction_update',
  CONNECTION_STATUS: 'connection_status',
  ERROR: 'error',
} as const;

// Token decimals
export const TOKEN_DECIMALS = {
  USDT: 6,
  USDC: 6,
  ETH: 18,
  BNB: 18,
  MATIC: 18,
  AVAX: 18,
  SOL: 9,
} as const;

// Gas estimation multipliers for different chains
export const GAS_MULTIPLIERS = {
  [CHAIN_IDS.ETHEREUM_MAINNET]: 1.5,
  [CHAIN_IDS.BSC_MAINNET]: 1.2,
  [CHAIN_IDS.POLYGON_MAINNET]: 1.3,
  [CHAIN_IDS.ARBITRUM_MAINNET]: 1.1,
  [CHAIN_IDS.OPTIMISM_MAINNET]: 1.1,
  [CHAIN_IDS.AVALANCHE_MAINNET]: 1.2,
  [CHAIN_IDS.FANTOM_MAINNET]: 1.1,
} as const;

// Bridge provider information
export const BRIDGE_PROVIDERS = {
  WORMHOLE: {
    name: 'Wormhole',
    fee: 0.001, // 0.1%
    estimatedTime: 900000, // 15 minutes in ms
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.BSC_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.AVALANCHE_MAINNET,
      CHAIN_IDS.FANTOM_MAINNET,
      CHAIN_IDS.SOLANA_MAINNET,
    ],
  },
  STARGATE: {
    name: 'Stargate',
    fee: 0.0006, // 0.06%
    estimatedTime: 1200000, // 20 minutes in ms
    supportedChains: [
      CHAIN_IDS.ETHEREUM_MAINNET,
      CHAIN_IDS.BSC_MAINNET,
      CHAIN_IDS.POLYGON_MAINNET,
      CHAIN_IDS.ARBITRUM_MAINNET,
      CHAIN_IDS.OPTIMISM_MAINNET,
      CHAIN_IDS.AVALANCHE_MAINNET,
      CHAIN_IDS.FANTOM_MAINNET,
    ],
  },
} as const;

// Risk assessment thresholds
export const RISK_THRESHOLDS = {
  LOW_RISK: {
    maxPriceImpact: 0.01, // 1%
    maxSlippage: 0.005, // 0.5%
    minLiquidity: 1000000, // $1M
  },
  MEDIUM_RISK: {
    maxPriceImpact: 0.05, // 5%
    maxSlippage: 0.02, // 2%
    minLiquidity: 100000, // $100K
  },
  HIGH_RISK: {
    maxPriceImpact: 0.15, // 15%
    maxSlippage: 0.05, // 5%
    minLiquidity: 10000, // $10K
  },
} as const;

// Environment variables (with defaults)
export const ENV_DEFAULTS = {
  NODE_ENV: 'development',
  PORT: 3000,
  WS_PORT: 3001,
  LOG_LEVEL: 'info',
  CACHE_TTL: 300000, // 5 minutes
  DB_POOL_SIZE: 10,
  RATE_LIMIT_WINDOW: 900000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
} as const;
