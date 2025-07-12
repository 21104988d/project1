// tests/integration/api.test.ts
// Integration tests for API endpoints

import request from 'supertest';
import { app } from '../../packages/api/src/app';

describe('API Integration Tests', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body).toMatchObject({
        status: 'healthy',
        timestamp: expect.any(String),
      });
    });
  });

  describe('POST /api/v1/quote', () => {
    it('should return a quote for USDT to USDC swap', async () => {
      const quoteRequest = {
        tokenIn: 'USDT',
        tokenOut: 'USDC',
        amountIn: '1000000', // 1 USDT (6 decimals)
        chainIdIn: 1,
        chainIdOut: 42161,
      };

      const response = await request(app).post('/api/v1/quote').send(quoteRequest).expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          amountOut: expect.any(String),
          route: expect.any(Array),
          gasEstimate: expect.any(String),
          priceImpact: expect.any(Number),
          validUntil: expect.any(String),
        },
      });
    });

    it('should return error for invalid token pair', async () => {
      const quoteRequest = {
        tokenIn: 'INVALID',
        tokenOut: 'USDC',
        amountIn: '1000000',
        chainIdIn: 1,
        chainIdOut: 42161,
      };

      const response = await request(app).post('/api/v1/quote').send(quoteRequest).expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_TOKEN',
          message: expect.any(String),
        },
      });
    });
  });

  describe('GET /api/v1/tokens', () => {
    it('should return list of supported tokens', async () => {
      const response = await request(app).get('/api/v1/tokens').expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            symbol: 'USDT',
            address: expect.any(String),
            chainId: expect.any(Number),
            decimals: 6,
          }),
        ]),
      });
    });
  });

  describe('GET /api/v1/chains', () => {
    it('should return list of supported chains', async () => {
      const response = await request(app).get('/api/v1/chains').expect(200);

      expect(response.body).toMatchObject({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            chainId: 1,
            name: 'Ethereum',
            rpcUrl: expect.any(String),
          }),
        ]),
      });
    });
  });
});
