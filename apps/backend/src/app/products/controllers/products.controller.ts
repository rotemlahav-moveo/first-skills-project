import { Controller, Get, Query } from '@nestjs/common';
import {
  type DepartmentDetailsDto,
  type ProductDto,
} from '../../../../../../libs/shared/products-contracts/src';
import { Department } from '../entities/department.entity';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('departments')
  async findAllDepartments(): Promise<DepartmentDetailsDto[]> {
    const departments = await this.productsService.findAllDepartments();
    return departments.map((department) => this.toDepartmentDto(department));
  }

  @Get()
  async findAll(@Query('department') rawDepartment?: string): Promise<ProductDto[]> {
    const products = await this.productsService.findAll(this.parseDepartment(rawDepartment));
    return products.map((product) => this.toProductDto(product));
  }

  private toProductDto(product: Product): ProductDto {
    return {
      ...product,
      // Postgres `numeric` is returned as string by node-postgres; coerce to number.
      price: Number(product.price),
      createdAt: product.createdAt.toISOString(),
    };
  }

  private toDepartmentDto(department: Department): DepartmentDetailsDto {
    return {
      departmentId: department.departmentId,
      departmentName: department.departmentName,
      slug: department.slug,
      imageUrl: department.imageUrl,
    };
  }

  // parse the department from the query parameter ( GET /products?department=men )
  private parseDepartment(value?: string): string | undefined {
    if (!value) {
      return undefined;
    }

    const normalized = value.trim().toLowerCase();
    return normalized.length > 0 ? normalized : undefined;
  }
}
