import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { SavedCartLine } from '../entities/saved-cart-line.entity';
import { CartPersistenceService } from './cart-persistence.service';

function createLineRepoMock() {
  const lineRepo = {
    find: vi.fn(),
    delete: vi.fn(),
    save: vi.fn(),
    create: vi.fn((v: unknown) => v),
    manager: {
      transaction: vi.fn(),
    },
  };
  lineRepo.manager.transaction.mockImplementation(async (cb: (m: unknown) => Promise<void>) => {
    const em = {
      getRepository: () => ({
        delete: lineRepo.delete,
        save: lineRepo.save,
        create: lineRepo.create,
      }),
    };
    await cb(em);
  });
  return lineRepo;
}

function createProductRepoMock() {
  return {
    findBy: vi.fn(),
  };
}

describe('CartPersistenceService', () => {
  it('throws when too many distinct products', async () => {
    const lineRepo = createLineRepoMock();
    const productRepo = createProductRepoMock();
    const service = new CartPersistenceService(lineRepo as never, productRepo as never);

    const ids = Array.from({ length: 31 }, (_, i) => `p${i}`);
    await expect(
      service.replaceForUser('u1', {
        items: ids.map((id) => ({
          productId: id,
          quantity: 1,
          size: 'M',
          color: 'c',
        })),
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(lineRepo.manager.transaction).not.toHaveBeenCalled();
  });

  it('maps saved lines with joined products', async () => {
    const lineRepo = createLineRepoMock();
    const productRepo = createProductRepoMock();
    lineRepo.find.mockResolvedValue([
      {
        cartLineId: 'l1',
        quantity: 2,
        size: 'M',
        color: 'red',
        product: {
          productId: 'p1',
          productName: 'Shirt',
          price: '19.99',
          imageUrl: 'https://x',
        },
      } as unknown as SavedCartLine,
    ]);

    const service = new CartPersistenceService(lineRepo as never, productRepo as never);
    const rows = await service.findAllForUser('u1');

    expect(rows).toEqual([
      {
        id: 'p1',
        name: 'Shirt',
        color: 'red',
        size: 'M',
        price: 19.99,
        quantity: 2,
        imageUrl: 'https://x',
      },
    ]);
  });
});
