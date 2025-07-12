// Route-related type definitions for The Project
// Focus: USDT/USDC routing and cross-chain pathfinding

import { Token, SupportedStablecoin } from './tokens';

export interface RouteStep {
  protocol: string; // 'Uniswap', 'Curve', 'Stargate', etc.
  action: 'swap' | 'bridge' | 'deposit' | 'withdraw';
  fromToken: Token;
  toToken: Token;
  fromChain: number;
  toChain?: number;
  amountIn: string; // BigNumber string
  amountOut: string; // Expected output
  gasEstimate: string; // Gas cost in wei
  timeEstimate?: number; // Seconds
  slippageTolerance: number; // e.g., 0.005 for 0.5%
  priceImpact: number; // Price impact percentage
  fee?: {
    amount: string;
    percentage: number;
    recipient?: string;
  };
  calldata?: string; // Transaction calldata
}

export interface Route {
  id: string;
  steps: RouteStep[];
  fromToken: Token;
  toToken: Token;
  amountIn: string;
  amountOut: string; // Expected final output
  totalGasEstimate: string;
  totalTimeEstimate: number; // Total seconds
  totalPriceImpact: number;
  totalFees: string; // Total fees in USD
  confidence: number; // Route reliability score 0-1
  tags?: string[]; // ['fast', 'cheap', 'secure', 'arbitrage']
}

export interface StablecoinRoute extends Route {
  fromToken: Token & { symbol: SupportedStablecoin };
  toToken: Token & { symbol: SupportedStablecoin };
  arbitrageBonus?: string; // Additional yield from arbitrage
  yieldOpportunity?: {
    protocol: string;
    apy: number;
    duration: number; // seconds
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
  };
}

export interface CrossChainRoute extends Route {
  bridgeProtocol: string;
  bridgeFee: string;
  bridgeTime: number; // seconds
  bridgeRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  sourceChain: number;
  destinationChain: number;
}

export interface RouteRequest {
  fromToken: string; // Token address or symbol
  toToken: string;
  amount: string; // Input amount
  fromChain: number;
  toChain?: number; // If cross-chain
  slippageTolerance?: number; // Default 0.005 (0.5%)
  deadline?: number; // Unix timestamp
  userAddress?: string; // For personalized routing
  priority?: 'speed' | 'cost' | 'security' | 'yield';
  maxHops?: number; // Maximum route complexity
  excludeProtocols?: string[]; // Protocols to avoid
  includeArbitrage?: boolean; // Look for arbitrage opportunities
}

export interface RouteResponse {
  routes: Route[];
  bestRoute: Route;
  metadata: {
    requestId: string;
    timestamp: string;
    computeTime: number; // milliseconds
    chainsScanned: number[];
    protocolsScanned: string[];
  };
  warnings?: string[];
  errors?: string[];
}

export interface PathNode {
  chainId: number;
  token: Token;
  balance?: string;
  price?: string; // Price in USD
}

export interface PathEdge {
  from: PathNode;
  to: PathNode;
  protocol: string;
  weight: number; // Cost-adjusted exchange rate
  gasEstimate: string;
  fee: number; // Percentage fee
  liquidity?: string; // Available liquidity
}

export interface RouteOptimizationConfig {
  maxSlippage: number;
  maxPriceImpact: number;
  maxGasCost: string; // in wei
  maxTimeSeconds: number;
  preferredProtocols?: string[];
  avoidProtocols?: string[];
  enableArbitrage: boolean;
  enableYieldOptimization: boolean;
}

// Arbitrage-specific route types
export interface ArbitrageRoute extends Route {
  arbitrageType: 'cross-chain' | 'cross-dex' | 'stable-swap' | 'yield';
  profitEstimate: string; // Expected profit in USD
  profitPercentage: number; // Profit as percentage of input
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  executionTimeWindow: number; // seconds before opportunity expires
  requiredCapital: string; // Minimum amount for profitability
}

export interface RouteExecutionStatus {
  routeId: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  currentStep: number;
  totalSteps: number;
  transactions: {
    hash: string;
    chainId: number;
    status: 'pending' | 'confirmed' | 'failed';
    gasUsed?: string;
    blockNumber?: number;
    timestamp?: string;
  }[];
  amountReceived?: string;
  actualGasUsed?: string;
  actualTimeElapsed?: number;
  error?: string;
}
