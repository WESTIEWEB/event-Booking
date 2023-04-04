import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { timestampColumns } from '../common-columns';

const tableName = 'event_listings';

export class CreateEventListingsTable1677499139273 implements MigrationInterface {
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
          name: 'event_type_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'slug',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'summary',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'banner_image_url',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'venue_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'venue_address',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'is_online_event',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'guest_pays_transaction_fee',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'enum',
          enum: ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'],
          enumName: 'event_listing_status',
          default: "'DRAFT'",
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
