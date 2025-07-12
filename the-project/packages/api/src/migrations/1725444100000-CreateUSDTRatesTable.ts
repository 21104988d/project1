import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUSDTRatesTable1725444100000 implements MigrationInterface {
  name = 'CreateUSDTRatesTable1725444100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usdt_rates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pair',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'chain',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'source',
            type: 'enum',
            enum: [
              'binance',
              'coinbase',
              'kraken',
              'uniswap_v3',
              'curve',
              'balancer',
              'pancakeswap',
              'sushiswap',
              'aggregated',
            ],
          },
          {
            name: 'rate',
            type: 'decimal',
            precision: 36,
            scale: 18,
          },
          {
            name: 'bid_rate',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'ask_rate',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'volume',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'liquidity',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'price_impact',
            type: 'decimal',
            precision: 8,
            scale: 6,
            isNullable: true,
          },
          {
            name: 'gas_cost',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'gas_cost_usd',
            type: 'decimal',
            precision: 18,
            scale: 8,
            isNullable: true,
          },
          {
            name: 'pool_address',
            type: 'varchar',
            length: '42',
            isNullable: true,
          },
          {
            name: 'token0_address',
            type: 'varchar',
            length: '42',
            isNullable: true,
          },
          {
            name: 'token1_address',
            type: 'varchar',
            length: '42',
            isNullable: true,
          },
          {
            name: 'pool_fee',
            type: 'decimal',
            precision: 8,
            scale: 6,
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'confidence_score',
            type: 'decimal',
            precision: 5,
            scale: 4,
            isNullable: true,
          },
          {
            name: 'update_frequency',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'last_update_block',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
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
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create indexes
    await queryRunner.createIndex(
      'usdt_rates',
      new TableIndex({
        name: 'IDX_usdt_rates_pair_chain_source',
        columnNames: ['pair', 'chain', 'source'],
      })
    );

    await queryRunner.createIndex(
      'usdt_rates',
      new TableIndex({
        name: 'IDX_usdt_rates_chain_timestamp',
        columnNames: ['chain', 'timestamp'],
      })
    );

    await queryRunner.createIndex(
      'usdt_rates',
      new TableIndex({
        name: 'IDX_usdt_rates_timestamp',
        columnNames: ['timestamp'],
      })
    );

    await queryRunner.createIndex(
      'usdt_rates',
      new TableIndex({
        name: 'IDX_usdt_rates_pair_timestamp',
        columnNames: ['pair', 'timestamp'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usdt_rates');
  }
}
