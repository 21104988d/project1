/**
 * Demo Data Configuration for Department Reviews
 *
 * This file provides realistic demo data to showcase the application
 * functionality without requiring real blockchain connections.
 */

export interface DemoTransaction {
  id: string;
  type: 'swap' | 'bridge' | 'transfer';
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  fromChain: string;
  toChain: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: number;
  txHash: string;
  gasUsed?: string;
  fee: string;
}

export interface DemoWallet {
  address: string;
  balances: Record<string, string>;
  isConnected: boolean;
  network: string;
}

export interface DemoToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  price: number;
  chain: string;
}

// Demo wallet configuration
export const DEMO_WALLET: DemoWallet = {
  address: '0x742d35Cc6634C0532925a3b8D8693d58E7eb1234',
  balances: {
    USDT: '10,247.50',
    USDC: '5,432.18',
    DAI: '2,651.09',
    ETH: '3.247',
    MATIC: '1,250.00',
    AVAX: '127.85',
  },
  isConnected: true,
  network: 'ethereum',
};

// Demo token list
export const DEMO_TOKENS: DemoToken[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    logoURI: '/tokens/usdt.svg',
    price: 1.0,
    chain: 'ethereum',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6B3e9C8B30F0d2c4dDc8D6f23e35A2F',
    decimals: 6,
    logoURI: '/tokens/usdc.svg',
    price: 0.9998,
    chain: 'ethereum',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    logoURI: '/tokens/dai.svg',
    price: 1.0001,
    chain: 'ethereum',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD (Polygon)',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    logoURI: '/tokens/usdt.svg',
    price: 1.0,
    chain: 'polygon',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin (Polygon)',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    logoURI: '/tokens/usdc.svg',
    price: 0.9998,
    chain: 'polygon',
  },
];

// Demo transaction history
export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  {
    id: 'tx_001',
    type: 'swap',
    fromToken: 'USDT',
    toToken: 'USDC',
    fromAmount: '1000.00',
    toAmount: '999.25',
    fromChain: 'ethereum',
    toChain: 'ethereum',
    status: 'completed',
    timestamp: Date.now() - 3600000, // 1 hour ago
    txHash: '0x8a7d9b2c4e5f6a8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
    gasUsed: '0.0045',
    fee: '4.50',
  },
  {
    id: 'tx_002',
    type: 'bridge',
    fromToken: 'USDC',
    toToken: 'USDC',
    fromAmount: '500.00',
    toAmount: '499.75',
    fromChain: 'ethereum',
    toChain: 'polygon',
    status: 'completed',
    timestamp: Date.now() - 7200000, // 2 hours ago
    txHash: '0x7b6c8d9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c',
    fee: '12.30',
  },
  {
    id: 'tx_003',
    type: 'swap',
    fromToken: 'DAI',
    toToken: 'USDT',
    fromAmount: '250.00',
    toAmount: '249.87',
    fromChain: 'ethereum',
    toChain: 'ethereum',
    status: 'pending',
    timestamp: Date.now() - 300000, // 5 minutes ago
    txHash: '0x6c5d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    fee: '3.75',
  },
  {
    id: 'tx_004',
    type: 'bridge',
    fromToken: 'USDT',
    toToken: 'USDT',
    fromAmount: '2000.00',
    toAmount: '1995.50',
    fromChain: 'polygon',
    toChain: 'avalanche',
    status: 'completed',
    timestamp: Date.now() - 86400000, // 1 day ago
    txHash: '0x5b4c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    fee: '8.75',
  },
  {
    id: 'tx_005',
    type: 'swap',
    fromToken: 'USDC',
    toToken: 'DAI',
    fromAmount: '100.00',
    toAmount: '100.02',
    fromChain: 'ethereum',
    toChain: 'ethereum',
    status: 'failed',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    txHash: '0x4a3b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    fee: '0.00',
  },
];

// Demo price data
export const DEMO_PRICES = {
  USDT: { usd: 1.0, change24h: 0.01 },
  USDC: { usd: 0.9998, change24h: -0.02 },
  DAI: { usd: 1.0001, change24h: 0.01 },
  ETH: { usd: 2347.82, change24h: 2.34 },
  MATIC: { usd: 0.8945, change24h: -1.23 },
  AVAX: { usd: 28.74, change24h: 1.87 },
};

// Demo swap routes
export const DEMO_SWAP_ROUTES = [
  {
    id: 'route_1',
    name: 'Direct Swap',
    fromAmount: '1000.00',
    toAmount: '999.25',
    gasEstimate: '0.0045 ETH',
    fee: '$4.50',
    time: '~2 minutes',
    steps: ['Ethereum DEX'],
    recommended: true,
  },
  {
    id: 'route_2',
    name: 'Bridge + Swap',
    fromAmount: '1000.00',
    toAmount: '997.80',
    gasEstimate: '0.0032 ETH',
    fee: '$8.75',
    time: '~5 minutes',
    steps: ['Bridge to Polygon', 'Polygon DEX'],
    recommended: false,
  },
  {
    id: 'route_3',
    name: 'Multi-hop',
    fromAmount: '1000.00',
    toAmount: '996.45',
    gasEstimate: '0.0038 ETH',
    fee: '$6.20',
    time: '~3 minutes',
    steps: ['DEX 1', 'DEX 2', 'DEX 3'],
    recommended: false,
  },
];

// Demo notifications
export const DEMO_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'success',
    title: 'Swap Completed',
    message: 'Successfully swapped 1000 USDT for 999.25 USDC',
    timestamp: Date.now() - 3600000,
    read: false,
  },
  {
    id: 'notif_2',
    type: 'info',
    title: 'New Route Available',
    message: 'Found a better route with 15% lower fees',
    timestamp: Date.now() - 7200000,
    read: true,
  },
  {
    id: 'notif_3',
    type: 'warning',
    title: 'High Network Congestion',
    message: 'Ethereum gas fees are currently elevated',
    timestamp: Date.now() - 10800000,
    read: true,
  },
];

// Helper functions for demo mode
export const isDemoMode = () => {
  return (
    import.meta.env.VITE_DEMO_MODE === 'true' ||
    import.meta.env.MODE === 'demo' ||
    window.location.search.includes('demo=true')
  );
};

export const getDemoWallet = () => DEMO_WALLET;
export const getDemoTokens = () => DEMO_TOKENS;
export const getDemoTransactions = () => DEMO_TRANSACTIONS;
export const getDemoPrices = () => DEMO_PRICES;
export const getDemoSwapRoutes = () => DEMO_SWAP_ROUTES;
export const getDemoNotifications = () => DEMO_NOTIFICATIONS;

// Mock API responses for demo
export const mockApiResponse = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};

export default {
  isDemoMode,
  DEMO_WALLET,
  DEMO_TOKENS,
  DEMO_TRANSACTIONS,
  DEMO_PRICES,
  DEMO_SWAP_ROUTES,
  DEMO_NOTIFICATIONS,
  getDemoWallet,
  getDemoTokens,
  getDemoTransactions,
  getDemoPrices,
  getDemoSwapRoutes,
  getDemoNotifications,
  mockApiResponse,
};
