import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'wallet_transactions';

export class CreateWalletTransactionsTable1677706973550 implements MigrationInterface {
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
          name: 'transaction_type',
          type: 'enum',
          enum: ['DEBIT', 'CREDIT'],
          enumName: 'transaction_type',
          isNullable: false,
        },
        {
          name: 'amount',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'narration',
          type: 'varchar',
          isNullable: false,
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
