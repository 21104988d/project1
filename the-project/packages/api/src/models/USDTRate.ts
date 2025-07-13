import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum RateSource {
  BINANCE = 'binance',
  COINBASE = 'coinbase',
  KRAKEN = 'kraken',
  UNISWAP_V3 = 'uniswap_v3',
  CURVE = 'curve',
  BALANCER = 'balancer',
  PANCAKESWAP = 'pancakeswap',
  SUSHISWAP = 'sushiswap',
  AGGREGATED = 'aggregated',
}

@Entity('usdt_rates')
@Index(['pair', 'chain', 'source'])
@Index(['chain', 'timestamp'])
@Index(['timestamp'])
@Index(['pair', 'timestamp'])
export class USDTRate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 20 })
  pair!: string; // e.g., 'USDT/USDC', 'USDT/DAI'

  @Column({ type: 'varchar', length: 50 })
  chain!: string; // e.g., 'ethereum', 'polygon', 'bsc'

  @Column({
    type: 'enum',
    enum: RateSource,
  })
  source!: RateSource;

  @Column({ type: 'decimal', precision: 36, scale: 18 })
  rate!: string; // Exchange rate

  @Column({ name: 'bid_rate', type: 'decimal', precision: 36, scale: 18, nullable: true })
  bidRate?: string;

  @Column({ name: 'ask_rate', type: 'decimal', precision: 36, scale: 18, nullable: true })
  askRate?: string;

  @Column({ type: 'decimal', precision: 36, scale: 18, nullable: true })
  volume!: string; // 24h volume

  @Column({ type: 'decimal', precision: 36, scale: 18, nullable: true })
  liquidity?: string; // Available liquidity

  @Column({ name: 'price_impact', type: 'decimal', precision: 8, scale: 6, nullable: true })
  priceImpact?: number; // Price impact for standard trade size

  @Column({ name: 'gas_cost', type: 'decimal', precision: 36, scale: 18, nullable: true })
  gasCost?: string; // Estimated gas cost in native token

  @Column({ name: 'gas_cost_usd', type: 'decimal', precision: 18, scale: 8, nullable: true })
  gasCostUsd?: string; // Estimated gas cost in USD

  @Column({ name: 'pool_address', type: 'varchar', length: 42, nullable: true })
  poolAddress?: string; // DEX pool address

  @Column({ name: 'token0_address', type: 'varchar', length: 42, nullable: true })
  token0Address?: string;

  @Column({ name: 'token1_address', type: 'varchar', length: 42, nullable: true })
  token1Address?: string;

  @Column({ name: 'pool_fee', type: 'decimal', precision: 8, scale: 6, nullable: true })
  poolFee?: number; // Pool fee percentage

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'confidence_score', type: 'decimal', precision: 5, scale: 4, nullable: true })
  confidenceScore?: number; // Data confidence (0-1)

  @Column({ name: 'update_frequency', type: 'int', nullable: true })
  updateFrequency?: number; // Update frequency in seconds

  @Column({ name: 'last_update_block', type: 'bigint', nullable: true })
  lastUpdateBlock?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // Additional metadata for DEX-specific information
  @Column({ type: 'jsonb', nullable: true })
  metadata?: {
    tick?: number; // For Uniswap V3
    sqrtPriceX96?: string; // For Uniswap V3
    reserve0?: string; // For Uniswap V2 style pools
    reserve1?: string; // For Uniswap V2 style pools
    totalSupply?: string; // For LP tokens
    apr?: number; // Annual percentage rate
    rewards?: string[]; // Reward token addresses
    [key: string]: unknown;
  };
}
