import { describe, expect, it, vi } from 'vitest';
import { ProductsService } from './products.service';

function createQueryBuilderMock() {
  const mockQb = {
    leftJoinAndSelect: vi.fn().mockReturnThis(),
    andWhere: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    addOrderBy: vi.fn().mockReturnThis(),
    getMany: vi.fn().mockResolvedValue([]),
  };
  return mockQb;
}

describe('ProductsService', () => {
  it('findAll uses query builder and applies department filter', async () => {
    const mockQb = createQueryBuilderMock();
    const productsRepository = {
      createQueryBuilder: vi.fn(() => mockQb),
    };
    const service = new ProductsService(productsRepository as never, {} as never);

    await service.findAll({ department: 'men' });

    expect(productsRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(mockQb.leftJoinAndSelect).toHaveBeenCalled();
    expect(mockQb.andWhere).toHaveBeenCalledWith('department.slug = :deptSlug', { deptSlug: 'men' });
    expect(mockQb.orderBy).toHaveBeenCalled();
    expect(mockQb.getMany).toHaveBeenCalled();
  });

  it('findAll applies category filter when provided', async () => {
    const mockQb = createQueryBuilderMock();
    const productsRepository = {
      createQueryBuilder: vi.fn(() => mockQb),
    };
    const service = new ProductsService(productsRepository as never, {} as never);

    await service.findAll({ category: ['Tops'] });

    expect(mockQb.andWhere).toHaveBeenCalledWith('category.categoryName IN (:...categories)', {
      categories: ['Tops'],
    });
  });

  it('findAll orders by price ascending when sort is price-asc', async () => {
    const mockQb = createQueryBuilderMock();
    const productsRepository = {
      createQueryBuilder: vi.fn(() => mockQb),
    };
    const service = new ProductsService(productsRepository as never, {} as never);

    await service.findAll({ sort: 'price-asc' });

    expect(mockQb.orderBy).toHaveBeenCalledWith('product.price', 'ASC');
    expect(mockQb.addOrderBy).toHaveBeenCalledWith('product.productId', 'ASC');
  });
});
