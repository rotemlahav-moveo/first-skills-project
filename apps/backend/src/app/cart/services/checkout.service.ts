import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { CheckoutRequestDto, CheckoutResponseDto } from '@shared/checkout-contracts';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

const FLAT_SHIPPING_USD = 8;

@Injectable()
export class CheckoutService {
  constructor(private readonly dataSource: DataSource) {}

  async checkout(userId: string, dto: CheckoutRequestDto): Promise<CheckoutResponseDto> {
    if (!dto.items?.length) {
      throw new BadRequestException('Cart is empty');
    }

    for (const line of dto.items) {
      if (line.quantity < 1) {
        throw new BadRequestException('Each item must have quantity at least 1');
      }
    }

    return this.dataSource.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);
      let subtotal = 0;
      const rows: {
        product: Product;
        quantity: number;
        unitPrice: number;
        productName: string;
        color: string;
        size: string;
        imageUrl: string;
      }[] = [];

      for (const line of dto.items) {
        const product = await productRepo.findOne({
          where: { productId: line.productId },
        });
        if (!product) {
          throw new NotFoundException(`Product ${line.productId} not found`);
        }

        if (product.sizes?.length && !product.sizes.includes(line.size)) {
          throw new BadRequestException(`Invalid size "${line.size}" for product ${line.productId}`);
        }

        const unitPrice = Number(product.price);
        const lineTotal = unitPrice * line.quantity;
        subtotal += lineTotal;

        rows.push({
          product,
          quantity: line.quantity,
          unitPrice,
          productName: product.productName,
          color: line.color,
          size: line.size,
          imageUrl: product.imageUrl,
        });
      }

      const shipping = subtotal > 0 ? FLAT_SHIPPING_USD : 0;
      const totalAmount = subtotal + shipping;

      const orderRepo = manager.getRepository(Order);
      const itemRepo = manager.getRepository(OrderItem);

      const order = orderRepo.create({
        user: { id: userId } as unknown as UserEntity,
        orderDate: new Date(),
        totalAmount,
      });
      const savedOrder = await orderRepo.save(order);

      for (const row of rows) {
        const item = itemRepo.create({
          order: savedOrder,
          product: row.product,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          productName: row.productName,
          color: row.color,
          size: row.size,
          imageUrl: row.imageUrl,
        });
        await itemRepo.save(item);
      }

      return {
        orderId: savedOrder.orderId,
        totalAmount,
        subtotal,
        shipping,
      };
    });
  }
}
