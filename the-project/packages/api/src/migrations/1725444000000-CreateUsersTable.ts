import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1725444000000 implements MigrationInterface {
  name = 'CreateUsersTable1725444000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'wallet_address',
            type: 'varchar',
            length: '42',
            isUnique: true,
          },
          {
            name: 'display_name',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['user', 'admin', 'vip'],
            default: "'user'",
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'suspended', 'pending_verification', 'verified'],
            default: "'pending_verification'",
          },
          {
            name: 'kyc_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'kyc_level',
            type: 'integer',
            default: 0,
          },
          {
            name: 'daily_volume_limit',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'monthly_volume_limit',
            type: 'decimal',
            precision: 36,
            scale: 18,
            isNullable: true,
          },
          {
            name: 'current_daily_volume',
            type: 'decimal',
            precision: 36,
            scale: 18,
            default: '0',
          },
          {
            name: 'current_monthly_volume',
            type: 'decimal',
            precision: 36,
            scale: 18,
            default: '0',
          },
          {
            name: 'last_login',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'referral_code',
            type: 'varchar',
            length: '20',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'referred_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fee_tier',
            type: 'decimal',
            precision: 5,
            scale: 4,
            default: 0.003,
          },
          {
            name: 'notification_preferences',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'api_key_hash',
            type: 'varchar',
            length: '64',
            isNullable: true,
          },
          {
            name: 'api_secret_hash',
            type: 'varchar',
            length: '64',
            isNullable: true,
          },
          {
            name: 'is_api_enabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'two_fa_enabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'two_fa_secret',
            type: 'varchar',
            length: '32',
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
            name: 'last_activity',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create indexes
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_users_email',
        columnNames: ['email'],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_users_wallet_address',
        columnNames: ['wallet_address'],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_users_status',
        columnNames: ['status'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
