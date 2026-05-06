import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  PaginatedResultDto,
  ProductsListQueryArgs,
} from '../../../../../../libs/shared/products-contracts/src';
import { Department } from '../entities/department.entity';
import { Product } from '../entities/product.entity';
import { ProductsListQueryBuilderService } from './products-list-query-builder.service';

@Injectable()
export class ProductsService {
  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_LIMIT = 20;
  private static readonly MAX_LIMIT = 100;

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    private readonly productsListQueryBuilder: ProductsListQueryBuilderService,
  ) {}

  async findAll(filters: ProductsListQueryArgs = {}): Promise<PaginatedResultDto<Product>> {
    const page = filters.page ?? ProductsService.DEFAULT_PAGE;
    const limit = Math.min(filters.limit ?? ProductsService.DEFAULT_LIMIT, ProductsService.MAX_LIMIT);

    const qb = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.department', 'department');

    this.productsListQueryBuilder.apply(qb, filters);
    const [items, total] = await qb.getManyAndCount();
    const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages,
    };
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
