import { Controller, Get, Query } from '@nestjs/common';
import {
  ProductDepartment,
  type ProductDepartment as ProductDepartmentValue,
  type ProductDto,
} from '../../../../../../libs/shared/products-contracts/src';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('department') rawDepartment?: string): Promise<ProductDto[]> {
    const products = await this.productsService.findAll(this.parseDepartment(rawDepartment));
    return products.map((product) => this.toProductDto(product));
  }

  private toProductDto(product: Product): ProductDto {
    return {
      productId: product.productId,
      productName: product.productName,
      description: product.description,
      // Postgres `numeric` is returned as string by node-postgres; coerce to number.
      price: Number(product.price),
      sizes: product.sizes ?? [],
      color: product.color,
      brand: product.brand,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt.toISOString(),
      category: {
        categoryId: product.category.categoryId,
        categoryName: product.category.categoryName,
      },
      department: product.department
        ? {
            departmentId: product.department.departmentId,
            departmentName: product.department.departmentName as ProductDepartmentValue,
          }
        : null,
    };
  }

  // parse the department from the query parameter ( GET /products?department=men )
  private parseDepartment(value?: string): ProductDepartmentValue | undefined {
    if (!value) {
      return undefined;
    }

    const normalized = value.trim().toLowerCase();
    return (Object.values(ProductDepartment) as string[]).includes(normalized)
      ? (normalized as ProductDepartmentValue)
      : undefined;
  }
}
