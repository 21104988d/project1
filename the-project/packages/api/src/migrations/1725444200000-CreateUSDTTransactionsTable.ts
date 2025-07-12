import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateUSDTTransactionsTable1725444200000 implements MigrationInterface {
  name = 'CreateUSDTTransactionsTable1725444200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usdt_transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'transaction_hash',
            type: 'varchar',
            length: '66',
            isNullable: true,
          },
          {
            name: 'source_chain',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'target_chain',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'source_token',
            type: 'varchar',
            length: '42',
          },
          {
            name: 'target_token',
            type: 'varchar',
            length: '42',
          },
          {
            name: 'source_amount',
            type: 'decimal',
            precision: 36,
            scale: 18,
          },
          {
            name: 'target_amount',
            type: 'decimal',
            precision: 36,
            scale: 18,
          },
          {
            name: 'expected_amount',
            type: 'decimal',
            precision: 36,
            scale: 18,
          },
          {
            name: 'fee_amount',
            type: 'decimal',
            precision: 36,
            scale: 18,
          },
          {
            name: 'gas_fee',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'transaction_type',
            type: 'enum',
            enum: ['swap', 'bridge', 'arbitrage'],
            default: "'swap'",
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'processing', 'completed', 'failed', 'cancelled'],
            default: "'pending'",
          },
          {
            name: 'route_data',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'bridge_provider',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'dex_provider',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'slippage_tolerance',
            type: 'decimal',
            precision: 5,
            scale: 4,
            default: 0.005,
          },
          {
            name: 'deadline',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'sender_address',
            type: 'varchar',
            length: '42',
          },
          {
            name: 'receiver_address',
            type: 'varchar',
            length: '42',
          },
          {
            name: 'failure_reason',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'confirmation_count',
            type: 'integer',
            default: 0,
          },
          {
            name: 'execution_time',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'completed_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create indexes
    await queryRunner.createIndex(
      'usdt_transactions',
      new TableIndex({
        name: 'IDX_usdt_transactions_user_id_status',
        columnNames: ['user_id', 'status'],
      })
    );

    await queryRunner.createIndex(
      'usdt_transactions',
      new TableIndex({
        name: 'IDX_usdt_transactions_status_created_at',
        columnNames: ['status', 'created_at'],
      })
    );

    await queryRunner.createIndex(
      'usdt_transactions',
      new TableIndex({
        name: 'IDX_usdt_transactions_transaction_hash',
        columnNames: ['transaction_hash'],
      })
    );

    await queryRunner.createIndex(
      'usdt_transactions',
      new TableIndex({
        name: 'IDX_usdt_transactions_source_target_chain',
        columnNames: ['source_chain', 'target_chain'],
      })
    );

    // Create foreign key constraint
    await queryRunner.createForeignKey(
      'usdt_transactions',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usdt_transactions');
  }
}
