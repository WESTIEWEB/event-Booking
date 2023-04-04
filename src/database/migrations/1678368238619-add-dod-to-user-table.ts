import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const tableName = 'users';
export class AddDobToUserTable1678368238619 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      tableName,
      new TableColumn({
        name: 'dob',
        type: 'varchar',
        isNullable: true,
      }),
    );

    queryRunner.addColumn(
      tableName,
      new TableColumn({
        name: 'salt',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn(tableName, 'dob');

    queryRunner.dropColumn(tableName, 'salt');
  }
}
