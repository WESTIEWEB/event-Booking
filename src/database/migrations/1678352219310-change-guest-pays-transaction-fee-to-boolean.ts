import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'event_listings';

export class ChangeGuestPaysTransactionFeeToBoolean1678352219310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'guest_pays_transaction_fee', new TableColumn({
      name: 'guest_pays_transaction_fee',
      type: 'boolean',
      isNullable: false,
      default: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'guest_pays_transaction_fee', new TableColumn({
      name: 'guest_pays_transaction_fee',
      type: 'varchar',
      isNullable: false,
      default: 'false',
    }));
  }
}
