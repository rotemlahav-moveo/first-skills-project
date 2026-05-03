import { UserEntity } from '../../auth/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

/** Table name kept as `wishlists` for existing databases. */
@Entity({ name: 'wishlists' })
@Unique('UQ_wishlists_user_product', ['user', 'product'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid', { name: 'list_id' })
  listId!: string;

  @ManyToOne(() => UserEntity, (user) => user.favoriteItems, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => Product, (product) => product.favoriteItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}
