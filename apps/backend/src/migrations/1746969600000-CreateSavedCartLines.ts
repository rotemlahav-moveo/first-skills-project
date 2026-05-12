import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSavedCartLines1746969600000 implements MigrationInterface {
  name = 'CreateSavedCartLines1746969600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "saved_cart_lines" (
        "cart_line_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" integer NOT NULL,
        "size" character varying NOT NULL,
        "color" character varying NOT NULL,
        CONSTRAINT "PK_saved_cart_lines" PRIMARY KEY ("cart_line_id"),
        CONSTRAINT "UQ_saved_cart_user_product" UNIQUE ("user_id", "product_id"),
        CONSTRAINT "FK_saved_cart_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_saved_cart_product" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "saved_cart_lines"`);
  }
}
