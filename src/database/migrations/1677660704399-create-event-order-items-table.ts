import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_order_items';

export class CreateEventOrderItemsTable1677660704399 implements MigrationInterface {
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
          name: 'event_order_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'event_ticket_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'first_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'last_name',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'phone_number',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'quantity',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'total',
          type: 'decimal',
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
