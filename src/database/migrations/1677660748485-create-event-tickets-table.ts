import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_tickets';

export class CreateEventTicketsTable1677660748485 implements MigrationInterface {
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
          name: 'type',
          type: 'enum',
          enum: ['PAID', 'FREE'],
          enumName: 'ticket_type',
          default: "'PAID'",
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'display_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'price',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'available_quantity',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'sale_start_date',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
        },
        {
          name: 'sale_end_date',
          type: 'timestamp',
          isNullable: false,
          default: 'now()',
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
