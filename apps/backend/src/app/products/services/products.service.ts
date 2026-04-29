import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ProductDepartment } from '../../../../../../libs/shared/products-contracts/src';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // repository to interact with the products table
  ) {}

  findAll(department?: ProductDepartment): Promise<Product[]> {
    return this.productsRepository.find({ // find all products, if there is a department, filter the products by the department
      where: department
        ? {
            department: {
              departmentName: department,
            },
          }
        : undefined,
      relations: { category: true, department: true }, // join the category and department tables
      order: { createdAt: 'DESC' },
    });
  }
}
