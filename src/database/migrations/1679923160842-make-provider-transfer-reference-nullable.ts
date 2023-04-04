import {
  MigrationInterface, QueryRunner, TableColumn,
} from 'typeorm';

const tableName = 'user_bank_accounts';

export class MakeProviderTransferReferenceNullable1679923160842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'provider_transfer_reference', new TableColumn({
      name: 'provider_transfer_reference',
      type: 'varchar',
      isUnique: true,
      isNullable: true,
      comment: 'Generate by the payment provider to identify the bank account as a recipient of a transfer',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(tableName, 'provider_transfer_reference', new TableColumn({
      name: 'provider_transfer_reference',
      type: 'varchar',
      isUnique: true,
      isNullable: false,
    }));
  }
}
