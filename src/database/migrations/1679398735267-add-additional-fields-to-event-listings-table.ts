import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'event_listings';

export class AddAdditionalFieldsToEventListingsTable1679398735267 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(tableName, [
      new TableColumn({
        name: 'start_at',
        type: 'timestamp',
        isNullable: false,
      }),
      new TableColumn({
        name: 'ends_at',
        type: 'timestamp',
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(tableName, ['start_at', 'ends_at']);
  }
}
