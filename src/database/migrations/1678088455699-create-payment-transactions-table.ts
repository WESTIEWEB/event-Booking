import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'payment_transactions';

export class CreatePaymentTransactionsTable1678088455699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: tableName,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'transaction_type',
          type: 'enum',
          enum: ['INCOMING', 'OUTGOUNG'],
          enumName: 'payment_transaction_type',
        },
        {
          name: 'reference',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'provider_reference',
          type: 'varchar',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'provider_message',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'amount',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'currency',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['PENDING', 'FAILED', 'VERIFIED', 'REFUNDED'],
          enumName: 'payment_transaction_status',
        },
        {
          name: 'verified_at',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'refunded_at',
          type: 'timestamp',
          isNullable: true,
        },
        ...timestampColumns,
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }
}
