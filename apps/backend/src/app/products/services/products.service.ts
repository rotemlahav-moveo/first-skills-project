import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ProductsListQueryArgs } from '../../../../../../libs/shared/products-contracts/src';
import { Department } from '../entities/department.entity';
import { Product } from '../entities/product.entity';
import { ProductsListQueryBuilderService } from './products-list-query-builder.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    private readonly productsListQueryBuilder: ProductsListQueryBuilderService,
  ) {}

  findAll(filters: ProductsListQueryArgs = {}): Promise<Product[]> {
    const qb = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.department', 'department');

    this.productsListQueryBuilder.apply(qb, filters);

    return qb.getMany();
  }

  findById(productId: string): Promise<Product | null> {
    return this.productsRepository.findOne({
      where: { productId },
      relations: { category: true, department: true },
    });
  }

  findAllDepartments(): Promise<Department[]> {
    return this.departmentsRepository.find({
      order: { departmentName: 'ASC' },
    });
  }
}
