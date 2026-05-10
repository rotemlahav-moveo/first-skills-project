import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderItems1746883200000 implements MigrationInterface {
  name = 'CreateOrderItems1746883200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "order_items" (
        "order_item_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" integer NOT NULL,
        "unit_price" numeric NOT NULL,
        "product_name" character varying NOT NULL,
        "color" character varying NOT NULL,
        "size" character varying NOT NULL,
        "image_url" character varying NOT NULL,
        CONSTRAINT "PK_order_items" PRIMARY KEY ("order_item_id"),
        CONSTRAINT "FK_order_items_order" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_order_items_product" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_items"`);
  }
}
