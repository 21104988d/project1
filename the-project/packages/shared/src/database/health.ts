import { dbManager } from './connection';

export interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'unhealthy';
  latency?: number;
  error?: string;
  version?: string | undefined;
  uptime?: number;
}

export class DatabaseHealthCheck {
  async checkPostgreSQL(): Promise<HealthCheckResult> {
    try {
      const start = Date.now();

      // Test basic connection
      const result = await dbManager.query(
        'SELECT version(), current_timestamp, pg_postmaster_start_time();'
      );
      const latency = Date.now() - start;

      const row = result.rows[0];
      const version = row.version.split(' ')[1]; // Extract version number
      const startTime = new Date(row.pg_postmaster_start_time).getTime();
      const uptime = Math.floor((Date.now() - startTime) / 1000);

      return {
        service: 'PostgreSQL',
        status: 'healthy',
        latency,
        version,
        uptime,
      };
    } catch (error) {
      return {
        service: 'PostgreSQL',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async checkRedis(): Promise<HealthCheckResult> {
    try {
      const start = Date.now();

      // Test basic connection
      const redis = dbManager.getRedisClient();
      await redis.ping();
      const latency = Date.now() - start;

      // Get Redis info
      const info = await redis.info('server');
      const version = info.match(/redis_version:([^\r\n]+)/)?.[1];
      const uptime = parseInt(info.match(/uptime_in_seconds:(\d+)/)?.[1] || '0');

      return {
        service: 'Redis',
        status: 'healthy',
        latency,
        version,
        uptime,
      };
    } catch (error) {
      return {
        service: 'Redis',
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async checkAllDatabases(): Promise<HealthCheckResult[]> {
    const results = await Promise.allSettled([this.checkPostgreSQL(), this.checkRedis()]);

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        const services = ['PostgreSQL', 'Redis'];
        return {
          service: services[index],
          status: 'unhealthy' as const,
          error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
        };
      }
    });
  }

  async isHealthy(): Promise<boolean> {
    const results = await this.checkAllDatabases();
    return results.every(result => result.status === 'healthy');
  }
}

export const healthCheck = new DatabaseHealthCheck();
