// USDT-specific type definitions for shared libraries
import { Token } from './tokens';

export interface USDTChainConfig {
  chainId: number;
  chainName: string;
  usdtContract: string;
  decimals: number;
  bridgeContracts?: string[];
  supportedDexes?: string[];
  minAmount: string;
  maxAmount: string;
}

export interface USDTQuoteRequest {
  fromChainId: number;
  toChainId: number;
  fromAddress: string;
  toAddress: string;
  amount: string;
  slippage: number;
  deadline?: number;
}

export interface USDTQuote {
  quoteId: string;
  fromChainId: number;
  toChainId: number;
  fromToken: Token;
  toToken: Token;
  amountIn: string;
  amountOut: string;
  minAmountOut: string;
  route: string[];
  priceImpact: number;
  fees: {
    bridge: string;
    dex: string;
    total: string;
  };
  gasEstimate: string;
  confidence: number;
  validUntil: string;
}

export interface USDTValidationResult {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface USDTBridge {
  name: string;
  supportedChains: number[];
  contractAddress: string;
  feeBps: number;
  minAmount: string;
  maxAmount: string;
  isActive: boolean;
}
