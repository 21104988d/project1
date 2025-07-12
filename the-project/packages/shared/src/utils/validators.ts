/**
 * @fileoverview Validation utilities for the cross-chain DApp router
 * @module validators
 * @version 1.0.0
 * @author The Project Team
 * @since 1.0.0
 */

import { ethers } from 'ethers';

/**
 * Validate Ethereum address format
 * @param address - The address string to validate
 * @returns True if address is a valid Ethereum address format
 * @example
 * ```typescript
 * isValidEthereumAddress('0x742d35Cc6643C0532925a3b8D37A7a8f2A4A6b4F') // true
 * isValidEthereumAddress('invalid') // false
 * ```
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate Solana address format using base58 encoding
 * @param address - The Solana address string to validate
 * @returns True if address is a valid Solana address format
 * @example
 * ```typescript
 * isValidSolanaAddress('11111111111111111111111111111112') // true
 * isValidSolanaAddress('invalid-address') // false
 * ```
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    // Basic Solana address validation (base58 string of 32-44 characters)
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  } catch {
    return false;
  }
}

/**
 * Validate transaction hash format
 */
export function isValidTransactionHash(
  hash: string,
  chainType: 'ethereum' | 'solana' = 'ethereum'
): boolean {
  if (chainType === 'ethereum') {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
  } else {
    // Solana transaction signatures are base58 strings
    return /^[1-9A-HJ-NP-Za-km-z]{87,88}$/.test(hash);
  }
}

/**
 * Validate token amount
 */
export function isValidTokenAmount(amount: string | number | ethers.BigNumberish): boolean {
  try {
    const bn = ethers.getBigInt(amount);
    return bn >= 0n;
  } catch {
    return false;
  }
}

/**
 * Validate slippage tolerance (0-100%)
 */
export function isValidSlippageTolerance(slippage: number): boolean {
  return typeof slippage === 'number' && slippage >= 0 && slippage <= 100;
}

/**
 * Validate deadline (must be in the future)
 */
export function isValidDeadline(deadline: number): boolean {
  return typeof deadline === 'number' && deadline > Date.now();
}

/**
 * Validate gas price
 */
export function isValidGasPrice(gasPrice: string | number | ethers.BigNumberish): boolean {
  try {
    const bn = ethers.getBigInt(gasPrice);
    return bn > 0n;
  } catch {
    return false;
  }
}

/**
 * Validate gas limit
 */
export function isValidGasLimit(gasLimit: string | number): boolean {
  try {
    const num = typeof gasLimit === 'string' ? parseInt(gasLimit, 10) : gasLimit;
    return Number.isInteger(num) && num > 0 && num <= 30000000; // 30M gas limit max
  } catch {
    return false;
  }
}

/**
 * Validate price impact threshold
 */
export function isValidPriceImpact(impact: number): boolean {
  return typeof impact === 'number' && impact >= -1 && impact <= 1; // -100% to +100%
}

/**
 * Validate chain ID
 */
export function isValidChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Validate token symbol format
 */
export function isValidTokenSymbol(symbol: string): boolean {
  return /^[A-Z0-9]{2,10}$/.test(symbol);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate stablecoin pair for arbitrage
 */
export function isValidStablecoinPair(tokenA: string, tokenB: string): boolean {
  const approvedStablecoins = ['USDT', 'USDC'];
  return (
    approvedStablecoins.includes(tokenA.toUpperCase()) &&
    approvedStablecoins.includes(tokenB.toUpperCase()) &&
    tokenA.toUpperCase() !== tokenB.toUpperCase()
  );
}

/**
 * Validate route path
 */
export function isValidRoutePath(path: string[]): boolean {
  return (
    Array.isArray(path) &&
    path.length >= 2 &&
    path.every(step => typeof step === 'string' && step.length > 0)
  );
}

/**
 * Validate minimum amount out
 */
export function isValidMinAmountOut(
  amountOut: ethers.BigNumberish,
  minAmountOut: ethers.BigNumberish
): boolean {
  try {
    const amountOutBn = ethers.getBigInt(amountOut);
    const minAmountOutBn = ethers.getBigInt(minAmountOut);
    return minAmountOutBn <= amountOutBn && minAmountOutBn >= 0n;
  } catch {
    return false;
  }
}

/**
 * Validate fee percentage (0-100%)
 */
export function isValidFeePercentage(fee: number): boolean {
  return typeof fee === 'number' && fee >= 0 && fee <= 100;
}

/**
 * Validate timeout value (in milliseconds)
 */
export function isValidTimeout(timeout: number): boolean {
  return Number.isInteger(timeout) && timeout > 0 && timeout <= 300000; // max 5 minutes
}

/**
 * Comprehensive validation for quote request
 */
export interface QuoteRequestValidation {
  isValid: boolean;
  errors: string[];
}

export function validateQuoteRequest(request: {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  chainId: number;
  slippageTolerance?: number;
  deadline?: number;
}): QuoteRequestValidation {
  const errors: string[] = [];

  if (!isValidEthereumAddress(request.tokenIn) && !isValidSolanaAddress(request.tokenIn)) {
    errors.push('Invalid tokenIn address format');
  }

  if (!isValidEthereumAddress(request.tokenOut) && !isValidSolanaAddress(request.tokenOut)) {
    errors.push('Invalid tokenOut address format');
  }

  if (!isValidTokenAmount(request.amountIn)) {
    errors.push('Invalid amountIn');
  }

  if (!isValidChainId(request.chainId)) {
    errors.push('Invalid chainId');
  }

  if (
    request.slippageTolerance !== undefined &&
    !isValidSlippageTolerance(request.slippageTolerance)
  ) {
    errors.push('Invalid slippage tolerance');
  }

  if (request.deadline !== undefined && !isValidDeadline(request.deadline)) {
    errors.push('Invalid deadline');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
