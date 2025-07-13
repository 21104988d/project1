import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { USDTTransaction } from './USDTTransaction';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  VIP = 'vip',
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification',
  VERIFIED = 'verified',
}

@Entity('users')
@Index(['email'], { unique: true })
@Index(['walletAddress'], { unique: true })
@Index(['status'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ name: 'wallet_address', type: 'varchar', length: 42, unique: true })
  walletAddress!: string;

  @Column({ name: 'display_name', type: 'varchar', length: 100, nullable: true })
  displayName?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING_VERIFICATION,
  })
  status!: UserStatus;

  @Column({ name: 'kyc_verified', type: 'boolean', default: false })
  kycVerified!: boolean;

  @Column({ name: 'kyc_level', type: 'int', default: 0 })
  kycLevel!: number;

  @Column({ name: 'daily_volume_limit', type: 'decimal', precision: 36, scale: 18, nullable: true })
  dailyVolumeLimit?: string;

  @Column({
    name: 'monthly_volume_limit',
    type: 'decimal',
    precision: 36,
    scale: 18,
    nullable: true,
  })
  monthlyVolumeLimit?: string;

  @Column({ name: 'current_daily_volume', type: 'decimal', precision: 36, scale: 18, default: '0' })
  currentDailyVolume!: string;

  @Column({
    name: 'current_monthly_volume',
    type: 'decimal',
    precision: 36,
    scale: 18,
    default: '0',
  })
  currentMonthlyVolume!: string;

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @Column({ name: 'referral_code', type: 'varchar', length: 20, nullable: true, unique: true })
  referralCode?: string;

  @Column({ name: 'referred_by', type: 'uuid', nullable: true })
  referredBy?: string;

  @Column({ name: 'fee_tier', type: 'decimal', precision: 5, scale: 4, default: 0.003 })
  feeTier!: number;

  @Column({ name: 'notification_preferences', type: 'jsonb', nullable: true })
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    telegram: boolean;
    [key: string]: unknown;
  };

  @Column({ name: 'api_key_hash', type: 'varchar', length: 64, nullable: true })
  apiKeyHash?: string;

  @Column({ name: 'api_secret_hash', type: 'varchar', length: 64, nullable: true })
  apiSecretHash?: string;

  @Column({ name: 'is_api_enabled', type: 'boolean', default: false })
  isApiEnabled!: boolean;

  @Column({ name: 'two_fa_enabled', type: 'boolean', default: false })
  twoFaEnabled!: boolean;

  @Column({ name: 'two_fa_secret', type: 'varchar', length: 32, nullable: true })
  twoFaSecret?: string;

  @OneToMany(() => USDTTransaction, transaction => transaction.user)
  transactions!: USDTTransaction[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ name: 'last_activity', type: 'timestamp', nullable: true })
  lastActivity?: Date;
}
