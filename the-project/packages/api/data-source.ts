import { DataSource } from 'typeorm';
import { USDTTransaction } from './src/models/USDTTransaction';
import { USDTRate } from './src/models/USDTRate';
import { User } from './src/models/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'theproject_dev',
  entities: [USDTTransaction, USDTRate, User],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false, // Don't auto-sync in production
  logging: process.env.NODE_ENV === 'development',
});
