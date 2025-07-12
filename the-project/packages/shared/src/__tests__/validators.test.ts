// packages/shared/src/__tests__/validators.test.ts
// Unit tests for validation functions

import { describe, it, expect } from '@jest/globals';
import {
  isValidEthereumAddress,
  isValidSolanaAddress,
  isValidTokenAmount,
  isValidChainId,
  isValidTokenSymbol,
  isValidSlippageTolerance,
  isValidStablecoinPair,
} from '../utils/validators';

describe('validators', () => {
  describe('isValidEthereumAddress', () => {
    it('should validate Ethereum addresses', () => {
      expect(isValidEthereumAddress('0x742d35Cc6634C0532925a3b8D8FD0E4c7b2c3A4e')).toBe(true);
      expect(isValidEthereumAddress('0x742d35Cc6634C0532925a3b8D8FD0E4')).toBe(false);
      expect(isValidEthereumAddress('invalid')).toBe(false);
    });
  });

  describe('isValidSolanaAddress', () => {
    it('should validate Solana addresses', () => {
      expect(isValidSolanaAddress('DhzK9o8fcfZ6K3eaZj5QQ8KZgCGHK8XJT9J9KdJH8E8E')).toBe(true);
      expect(isValidSolanaAddress('invalid')).toBe(false);
      expect(isValidSolanaAddress('')).toBe(false);
    });
  });

  describe('isValidTokenAmount', () => {
    it('should validate positive amounts', () => {
      expect(isValidTokenAmount('1000000000000000000')).toBe(true); // 1 ETH in wei
      expect(isValidTokenAmount(1000000)).toBe(true); // 1 USDT
      expect(isValidTokenAmount('0')).toBe(true); // Zero is valid
    });

    it('should reject invalid amounts', () => {
      expect(isValidTokenAmount('-1')).toBe(false);
      expect(isValidTokenAmount('abc')).toBe(false);
      expect(isValidTokenAmount('')).toBe(false);
    });
  });

  describe('isValidChainId', () => {
    it('should validate positive chain IDs', () => {
      expect(isValidChainId(1)).toBe(true); // Ethereum
      expect(isValidChainId(42161)).toBe(true); // Arbitrum
      expect(isValidChainId(137)).toBe(true); // Polygon
    });

    it('should reject invalid chain IDs', () => {
      expect(isValidChainId(0)).toBe(false);
      expect(isValidChainId(-1)).toBe(false);
      expect(isValidChainId(1.5)).toBe(false); // Non-integer
    });
  });

  describe('isValidTokenSymbol', () => {
    it('should validate token symbols', () => {
      expect(isValidTokenSymbol('USDT')).toBe(true);
      expect(isValidTokenSymbol('USDC')).toBe(true);
      expect(isValidTokenSymbol('ETH')).toBe(true);
    });

    it('should reject invalid symbols', () => {
      expect(isValidTokenSymbol('usdt')).toBe(false); // lowercase
      expect(isValidTokenSymbol('')).toBe(false);
      expect(isValidTokenSymbol('VERYLONGTOKENSYMBOL')).toBe(false);
      expect(isValidTokenSymbol('A')).toBe(false); // too short
    });
  });

  describe('isValidSlippageTolerance', () => {
    it('should validate reasonable slippage values', () => {
      expect(isValidSlippageTolerance(0.5)).toBe(true); // 0.5%
      expect(isValidSlippageTolerance(1.0)).toBe(true); // 1%
      expect(isValidSlippageTolerance(5.0)).toBe(true); // 5%
      expect(isValidSlippageTolerance(0)).toBe(true); // 0% is valid
    });

    it('should reject extreme slippage values', () => {
      expect(isValidSlippageTolerance(101)).toBe(false); // > 100%
      expect(isValidSlippageTolerance(-1)).toBe(false); // negative
    });
  });

  describe('isValidStablecoinPair', () => {
    it('should validate stablecoin pairs', () => {
      expect(isValidStablecoinPair('USDT', 'USDC')).toBe(true);
      expect(isValidStablecoinPair('USDC', 'USDT')).toBe(true);
    });

    it('should reject invalid pairs', () => {
      expect(isValidStablecoinPair('USDT', 'USDT')).toBe(false); // same token
      expect(isValidStablecoinPair('ETH', 'USDC')).toBe(false); // non-stablecoin
    });
  });
});
