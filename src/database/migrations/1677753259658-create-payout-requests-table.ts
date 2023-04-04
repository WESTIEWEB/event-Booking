import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'payout_requests';

export class CreatePayoutRequestsTable1677753259658 implements MigrationInterface {
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
          name: 'wallet_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'user_bank_account_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'payment_transaction_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'amount',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
          enumName: 'payout_request_status',
          default: "'PENDING'",
        },
        ...timestampColumns,
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true);
  }
}
