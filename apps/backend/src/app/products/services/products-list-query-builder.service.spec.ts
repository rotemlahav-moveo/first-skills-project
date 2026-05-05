import { describe, expect, it, vi } from 'vitest';
import { ProductsListQueryBuilderService } from './products-list-query-builder.service';

function createQueryBuilderMock() {
  return {
    andWhere: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    addOrderBy: vi.fn().mockReturnThis(),
    take: vi.fn().mockReturnThis(),
    skip: vi.fn().mockReturnThis(),
  };
}

describe('ProductsListQueryBuilderService', () => {
  it('applies generic list filters', () => {
    const queryBuilder = createQueryBuilderMock();
    const service = new ProductsListQueryBuilderService();

    service.apply(queryBuilder as never, { category: ['Tops'], color: ['Black'], brand: ['Nike'] });

    expect(queryBuilder.andWhere).toHaveBeenCalledWith('category.categoryName IN (:...categories)', {
      categories: ['Tops'],
    });
    expect(queryBuilder.andWhere).toHaveBeenCalledWith('product.color IN (:...colors)', {
      colors: ['Black'],
    });
    expect(queryBuilder.andWhere).toHaveBeenCalledWith('product.brand IN (:...brands)', {
      brands: ['Nike'],
    });
  });

  it('applies price sorting and pagination', () => {
    const queryBuilder = createQueryBuilderMock();
    const service = new ProductsListQueryBuilderService();

    service.apply(queryBuilder as never, { sort: 'price-asc', page: 3, limit: 12 });

    expect(queryBuilder.orderBy).toHaveBeenCalledWith('product.price', 'ASC');
    expect(queryBuilder.addOrderBy).toHaveBeenCalledWith('product.productId', 'ASC');
    expect(queryBuilder.take).toHaveBeenCalledWith(12);
    expect(queryBuilder.skip).toHaveBeenCalledWith(24);
  });
});
