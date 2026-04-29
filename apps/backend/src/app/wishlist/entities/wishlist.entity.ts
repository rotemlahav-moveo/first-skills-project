import { UserEntity } from '../../auth/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'wishlists' })
export class Wishlist {
  @PrimaryGeneratedColumn('uuid', { name: 'list_id' })
  listId!: string;

  @ManyToOne(() => UserEntity, (user) => user.wishlistItems, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => Product, (product) => product.wishlistItems, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;
}
