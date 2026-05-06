import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import {
  type DepartmentDetailsDto,
  type ProductDto,
} from '../../../../../../libs/shared/products-contracts/src';
import { parseProductListQuery } from '../dto/parse-product-list-query';
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
  async findAll(@Query() raw: Record<string, unknown>): Promise<ProductDto[]> {
    const filters = parseProductListQuery(raw); 
    const products = await this.productsService.findAll(filters); 
    return products.map((product) => this.toProductDto(product));
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: string): Promise<ProductDto> {
    const product = await this.productsService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.toProductDto(product);
  }

  private toProductDto(product: Product): ProductDto {
    return {
      ...product,
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
}
