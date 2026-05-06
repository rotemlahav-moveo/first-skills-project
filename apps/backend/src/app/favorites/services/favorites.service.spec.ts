import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { Product } from '../../products/entities/product.entity';
import { FavoritesService } from './favorites.service';

function createFavoriteRepoMock() {
  return {
    find: vi.fn(),
    delete: vi.fn(),
    save: vi.fn(),
    create: vi.fn((value: unknown) => value),
    manager: {
      transaction: vi.fn(),
    },
  };
}

function createProductRepoMock() {
  return {
    findBy: vi.fn(),
  };
}

describe('FavoritesService', () => {
  it('findAllForUser maps joined products to DTOs', async () => {
    const favoriteRepo = createFavoriteRepoMock();
    const productRepo = createProductRepoMock();
    favoriteRepo.find.mockResolvedValue([
      {
        listId: 'w1',
        product: {
          productId: 'p1',
          productName: 'Shirt',
          price: 10,
          imageUrl: 'https://x',
          color: 'blue',
          sizes: ['S', 'M'],
        } as Product,
      },
    ]);

    const service = new FavoritesService(favoriteRepo as never, productRepo as never);
    const result = await service.findAllForUser('user-1');

    expect(result).toEqual([
      {
        productId: 'p1',
        productName: 'Shirt',
        price: 10,
        imageUrl: 'https://x',
        color: 'blue',
        sizes: ['S', 'M'],
      },
    ]);
  });

  it('replaceForUser rejects more than max items', async () => {
    const favoriteRepo = createFavoriteRepoMock();
    const productRepo = createProductRepoMock();
    const ids = Array.from({ length: 31 }, (_, index) => `p${index}`);
    const service = new FavoritesService(favoriteRepo as never, productRepo as never);

    await expect(service.replaceForUser('user-1', ids)).rejects.toBeInstanceOf(BadRequestException);
    expect(favoriteRepo.manager.transaction).not.toHaveBeenCalled();
  });

  it('replaceForUser runs transaction with valid product ids only', async () => {
    const favoriteRepo = createFavoriteRepoMock();
    const productRepo = createProductRepoMock();
    productRepo.findBy.mockResolvedValue([
      {
        productId: 'p1',
        productName: 'A',
        price: 1,
        imageUrl: '',
        color: 'c',
        sizes: ['M'],
      } as Product,
    ]);

    const innerRepo = {
      delete: vi.fn().mockResolvedValue(undefined),
      save: vi.fn().mockResolvedValue(undefined),
      create: vi.fn((value: unknown) => value),
    };

    favoriteRepo.manager.transaction.mockImplementation(async (fn: (em: unknown) => Promise<void>) => {
      await fn({
        getRepository: () => innerRepo,
      });
    });

    const service = new FavoritesService(favoriteRepo as never, productRepo as never);
    await service.replaceForUser('user-1', ['p1', 'missing']);

    expect(innerRepo.delete).toHaveBeenCalled();
    expect(innerRepo.save).toHaveBeenCalledTimes(1);
    expect(innerRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        user: { id: 'user-1' },
        product: expect.objectContaining({ productId: 'p1' }),
      }),
    );
  });
});
