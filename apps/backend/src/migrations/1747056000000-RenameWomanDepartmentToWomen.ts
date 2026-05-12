import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameWomanDepartmentToWomen1747056000000 implements MigrationInterface {
  name = 'RenameWomanDepartmentToWomen1747056000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "departments"
      SET "slug" = 'women'
      WHERE "slug" = 'woman'
    `);
    await queryRunner.query(`
      UPDATE "departments"
      SET "department_name" = 'Women'
      WHERE "department_name" = 'Woman'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "departments"
      SET "slug" = 'woman'
      WHERE "slug" = 'women'
    `);
    await queryRunner.query(`
      UPDATE "departments"
      SET "department_name" = 'Woman'
      WHERE "department_name" = 'Women'
    `);
  }
}
