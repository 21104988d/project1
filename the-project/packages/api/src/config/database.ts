import { DataSource } from 'typeorm';
import { USDTTransaction } from '../models/USDTTransaction';
import { USDTRate } from '../models/USDTRate';
import { User } from '../models/User';

let dataSource: DataSource;

export async function connectDatabase(): Promise<DataSource> {
  try {
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'theproject_dev',
      entities: [USDTTransaction, USDTRate, User],
      synchronize: process.env.NODE_ENV === 'development', // Auto-sync in development
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      migrations: ['src/migrations/*.ts'],
      migrationsTableName: 'migrations',
    });

    await dataSource.initialize();
    console.log('Database connected successfully');
    return dataSource;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export function getDataSource(): DataSource {
  if (!dataSource) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return dataSource;
}

export async function closeConnection(): Promise<void> {
  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy();
    console.log('Database connection closed');
  }
}
