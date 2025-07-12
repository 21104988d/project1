/**
 * Test fixtures for end-to-end and integration testing
 * Contains mock data for USDT-focused testing scenarios
 */

export const mockTokens = {
  USDT: {
    ethereum: {
      symbol: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      chainId: 1,
      name: 'Tether USD',
    },
    arbitrum: {
      symbol: 'USDT',
      address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      decimals: 6,
      chainId: 42161,
      name: 'Tether USD',
    },
  },
  USDC: {
    ethereum: {
      symbol: 'USDC',
      address: '0xA0b86a33E6417c2fd4bb9E3D35b5D7B4A3468C9b',
      decimals: 6,
      chainId: 1,
      name: 'USD Coin',
    },
    arbitrum: {
      symbol: 'USDC',
      address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      decimals: 6,
      chainId: 42161,
      name: 'USD Coin',
    },
  },
};

export const mockSwapQuotes = {
  usdtToUsdc: {
    fromToken: 'USDT',
    toToken: 'USDC',
    amount: '1000000', // 1 USDT (6 decimals)
    expectedOutput: '995000', // 0.995 USDC
    minimumOutput: '990000', // 0.99 USDC with slippage
    priceImpact: '0.5',
    estimatedGas: '150000',
    route: ['USDT', 'USDC'],
    exchangeUsed: 'Uniswap V3',
  },
  largeUsdtToUsdc: {
    fromToken: 'USDT',
    toToken: 'USDC',
    amount: '1000000000', // 1000 USDT
    expectedOutput: '995000000', // 995 USDC
    minimumOutput: '990000000', // 990 USDC with slippage
    priceImpact: '0.5',
    estimatedGas: '180000',
    route: ['USDT', 'USDC'],
    exchangeUsed: 'Uniswap V3',
  },
};

export const mockWalletAddresses = {
  ethereum: '0x742d35Cc6634C0532925a3b8D8FD0E4c',
  arbitrum: '0x8ba1f109551bD432803012645Hac136c30C9AB',
  solana: 'DhzK9o8fcfZ6K3eaZj5QQ8KZgCGHK8XJT9J9KdJH8E8E',
};

export const mockTransactionHashes = {
  ethereum: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  arbitrum: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  pending: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const mockChainData = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io/v3/test',
    blockExplorer: 'https://etherscan.io',
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
  },
};

export const mockErrorResponses = {
  insufficientBalance: {
    error: 'Insufficient balance',
    code: 'INSUFFICIENT_BALANCE',
    details: 'User balance is lower than requested amount',
  },
  unsupportedToken: {
    error: 'Token not supported',
    code: 'UNSUPPORTED_TOKEN',
    details: 'Token is not supported on this chain',
  },
  slippageTooHigh: {
    error: 'Slippage tolerance exceeded',
    code: 'SLIPPAGE_EXCEEDED',
    details: 'Price impact exceeds maximum slippage tolerance',
  },
};
