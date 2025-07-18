import { z } from 'zod';

/**
 * Environment variable validation schema
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().url().optional(),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.string().regex(/^\d+$/).default('5432'),
  POSTGRES_DB: z.string().default('theproject_dev'),
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_PASSWORD: z.string().default('password'),

  // Redis
  REDIS_URL: z.string().url().optional(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().regex(/^\d+$/).default('6379'),

  // API
  API_PORT: z.string().regex(/^\d+$/).default('3001'),
  API_HOST: z.string().default('localhost'),

  // Security
  JWT_SECRET: z.string().min(32),
  API_KEY: z.string().min(16),

  // CORS
  CORS_ORIGIN: z.string().url().default('http://localhost:3000'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().regex(/^\d+$/).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().regex(/^\d+$/).default('100'),

  // Blockchain
  ETHEREUM_RPC_URL: z.string().url().optional(),
  ARBITRUM_RPC_URL: z.string().url().optional(),
  SOLANA_RPC_URL: z.string().url().optional(),

  // Private Keys (optional for development)
  PRIVATE_KEY: z
    .string()
    .regex(/^[a-fA-F0-9]{64}$/)
    .optional(),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  LOG_FORMAT: z.enum(['combined', 'common', 'dev', 'short', 'tiny']).default('combined'),
});

/**
 * Validated environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables
 * @returns Validated environment configuration
 * @throws Error if validation fails
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map(issue => `${issue.path.join('.')}: ${issue.message}`)
        .join('\n');

      throw new Error(`Environment validation failed:\n${issues}`);
    }
    throw error;
  }
}

/**
 * Get validated environment configuration
 */
export const env = validateEnv();

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Check if running in test
 */
export const isTest = env.NODE_ENV === 'test';
