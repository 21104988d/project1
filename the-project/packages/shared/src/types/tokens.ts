// Token-related type definitions for The Project
// Focus: USDT and USDC core stablecoin types

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  chainId: number;
  address: string;
  logoURI?: string;
  isNative?: boolean;
  isStablecoin: boolean;
}

export interface StablecoinToken extends Token {
  isStablecoin: true;
  pegCurrency: 'USD' | 'EUR' | 'OTHER';
  pegMechanism: 'FIAT_BACKED' | 'CRYPTO_BACKED' | 'ALGORITHMIC' | 'HYBRID';
  reserveAudit?: {
    lastAuditDate: string;
    auditor: string;
    reserveRatio: number; // 1.0 = 100% backed
  };
}

// USDT-specific type for Phase 1 focus
export interface USDTToken extends StablecoinToken {
  symbol: 'USDT';
  pegCurrency: 'USD';
  pegMechanism: 'FIAT_BACKED';
}

// USDC-specific type for Phase 1 focus
export interface USDCToken extends StablecoinToken {
  symbol: 'USDC';
  pegCurrency: 'USD';
  pegMechanism: 'FIAT_BACKED';
}

export interface TokenBalance {
  token: Token;
  balance: string; // BigNumber string representation
  balanceFormatted: string; // Human-readable format
  balanceUSD?: string; // USD value if available
}

export interface TokenPrice {
  token: Token;
  priceUSD: string;
  priceChange24h?: number; // Percentage change
  volume24h?: string;
  marketCap?: string;
  lastUpdated: string; // ISO timestamp
}

export interface TokenList {
  name: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens: Token[];
  keywords?: string[];
  logoURI?: string;
  timestamp: string;
}

// Supported token symbols for Phase 1
export type SupportedStablecoin = 'USDT' | 'USDC';

// Extended support for future phases
export type AllSupportedTokens = SupportedStablecoin | 'DAI' | 'FRAX' | 'TUSD' | 'BUSD';

export interface TokenPair {
  tokenIn: Token;
  tokenOut: Token;
  fee?: string; // Pool fee if applicable
  liquidity?: string; // Available liquidity
}

export interface TokenAllowance {
  owner: string;
  spender: string;
  token: Token;
  allowance: string; // BigNumber string
  isUnlimited: boolean;
}
