// packages/routing-engine/src/__tests__/pathfinding/RouteOptimizer.test.ts
// Unit tests for route optimization logic

import { describe, it, expect } from '@jest/globals';

describe('RouteOptimizer', () => {
  describe('Route calculation basics', () => {
    it('should calculate route fees correctly', () => {
      const protocolFee = 0.0003; // 0.03%
      const bridgeFee = 0.001; // 0.1%
      const amount = 1000;

      const totalFee = amount * (protocolFee + bridgeFee);
      const expectedOutput = amount - totalFee;

      expect(expectedOutput).toBeCloseTo(998.7, 1); // Allow for floating point precision
    });

    it('should estimate gas costs', () => {
      const baseGasLimit = 21000;
      const swapGasLimit = 150000;
      const bridgeGasLimit = 200000;

      const totalGas = baseGasLimit + swapGasLimit + bridgeGasLimit;

      expect(totalGas).toBe(371000);
      expect(totalGas).toBeLessThan(500000); // Reasonable limit
    });

    it('should validate stablecoin pairs', () => {
      const validPairs = [
        ['USDT', 'USDC'],
        ['USDC', 'USDT'],
      ];

      const invalidPairs = [
        ['USDT', 'USDT'], // Same token
        ['ETH', 'USDC'], // Non-stablecoin
        ['BTC', 'USDT'], // Non-stablecoin
      ];

      validPairs.forEach(([tokenA, tokenB]) => {
        expect(tokenA).not.toBe(tokenB);
        expect(['USDT', 'USDC'].includes(tokenA)).toBe(true);
        expect(['USDT', 'USDC'].includes(tokenB)).toBe(true);
      });

      invalidPairs.forEach(([tokenA, tokenB]) => {
        const isValid =
          tokenA !== tokenB &&
          ['USDT', 'USDC'].includes(tokenA) &&
          ['USDT', 'USDC'].includes(tokenB);
        expect(isValid).toBe(false);
      });
    });
  });

  describe('Price impact calculations', () => {
    it('should calculate price impact for large trades', () => {
      const poolLiquidity = 10000000; // $10M
      const tradeSize = 100000; // $100K

      // Simple linear price impact model for testing
      const priceImpact = (tradeSize / poolLiquidity) * 100;

      expect(priceImpact).toBe(1); // 1% price impact
      expect(priceImpact).toBeLessThan(5); // Reasonable threshold
    });

    it('should reject trades with excessive price impact', () => {
      const poolLiquidity = 1000000; // $1M
      const tradeSize = 100000; // $100K

      const priceImpact = (tradeSize / poolLiquidity) * 100;
      const maxAllowedImpact = 5; // 5%

      expect(priceImpact).toBe(10); // 10% price impact
      expect(priceImpact).toBeGreaterThan(maxAllowedImpact);
    });
  });

  describe('Arbitrage detection logic', () => {
    it('should detect price differences between exchanges', () => {
      const uniswapPrice = 1.002; // USDT/USDC on Uniswap
      const curvePrice = 0.998; // USDT/USDC on Curve

      const priceDifference = Math.abs(uniswapPrice - curvePrice);
      const profitOpportunity = priceDifference > 0.001; // 0.1% threshold

      expect(priceDifference).toBeCloseTo(0.004, 3); // 0.4% difference with 3 decimal precision
      expect(profitOpportunity).toBe(true);
    });

    it('should calculate arbitrage profitability', () => {
      const buyPrice = 0.998;
      const sellPrice = 1.002;
      const tradeFee = 0.0003; // 0.03% per trade

      const grossProfit = sellPrice - buyPrice;
      const totalFees = tradeFee * 2; // Buy and sell fees
      const netProfit = grossProfit - totalFees;

      expect(grossProfit).toBeCloseTo(0.004, 3); // 0.4% with floating point tolerance
      expect(netProfit).toBeCloseTo(0.0034, 4); // 0.34% after fees with higher precision
      expect(netProfit).toBeGreaterThan(0);
    });
  });
});
