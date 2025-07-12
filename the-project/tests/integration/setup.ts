// tests/integration/setup.ts
// Setup file for integration tests

import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Global test setup
beforeAll(async () => {
  // Clean up database before tests
  await prisma.$executeRaw`TRUNCATE TABLE transactions, quotes, tokens RESTART IDENTITY CASCADE`;

  // Clear Redis cache
  await redis.flushall();

  // Seed test data
  await prisma.token.createMany({
    data: [
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Ethereum USDT
        chainId: 1,
        decimals: 6,
        name: 'Tether USD',
      },
      {
        symbol: 'USDC',
        address: '0xA0b86a33E6448193c3Cf4FB58E3E2e80e96C5B8B', // Ethereum USDC
        chainId: 1,
        decimals: 6,
        name: 'USD Coin',
      },
      {
        symbol: 'USDT',
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // Arbitrum USDT
        chainId: 42161,
        decimals: 6,
        name: 'Tether USD',
      },
      {
        symbol: 'USDC',
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // Arbitrum USDC
        chainId: 42161,
        decimals: 6,
        name: 'USD Coin',
      },
    ],
    skipDuplicates: true,
  });
});

// Global test teardown
afterAll(async () => {
  await prisma.$disconnect();
  await redis.disconnect();
});

// Reset database state between tests
afterEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE transactions, quotes RESTART IDENTITY CASCADE`;
  await redis.flushall();
});

export { prisma, redis };
