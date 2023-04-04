import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_links';

export class CreateEventLinksTable1677659006054 implements MigrationInterface {
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
          name: 'event_listing_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'label',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'url',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
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
