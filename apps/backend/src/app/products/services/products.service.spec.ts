import { describe, expect, it, vi } from 'vitest';
import { ProductsService } from './products.service';

function createQueryBuilderMock() {
  const mockQb = {
    leftJoinAndSelect: vi.fn().mockReturnThis(),
    getMany: vi.fn().mockResolvedValue([]),
  };
  return mockQb;
}

describe('ProductsService', () => {
  it('findAll uses query builder service', async () => {
    const mockQb = createQueryBuilderMock();
    const productsListQueryBuilder = { apply: vi.fn() };
    const productsRepository = {
      createQueryBuilder: vi.fn(() => mockQb),
    };
    const service = new ProductsService(
      productsRepository as never,
      {} as never,
      productsListQueryBuilder as never,
    );

    await service.findAll({ department: 'men' });

    expect(productsRepository.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(mockQb.leftJoinAndSelect).toHaveBeenCalled();
    expect(productsListQueryBuilder.apply).toHaveBeenCalledWith(mockQb, { department: 'men' });
    expect(mockQb.getMany).toHaveBeenCalled();
  });
});
