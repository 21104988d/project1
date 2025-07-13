import { Request, Response, NextFunction } from 'express';
import { createClient, RedisClientType } from 'redis';

interface CacheOptions {
  ttl: number; // Time to live in seconds
  key?: string; // Custom cache key
  skipCache?: boolean;
}

let redisClient: RedisClientType;

// Initialize Redis client
async function initializeRedis() {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err: Error) => {
      console.error('Redis Cache Error:', err);
    });

    await redisClient.connect();
    console.log('✅ Cache middleware connected to Redis');
  } catch (error) {
    console.error('❌ Failed to connect to Redis for caching:', error);
  }
}

// Initialize on startup
initializeRedis();

export function cacheMiddleware(ttlSeconds: number, options: Partial<CacheOptions> = {}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip caching in development or if Redis is not available
    if (process.env.NODE_ENV === 'development' || !redisClient || options.skipCache) {
      return next();
    }

    try {
      // Generate cache key
      const cacheKey = options.key || generateCacheKey(req);

      // Try to get from cache
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        const parsed = JSON.parse(cachedData);

        // Add cache headers
        res.set({
          'X-Cache': 'HIT',
          'X-Cache-TTL': ttlSeconds.toString(),
          'Cache-Control': `public, max-age=${ttlSeconds}`,
        });

        return res.json(parsed);
      }

      // If not in cache, continue to route handler
      res.set({
        'X-Cache': 'MISS',
        'Cache-Control': `public, max-age=${ttlSeconds}`,
      });

      // Override res.json to cache the response
      const originalJson = res.json.bind(res);
      res.json = function (data: unknown) {
        // Cache successful responses only
        if (res.statusCode === 200) {
          redisClient
            .setEx(cacheKey, ttlSeconds, JSON.stringify(data))
            .catch(err => console.error('Cache write error:', err));
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      // Continue without caching on error
      next();
    }
  };
}

function generateCacheKey(req: Request): string {
  const { method, path, query, body } = req;

  // Create a unique key based on request details
  const keyData = {
    method,
    path,
    query,
    // Only include body for POST requests and limit size
    body: method === 'POST' ? JSON.stringify(body).substring(0, 500) : null,
  };

  const keyString = JSON.stringify(keyData);

  // Create a shorter hash-like key
  const key = Buffer.from(keyString).toString('base64').substring(0, 50);

  return `cache:${key}`;
}

// Cache invalidation for specific patterns
export async function invalidateCache(pattern: string): Promise<void> {
  if (!redisClient) return;

  try {
    const keys = await redisClient.keys(`cache:*${pattern}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`Cache invalidated: ${keys.length} keys matching "${pattern}"`);
    }
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

// Cache statistics
export async function getCacheStats(): Promise<{
  connected: boolean;
  memoryUsage?: string;
  keyCount?: number;
  hitRate?: number;
  memoryInfo?: string;
  timestamp?: string;
  error?: string;
}> {
  if (!redisClient) return { connected: false };

  try {
    const info = await redisClient.info('memory');
    const keyCount = await redisClient.dbSize();

    return {
      connected: true,
      keyCount,
      memoryInfo: info,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Cache stats error:', error);
    return { connected: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Cleanup function
export async function cleanupCache(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
  }
}
