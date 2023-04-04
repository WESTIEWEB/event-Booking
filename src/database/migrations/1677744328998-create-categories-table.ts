import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'categories';

export class CreateCategoriesTable1677744328998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: tableName,
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true },
        { name: 'parent_category_id', type: 'uuid', isNullable: true },
        { name: 'name', type: 'varchar', isNullable: false },
        { name: 'slug', type: 'varchar', isNullable: false },
        { name: 'description', type: 'varchar', isNullable: true },
        { name: 'active', type: 'boolean', isNullable: true },
        ...timestampColumns,
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true);
  }
}
