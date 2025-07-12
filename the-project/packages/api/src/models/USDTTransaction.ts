import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum TransactionType {
  SWAP = 'swap',
  BRIDGE = 'bridge',
  ARBITRAGE = 'arbitrage',
}

@Entity('usdt_transactions')
@Index(['userId', 'status'])
@Index(['status', 'createdAt'])
@Index(['transactionHash'])
@Index(['sourceChain', 'targetChain'])
export class USDTTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, user => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'transaction_hash', type: 'varchar', length: 66, nullable: true })
  transactionHash?: string;

  @Column({ name: 'source_chain', type: 'varchar', length: 50 })
  sourceChain: string;

  @Column({ name: 'target_chain', type: 'varchar', length: 50 })
  targetChain: string;

  @Column({ name: 'source_token', type: 'varchar', length: 42 })
  sourceToken: string;

  @Column({ name: 'target_token', type: 'varchar', length: 42 })
  targetToken: string;

  @Column({ name: 'source_amount', type: 'decimal', precision: 36, scale: 18 })
  sourceAmount: string;

  @Column({ name: 'target_amount', type: 'decimal', precision: 36, scale: 18 })
  targetAmount: string;

  @Column({ name: 'expected_amount', type: 'decimal', precision: 36, scale: 18 })
  expectedAmount: string;

  @Column({ name: 'fee_amount', type: 'decimal', precision: 36, scale: 18 })
  feeAmount: string;

  @Column({ name: 'gas_fee', type: 'decimal', precision: 36, scale: 18, nullable: true })
  gasFee?: string;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SWAP,
  })
  transactionType: TransactionType;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ name: 'route_data', type: 'jsonb', nullable: true })
  routeData?: any;

  @Column({ name: 'bridge_provider', type: 'varchar', length: 100, nullable: true })
  bridgeProvider?: string;

  @Column({ name: 'dex_provider', type: 'varchar', length: 100, nullable: true })
  dexProvider?: string;

  @Column({ name: 'slippage_tolerance', type: 'decimal', precision: 5, scale: 4, default: 0.005 })
  slippageTolerance: number;

  @Column({ name: 'deadline', type: 'timestamp', nullable: true })
  deadline?: Date;

  @Column({ name: 'sender_address', type: 'varchar', length: 42 })
  senderAddress: string;

  @Column({ name: 'receiver_address', type: 'varchar', length: 42 })
  receiverAddress: string;

  @Column({ name: 'failure_reason', type: 'text', nullable: true })
  failureReason?: string;

  @Column({ name: 'confirmation_count', type: 'int', default: 0 })
  confirmationCount: number;

  @Column({ name: 'execution_time', type: 'int', nullable: true })
  executionTime?: number; // in milliseconds

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;
}
