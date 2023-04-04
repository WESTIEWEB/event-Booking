import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'users';

export class CreateUsersTable1676978946218 implements MigrationInterface {
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
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'first_name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'last_name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'phone_number',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'email_verified',
          type: 'boolean',
          isNullable: false,
          default: false,
        },
        {
          name: 'phone_number_verified',
          type: 'boolean',
          isNullable: false,
          default: false,
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
