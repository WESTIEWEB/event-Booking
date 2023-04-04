import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_orders';

export class CreateEventOrdersTable1677660720678 implements MigrationInterface {
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
          name: 'payment_transaction_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'transaction_fee',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'order_sub_total',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'order_total',
          type: 'decimal',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['PENDING', 'PAID'],
          enumName: 'order_status',
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
