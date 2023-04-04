import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_types';

export class CreateEventTypesTable1677660766788 implements MigrationInterface {
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
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'slug',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'active',
          type: 'boolean',
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
