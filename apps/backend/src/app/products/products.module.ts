import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { Category } from './entities/category.entity';
import { Department } from './entities/department.entity';
import { Product } from './entities/product.entity';
import { ProductsListQueryBuilderService } from './services/products-list-query-builder.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Department, Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsListQueryBuilderService],
})
export class ProductsModule {}
