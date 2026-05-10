import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { DataSource } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { CheckoutService } from './checkout.service';

function createTransactionMock(
  product: Product | null,
  saveOrderResult: Order,
) {
  return vi.fn(async (callback: (manager: unknown) => Promise<unknown>) => {
    const orderRepo = {
      create: vi.fn((value: unknown) => value),
      save: vi.fn().mockResolvedValue(saveOrderResult),
    };
    const itemRepo = {
      create: vi.fn((value: unknown) => value),
      save: vi.fn().mockResolvedValue({}),
    };
    const productRepo = {
      findOne: vi.fn().mockResolvedValue(product),
    };
    const manager = {
      getRepository: (entity: unknown) => {
        if (entity === Product) {
          return productRepo;
        }
        if (entity === Order) {
          return orderRepo;
        }
        if (entity === OrderItem) {
          return itemRepo;
        }
        throw new Error('Unexpected entity');
      },
    };
    return callback(manager);
  });
}

describe('CheckoutService', () => {
  it('rejects empty cart before transaction', async () => {
    const dataSource = {
      transaction: vi.fn(),
    } as unknown as DataSource;
    const service = new CheckoutService(dataSource);

    await expect(service.checkout('user-1', { items: [] })).rejects.toBeInstanceOf(BadRequestException);
    expect(dataSource.transaction).not.toHaveBeenCalled();
  });

  it('rejects invalid size when product defines sizes', async () => {
    const product = {
      productId: 'p1',
      productName: 'Shirt',
      price: 20,
      sizes: ['S', 'M'],
      imageUrl: 'https://x',
      color: 'blue',
    } as Product;

    const dataSource = {
      transaction: createTransactionMock(product, {
        orderId: 'o1',
        totalAmount: 28,
        orderDate: new Date(),
        user: {} as never,
        createdAt: new Date(),
        items: [],
      }),
    } as unknown as DataSource;
    const service = new CheckoutService(dataSource);

    await expect(
      service.checkout('user-1', {
        items: [{ productId: 'p1', quantity: 1, size: 'XL', color: 'blue' }],
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('creates order and line with server-side totals', async () => {
    const product = {
      productId: 'p1',
      productName: 'Shirt',
      price: 10,
      sizes: ['M'],
      imageUrl: 'https://x',
      color: 'navy',
    } as Product;

    const savedOrder: Order = {
      orderId: 'ord-1',
      orderDate: new Date(),
      totalAmount: 28,
      user: {} as never,
      createdAt: new Date(),
      items: [],
    };

    const dataSource = {
      transaction: createTransactionMock(product, savedOrder),
    } as unknown as DataSource;
    const service = new CheckoutService(dataSource);

    const result = await service.checkout('user-1', {
      items: [{ productId: 'p1', quantity: 2, size: 'M', color: 'navy' }],
    });

    expect(result).toEqual({
      orderId: 'ord-1',
      totalAmount: 28,
      subtotal: 20,
      shipping: 8,
    });
  });

  it('throws when product missing', async () => {
    const dataSource = {
      transaction: createTransactionMock(null, {} as Order),
    } as unknown as DataSource;
    const service = new CheckoutService(dataSource);

    await expect(
      service.checkout('user-1', {
        items: [{ productId: 'missing', quantity: 1, size: 'M', color: 'x' }],
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
