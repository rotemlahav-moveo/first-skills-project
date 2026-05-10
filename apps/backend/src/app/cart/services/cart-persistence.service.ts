import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ReplaceCartRequestDto, SavedCartItemDto } from '@shared/cart-contracts';
import { CART_MAX_LINE_ITEMS } from '@shared/cart-contracts';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { SavedCartLine } from '../entities/saved-cart-line.entity';

@Injectable()
export class CartPersistenceService {
  constructor(
    @InjectRepository(SavedCartLine)
    private readonly savedCartLineRepository: Repository<SavedCartLine>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllForUser(userId: string): Promise<SavedCartItemDto[]> {
    const rows = await this.savedCartLineRepository.find({
      where: { user: { id: userId } },
      relations: { product: true },
      order: { cartLineId: 'ASC' },
    });
    return rows
      .filter((row) => row.product)
      .map((row) => ({
        id: row.product.productId,
        name: row.product.productName,
        color: row.color,
        size: row.size,
        price: Number(row.product.price),
        quantity: row.quantity,
        imageUrl: row.product.imageUrl,
      }));
  }

  async replaceForUser(userId: string, dto: ReplaceCartRequestDto): Promise<void> {
    const raw = dto.items ?? [];
    /** Last occurrence wins when duplicate product ids in payload. */
    const deduped = [...new Map(raw.map((line) => [line.productId, line])).values()];

    if (deduped.length > CART_MAX_LINE_ITEMS) {
      throw new BadRequestException(`At most ${CART_MAX_LINE_ITEMS} cart lines allowed`);
    }

    for (const line of deduped) {
      if (line.quantity < 1) {
        throw new BadRequestException('Each item must have quantity at least 1');
      }
    }

    const productIds = deduped.map((l) => l.productId);
    const products = await this.productRepository.findBy({ productId: In(productIds) });
    const byId = new Map(products.map((p) => [p.productId, p]));

    for (const line of deduped) {
      const product = byId.get(line.productId);
      if (!product) {
        throw new BadRequestException(`Unknown product ${line.productId}`);
      }
      if (product.sizes?.length && !product.sizes.includes(line.size)) {
        throw new BadRequestException(`Invalid size "${line.size}" for product ${line.productId}`);
      }
    }

    await this.savedCartLineRepository.manager.transaction(async (em) => {
      const repo = em.getRepository(SavedCartLine);
      await repo.delete({ user: { id: userId } });
      const userRef = { id: userId } as UserEntity;
      const rowsToPersist: SavedCartLine[] = [];
      for (const line of deduped) {
        const product = byId.get(line.productId);
        if (!product) {
          throw new BadRequestException(`Unknown product ${line.productId}`);
        }
        rowsToPersist.push(
          repo.create({
            user: userRef,
            product,
            quantity: line.quantity,
            size: line.size,
            color: line.color,
          }),
        );
      }
      if (rowsToPersist.length > 0) {
        await repo.upsert(rowsToPersist, {
          conflictPaths: ['user', 'product'],
          skipUpdateIfNoValuesChanged: true,
        });
      }
    });
  }
}
