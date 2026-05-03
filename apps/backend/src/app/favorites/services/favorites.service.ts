import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FAVORITES_MAX_ITEMS,
  toFavoriteItemDto,
  type FavoriteItemDto,
} from '../../../../../../libs/shared/favorites-contracts/src';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../../auth/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Favorite } from '../entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllForUser(userId: string): Promise<FavoriteItemDto[]> {
    const rows = await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: { product: true },
      order: { listId: 'ASC' },
    });
    return rows.filter((row) => row.product).map((row) => toFavoriteItemDto(row.product));
  }

  async replaceForUser(userId: string, productIds: string[]): Promise<void> {
    const unique = [...new Set(productIds)];
    if (unique.length > FAVORITES_MAX_ITEMS) {
      throw new BadRequestException(`At most ${FAVORITES_MAX_ITEMS} favorites allowed`);
    }

    const products = await this.productRepository.findBy({ productId: In(unique) });
    const byId = new Map(products.map((product) => [product.productId, product]));
    const ordered = unique.filter((id) => byId.has(id));

    await this.favoriteRepository.manager.transaction(async (entityManager) => {
      const repo = entityManager.getRepository(Favorite);
      await repo.delete({ user: { id: userId } });
      const userRef = { id: userId } as UserEntity;
      for (const productId of ordered) {
        const product = byId.get(productId)!;
        await repo.save(repo.create({ user: userRef, product }));
      }
    });
  }
}
