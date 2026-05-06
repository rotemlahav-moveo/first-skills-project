import { describe, expect, it, vi } from 'vitest';
import { ProductsService } from './products.service';

function createQueryBuilderMock() {
  return {
    leftJoinAndSelect: vi.fn().mockReturnThis(),
    getManyAndCount: vi.fn(),
  };
}

describe('ProductsService', () => {
  it('returns paginated metadata with items', async () => {
    const queryBuilder = createQueryBuilderMock();
    queryBuilder.getManyAndCount.mockResolvedValue([[{ productId: 'p-1' }, { productId: 'p-2' }], 45]);

    const productsRepository = {
      createQueryBuilder: vi.fn().mockReturnValue(queryBuilder),
    };
    const departmentsRepository = {
      find: vi.fn(),
    };
    const productsListQueryBuilder = {
      apply: vi.fn(),
    };

    const service = new ProductsService(
      productsRepository as never,
      departmentsRepository as never,
      productsListQueryBuilder as never,
    );

    const result = await service.findAll({ page: 2, limit: 20 });

    expect(productsListQueryBuilder.apply).toHaveBeenCalledWith(queryBuilder, { page: 2, limit: 20 });
    expect(result).toEqual({
      items: [{ productId: 'p-1' }, { productId: 'p-2' }],
      total: 45,
      page: 2,
      limit: 20,
      totalPages: 3,
    });
  });

  it('falls back to defaults when pagination is omitted', async () => {
    const queryBuilder = createQueryBuilderMock();
    queryBuilder.getManyAndCount.mockResolvedValue([[], 0]);

    const productsRepository = {
      createQueryBuilder: vi.fn().mockReturnValue(queryBuilder),
    };
    const departmentsRepository = {
      find: vi.fn(),
    };
    const productsListQueryBuilder = {
      apply: vi.fn(),
    };

    const service = new ProductsService(
      productsRepository as never,
      departmentsRepository as never,
      productsListQueryBuilder as never,
    );

    const result = await service.findAll({});

    expect(result).toEqual({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 1,
    });
  });
});
