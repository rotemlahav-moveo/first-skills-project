import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // repository to interact with the products table
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>, // repository to interact with the departments table
  ) {}

  findAll(department?: string): Promise<Product[]> {
    return this.productsRepository.find({ // find all products, if there is a department, filter the products by the department
      where: department
        ? {
            department: {
              slug: department,
            },
          }
        : undefined,
      relations: { category: true, department: true }, // join the category and department tables
      order: { createdAt: 'DESC' },
    });
  }

  findAllDepartments(): Promise<Department[]> {
    return this.departmentsRepository.find({
      order: { departmentName: 'ASC' },
    });
  }
}
