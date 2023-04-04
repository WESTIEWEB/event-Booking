import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'wallets';

export class CreateWalletsTable1677706963796 implements MigrationInterface {
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
          name: 'available_balance',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'ledger_balance',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'currency',
          type: 'varchar',
          default: "'NGN'",
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
