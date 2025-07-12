// Quote-related type definitions for The Project
// Focus: Real-time pricing and quote generation

import { Token, SupportedStablecoin } from './tokens';
import { Route } from './routes';

export interface QuoteRequest {
  fromToken: string; // Token address or symbol
  toToken: string;
  amount: string; // Input amount in token units
  fromChain: number;
  toChain?: number;
  slippageTolerance?: number; // 0.005 = 0.5%
  userAddress?: string; // For gas estimation
  includeFees?: boolean;
  includeGasEstimate?: boolean;
  deadline?: number; // Unix timestamp
}

export interface Quote {
  id: string;
  fromToken: Token;
  toToken: Token;
  amountIn: string; // Input amount
  amountOut: string; // Expected output amount
  amountOutMin: string; // Minimum output after slippage
  route: Route;
  priceImpact: number; // Percentage
  executionPrice: string; // Effective exchange rate
  invertedExecutionPrice: string; // Inverted rate
  fees: QuoteFees;
  gasEstimate: GasEstimate;
  timing: QuoteTiming;
  confidence: number; // 0-1 reliability score
  validUntil: string; // ISO timestamp
  warnings?: string[];
}

export interface StablecoinQuote extends Quote {
  fromToken: Token & { symbol: SupportedStablecoin };
  toToken: Token & { symbol: SupportedStablecoin };
  pegDeviation?: {
    fromTokenPeg: number; // Deviation from $1.00
    toTokenPeg: number;
    combinedRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  };
  arbitrageOpportunity?: {
    profitEstimate: string;
    profitPercentage: number;
    confidence: number;
  };
}

export interface QuoteFees {
  protocolFees: {
    protocol: string;
    amount: string; // Fee amount in input token
    percentage: number;
  }[];
  bridgeFees: {
    protocol: string;
    amount: string;
    percentage: number;
  }[];
  platformFee?: {
    amount: string;
    percentage: number;
  };
  totalFeesUSD: string;
  totalFeesPercentage: number;
}

export interface GasEstimate {
  gasLimit: string; // Total gas limit
  gasPrice: string; // Gas price in gwei
  gasCostETH: string; // Total cost in ETH
  gasCostUSD: string; // Total cost in USD
  crossChainGas?: {
    sourceChainGas: string;
    destinationChainGas: string;
    bridgeGas: string;
  };
}

export interface QuoteTiming {
  estimatedTime: number; // Total seconds
  breakdown: {
    swapTime?: number;
    bridgeTime?: number;
    confirmationTime?: number;
  };
  fastestAlternative?: {
    route: Route;
    timeSeconds: number;
    additionalCost: string;
  };
}

export interface PriceQuote {
  tokenAddress: string;
  chainId: number;
  priceUSD: string;
  priceETH?: string;
  source: string; // Price feed source
  timestamp: string;
  confidence: number; // 0-1
  volume24h?: string;
  priceChange24h?: number;
}

export interface DEXQuote {
  dex: string;
  tokenIn: Token;
  tokenOut: Token;
  amountIn: string;
  amountOut: string;
  priceImpact: number;
  fee: number; // Pool fee percentage
  liquidity: string; // Available liquidity
  slippage: number; // Expected slippage
  gasEstimate: string;
  poolAddress?: string;
  route?: string[]; // Token addresses for multi-hop
}

export interface AggregatedQuote {
  bestQuote: Quote;
  allQuotes: Quote[];
  priceComparison: {
    bestPrice: string;
    worstPrice: string;
    priceDifference: string;
    priceDifferencePercentage: number;
  };
  recommendedQuote: Quote;
  metadata: {
    quotesCount: number;
    responseTime: number; // milliseconds
    chainsQueried: number[];
    protocolsQueried: string[];
  };
}

export interface QuoteUpdate {
  quoteId: string;
  type: 'price_update' | 'route_change' | 'expiry_warning' | 'gas_change';
  newQuote?: Quote;
  priceChange?: {
    oldPrice: string;
    newPrice: string;
    changePercentage: number;
  };
  message?: string;
  timestamp: string;
}

export interface QuoteSubscription {
  subscriptionId: string;
  fromToken: string;
  toToken: string;
  amount: string;
  updateInterval: number; // seconds
  priceThreshold?: number; // Minimum % change to trigger update
  isActive: boolean;
  lastUpdate: string;
}

// Real-time quote streaming
export interface QuoteStream {
  subscribe: (params: QuoteRequest) => string; // Returns subscription ID
  unsubscribe: (subscriptionId: string) => void;
  onUpdate: (callback: (update: QuoteUpdate) => void) => void;
  onError: (callback: (error: Error) => void) => void;
}

// Historical quote data
export interface HistoricalQuote {
  timestamp: string;
  quote: Quote;
  executed: boolean;
  actualOutput?: string; // If executed
  slippageExperienced?: number;
}

export interface QuoteHistory {
  tokenPair: string; // "USDT-USDC"
  timeframe: '1h' | '24h' | '7d' | '30d';
  quotes: HistoricalQuote[];
  analytics: {
    averageSlippage: number;
    averagePriceImpact: number;
    bestRoute: string; // Most frequent protocol
    averageExecutionTime: number;
  };
}
