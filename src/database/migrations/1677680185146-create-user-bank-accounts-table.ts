import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'user_bank_accounts';

export class CreateUserBankAccountsTable1677680185146 implements MigrationInterface {
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
          name: 'user_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'bank_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'account_number',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'account_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'bank_code',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'provider_transfer_reference',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
          comment: 'Generate by the payment provider to identify the bank account as a recipient of a transfer',
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
