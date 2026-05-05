import { Injectable } from '@nestjs/common';
import { Brackets, type SelectQueryBuilder } from 'typeorm';
import type { ProductsListQueryArgs } from '../../../../../../libs/shared/products-contracts/src';
import { Product } from '../entities/product.entity';

type ProductListFilterKey = 'category' | 'color' | 'brand';

type ProductListFilterConfig = {
  column: string;
  parameter: string;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

// Only filters that map directly to SQL IN clauses.
// size and priceRange require dedicated custom conditions.
const SIMPLE_IN_FILTERS: Record<ProductListFilterKey, ProductListFilterConfig> = {
  category: { column: 'category.categoryName', parameter: 'categories' },
  color: { column: 'product.color', parameter: 'colors' },
  brand: { column: 'product.brand', parameter: 'brands' },
};

@Injectable()
export class ProductsListQueryBuilderService {
  apply(queryBuilder: SelectQueryBuilder<Product>, filters: ProductsListQueryArgs = {}): void {
    this.applyDepartmentFilter(queryBuilder, filters);
    this.applyListFilters(queryBuilder, filters);
    this.applySizesFilter(queryBuilder, filters);
    this.applyPriceRangeFilter(queryBuilder, filters);
    this.applySorting(queryBuilder, filters);
    this.applyPagination(queryBuilder, filters);
  }

  private applyDepartmentFilter(
    queryBuilder: SelectQueryBuilder<Product>,
    filters: ProductsListQueryArgs,
  ): void {
    if (!filters.department) {
      return;
    }
    queryBuilder.andWhere('department.slug = :deptSlug', { deptSlug: filters.department });
  }

  private applyListFilters(
    queryBuilder: SelectQueryBuilder<Product>,
    filters: ProductsListQueryArgs,
  ): void {
    for (const [key, config] of Object.entries(SIMPLE_IN_FILTERS) as [
      ProductListFilterKey,
      ProductListFilterConfig,
    ][]) {
      const values = filters[key];
      if (!values?.length) {
        continue;
      }
      queryBuilder.andWhere(`${config.column} IN (:...${config.parameter})`, {
        [config.parameter]: values,
      });
    }
  }

  private applySizesFilter(queryBuilder: SelectQueryBuilder<Product>, filters: ProductsListQueryArgs): void {
    if (!filters.size?.length) {
      return;
    }
    queryBuilder.andWhere(
      `EXISTS (
        SELECT 1 FROM unnest(string_to_array(COALESCE(product.sizes, ''), ',')) AS elem
        WHERE TRIM(elem) IN (:...sizes)
      )`,
      { sizes: filters.size },
    );
  }

  private applyPriceRangeFilter(
    queryBuilder: SelectQueryBuilder<Product>,
    filters: ProductsListQueryArgs,
  ): void {
    const priceLabels = filters.priceRange?.filter((label) =>
      ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'].includes(label),
    );
    if (!priceLabels?.length) {
      return;
    }

    queryBuilder.andWhere(
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

  private applySorting(queryBuilder: SelectQueryBuilder<Product>, filters: ProductsListQueryArgs): void {
    switch (filters.sort ?? 'featured') {
      case 'price-asc':
        queryBuilder.orderBy('product.price', 'ASC').addOrderBy('product.productId', 'ASC');
        break;
      case 'price-desc':
        queryBuilder.orderBy('product.price', 'DESC').addOrderBy('product.productId', 'ASC');
        break;
      case 'newest':
      case 'featured':
      default:
        queryBuilder.orderBy('product.createdAt', 'DESC').addOrderBy('product.productId', 'ASC');
        break;
    }
  }

  private applyPagination(queryBuilder: SelectQueryBuilder<Product>, filters: ProductsListQueryArgs): void {
    const limit = Math.min(filters.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const page = filters.page ?? DEFAULT_PAGE;
    const offset = (page - 1) * limit;

    queryBuilder.take(limit).skip(offset);
  }
}
