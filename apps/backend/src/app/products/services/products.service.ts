import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import type { ProductsListQueryArgs } from '../../../../../../libs/shared/products-contracts/src';
import { Department } from '../entities/department.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
  ) {}

  findAll(filters: ProductsListQueryArgs = {}): Promise<Product[]> {
    const qb = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.department', 'department');

    if (filters.department) {
      qb.andWhere('department.slug = :deptSlug', { deptSlug: filters.department });
    }

    if (filters.category?.length) {
      qb.andWhere('category.categoryName IN (:...categories)', { categories: filters.category });
    }

    if (filters.color?.length) {
      qb.andWhere('product.color IN (:...colors)', { colors: filters.color });
    }

    if (filters.brand?.length) {
      qb.andWhere('product.brand IN (:...brands)', { brands: filters.brand });
    }

    if (filters.size?.length) {
      qb.andWhere(
        `EXISTS (
          SELECT 1 FROM unnest(string_to_array(COALESCE(product.sizes, ''), ',')) AS elem
          WHERE TRIM(elem) IN (:...sizes)
        )`,
        { sizes: filters.size },
      );
    }

    const priceLabels = filters.priceRange?.filter((label) =>
      ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].includes(label),
    );
    if (priceLabels?.length) {
      qb.andWhere(
        new Brackets((qb2) => {
          priceLabels.forEach((label, index) => {
            const base = `pr_${index}`;
            switch (label) {
              case 'Under $50':
                qb2.orWhere(`product.price < :${base}`, { [base]: 50 });
                break;
              case '$50 - $100':
                qb2.orWhere(`product.price >= :${base}_lo AND product.price <= :${base}_hi`, {
                  [`${base}_lo`]: 50,
                  [`${base}_hi`]: 100,
                });
                break;
              case '$100 - $200':
                qb2.orWhere(`product.price > :${base}_lo AND product.price <= :${base}_hi`, {
                  [`${base}_lo`]: 100,
                  [`${base}_hi`]: 200,
                });
                break;
              case 'Over $200':
                qb2.orWhere(`product.price > :${base}`, { [base]: 200 });
                break;
              default:
                break;
            }
          });
        }),
      );
    }

    const sort = filters.sort ?? 'featured';
    switch (sort) {
      case 'price-asc':
        qb.orderBy('product.price', 'ASC').addOrderBy('product.productId', 'ASC');
        break;
      case 'price-desc':
        qb.orderBy('product.price', 'DESC').addOrderBy('product.productId', 'ASC');
        break;
      case 'newest':
      case 'featured':
      default:
        qb.orderBy('product.createdAt', 'DESC').addOrderBy('product.productId', 'ASC');
        break;
    }

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
