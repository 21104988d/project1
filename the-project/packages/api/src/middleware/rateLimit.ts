import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Enhanced rate limiter with different tiers
export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: Request) => {
    // Different limits based on endpoint and user type
    if (req.path.includes('/usdt/quote')) {
      return 100; // 100 quotes per 15 minutes
    }
    if (req.path.includes('/usdt/rates')) {
      return 200; // 200 rate checks per 15 minutes
    }
    if (req.path.includes('/execute')) {
      return 10; // 10 swaps per 15 minutes
    }
    return 60; // Default: 60 requests per 15 minutes
  },
  message: (req: Request, res: Response) => ({
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.',
    retryAfter: Math.ceil((res.getHeader('Retry-After') as number) || 900), // 15 minutes
    endpoint: req.path,
    timestamp: new Date().toISOString(),
  }),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req: Request) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
  keyGenerator: (req: Request): string => {
    // Use API key or IP address for rate limiting
    const apiKey = req.headers['x-api-key'] as string;
    return apiKey || req.ip || 'unknown';
  },
  handler: (req: Request, res: Response) => {
    console.warn(`Rate limit exceeded for ${req.ip} on ${req.path}`);
    res.status(429).json({
      error: 'Rate Limit Exceeded',
      message: 'Too many requests, please try again later.',
      timestamp: new Date().toISOString(),
    });
  },
});

// Stricter rate limiting for expensive operations
export const strictRateLimitMiddleware = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: {
    error: 'Rate Limit Exceeded',
    message: 'This operation is limited to 5 requests per hour.',
    timestamp: new Date().toISOString(),
  },
});

// Burst protection for authentication attempts
export const authRateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: {
    error: 'Too Many Authentication Attempts',
    message: 'Too many failed authentication attempts. Please try again later.',
    timestamp: new Date().toISOString(),
  },
});
