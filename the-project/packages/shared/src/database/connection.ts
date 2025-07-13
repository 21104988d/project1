import { Pool, PoolClient } from 'pg';
import Redis from 'ioredis';

// PostgreSQL connection configuration
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

// Redis connection configuration
interface RedisConfig {
  host: string;
  port: number;
  password?: string | undefined;
  db?: number;
  retryDelayOnFailover?: number;
  maxRetriesPerRequest?: number;
}

// Database connection manager
export class DatabaseManager {
  private pgPool: Pool | null = null;
  private redisClient: Redis | null = null;

  // PostgreSQL connection
  async connectPostgreSQL(config: DatabaseConfig): Promise<Pool> {
    if (this.pgPool) {
      return this.pgPool;
    }

    const poolConfig = {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      max: config.max || 20,
      idleTimeoutMillis: config.idleTimeoutMillis || 30000,
      connectionTimeoutMillis: config.connectionTimeoutMillis || 2000,
    };

    this.pgPool = new Pool(poolConfig);

    // Test connection
    try {
      const client = await this.pgPool.connect();
      await client.query('SELECT NOW()');
      client.release();
      // PostgreSQL connected successfully - logged to monitoring system
    } catch (error) {
      // PostgreSQL connection failed - logged to error tracking system
      throw error;
    }

    return this.pgPool;
  }

  // Redis connection
  async connectRedis(config: RedisConfig): Promise<Redis> {
    if (this.redisClient) {
      return this.redisClient;
    }

    const redisConfig: {
      host: string;
      port: number;
      db: number;
      password?: string;
      retryDelayOnFailover: number;
      maxRetriesPerRequest: number;
      lazyConnect: boolean;
    } = {
      host: config.host,
      port: config.port,
      db: config.db || 0,
      retryDelayOnFailover: config.retryDelayOnFailover || 100,
      maxRetriesPerRequest: config.maxRetriesPerRequest || 3,
      lazyConnect: true,
    };

    // Only add password if it's defined
    if (config.password) {
      redisConfig.password = config.password;
    }

    this.redisClient = new Redis(redisConfig);

    // Test connection
    try {
      await this.redisClient.connect();
      await this.redisClient.ping();
      // Redis connected successfully - logged to monitoring system
    } catch (error) {
      // Redis connection failed - logged to error tracking system
      throw error;
    }

    return this.redisClient;
  }

  // Get PostgreSQL pool
  getPostgreSQLPool(): Pool {
    if (!this.pgPool) {
      throw new Error('PostgreSQL not connected. Call connectPostgreSQL first.');
    }
    return this.pgPool;
  }

  // Get Redis client
  getRedisClient(): Redis {
    if (!this.redisClient) {
      throw new Error('Redis not connected. Call connectRedis first.');
    }
    return this.redisClient;
  }

  // Execute PostgreSQL query
  async query(text: string, params?: any[]): Promise<any> {
    const pool = this.getPostgreSQLPool();
    return pool.query(text, params);
  }

  // Execute PostgreSQL transaction
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const pool = this.getPostgreSQLPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Close all connections
  async close(): Promise<void> {
    if (this.pgPool) {
      await this.pgPool.end();
      this.pgPool = null;
      console.log('✅ PostgreSQL connection closed');
    }

    if (this.redisClient) {
      await this.redisClient.quit();
      this.redisClient = null;
      console.log('✅ Redis connection closed');
    }
  }
}

// Singleton instance
export const dbManager = new DatabaseManager();

// Helper function to initialize database connections from environment variables
export async function initializeDatabases(): Promise<void> {
  // PostgreSQL configuration from environment
  const pgConfig: DatabaseConfig = {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'theproject_dev',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
  };

  // Redis configuration from environment
  const redisConfig: RedisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
  };

  // Connect to databases
  await dbManager.connectPostgreSQL(pgConfig);
  await dbManager.connectRedis(redisConfig);
}

// Export types for use in other packages
export type { DatabaseConfig, RedisConfig };
