import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'event_listings';

export class FixNullableColumnsOnEventListingsTable1678275018852 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'banner_image_url', new TableColumn({
      name: 'banner_image_url',
      type: 'varchar',
      isNullable: true,
    }));

    await queryRunner.changeColumn(tableName, 'summary', new TableColumn({
      name: 'summary',
      type: 'varchar',
      isNullable: true,
    }));

    await queryRunner.changeColumn(tableName, 'venue_name', new TableColumn({
      name: 'venue_name',
      type: 'varchar',
      isNullable: true,
    }));

    await queryRunner.changeColumn(tableName, 'venue_address', new TableColumn({
      name: 'venue_address',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'banner_image_url', new TableColumn({
      name: 'banner_image_url',
      type: 'varchar',
      isNullable: false,
    }));

    await queryRunner.changeColumn(tableName, 'summary', new TableColumn({
      name: 'summary',
      type: 'varchar',
      isNullable: false,
    }));

    await queryRunner.changeColumn(tableName, 'venue_name', new TableColumn({
      name: 'venue_name',
      type: 'varchar',
      isNullable: false,
    }));

    await queryRunner.changeColumn(tableName, 'venue_address', new TableColumn({
      name: 'venue_address',
      type: 'varchar',
      isNullable: false,
    }));
  }
}
