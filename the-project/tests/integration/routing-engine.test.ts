// tests/integration/routing-engine.test.ts
// Integration tests for routing engine

import { RouteOptimizer } from '../../packages/routing-engine/src/pathfinding/RouteOptimizer';
import { QuoteCalculator } from '../../packages/routing-engine/src/execution/QuoteCalculator';
import { PriceFeedManager } from '../../packages/routing-engine/src/aggregation/PriceFeedManager';
import { prisma, redis } from './setup';

describe('Routing Engine Integration Tests', () => {
  let routeOptimizer: RouteOptimizer;
  let quoteCalculator: QuoteCalculator;
  let priceFeedManager: PriceFeedManager;

  beforeEach(() => {
    routeOptimizer = new RouteOptimizer();
    quoteCalculator = new QuoteCalculator();
    priceFeedManager = new PriceFeedManager();
  });

  describe('Cross-Chain USDT to USDC Routing', () => {
    it('should find optimal route for USDT (Ethereum) to USDC (Arbitrum)', async () => {
      const routeRequest = {
        tokenIn: {
          symbol: 'USDT',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          chainId: 1,
        },
        tokenOut: {
          symbol: 'USDC',
          address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
          chainId: 42161,
        },
        amountIn: '1000000', // 1 USDT
      };

      const routes = await routeOptimizer.findOptimalRoutes(routeRequest);

      expect(routes).toHaveLength(expect.any(Number));
      expect(routes[0]).toMatchObject({
        steps: expect.any(Array),
        estimatedGas: expect.any(String),
        estimatedTime: expect.any(Number),
        priceImpact: expect.any(Number),
      });
    });

    it('should calculate accurate quote with price feeds', async () => {
      const quoteRequest = {
        tokenIn: 'USDT',
        tokenOut: 'USDC',
        amountIn: '1000000',
        chainIdIn: 1,
        chainIdOut: 42161,
      };

      // Mock price feeds
      await redis.setex('price:1:USDT', 60, '1.0001');
      await redis.setex('price:42161:USDC', 60, '0.9999');

      const quote = await quoteCalculator.calculateQuote(quoteRequest);

      expect(quote).toMatchObject({
        amountOut: expect.any(String),
        route: expect.any(Array),
        gasEstimate: expect.any(String),
        priceImpact: expect.any(Number),
      });

      // Amount out should be close to amount in for stablecoin swap
      const amountOut = parseInt(quote.amountOut);
      const amountIn = parseInt(quoteRequest.amountIn);
      const difference = Math.abs(amountOut - amountIn) / amountIn;
      expect(difference).toBeLessThan(0.01); // Less than 1% difference
    });
  });

  describe('Price Feed Management', () => {
    it('should aggregate prices from multiple sources', async () => {
      const tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const chainId = 1;

      await priceFeedManager.updatePrices();

      const price = await priceFeedManager.getPrice(tokenAddress, chainId);

      expect(price).toMatchObject({
        price: expect.any(String),
        timestamp: expect.any(Date),
        sources: expect.any(Array),
      });
    });

    it('should handle price feed failures gracefully', async () => {
      const invalidTokenAddress = '0x0000000000000000000000000000000000000000';
      const chainId = 1;

      const price = await priceFeedManager.getPrice(invalidTokenAddress, chainId);

      expect(price).toBeNull();
    });
  });

  describe('Liquidity Monitoring', () => {
    it('should detect low liquidity conditions', async () => {
      const largeAmount = '1000000000000'; // 1M USDT

      const quoteRequest = {
        tokenIn: 'USDT',
        tokenOut: 'USDC',
        amountIn: largeAmount,
        chainIdIn: 1,
        chainIdOut: 42161,
      };

      const quote = await quoteCalculator.calculateQuote(quoteRequest);

      // Large trades should have higher price impact
      expect(quote.priceImpact).toBeGreaterThan(0.001); // > 0.1%
    });
  });
});
