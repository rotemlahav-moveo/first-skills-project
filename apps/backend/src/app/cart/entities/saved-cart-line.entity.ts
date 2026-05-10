import { UserEntity } from '../../auth/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'saved_cart_lines' })
@Unique('UQ_saved_cart_user_product', ['user', 'product'])
export class SavedCartLine {
  @PrimaryGeneratedColumn('uuid', { name: 'cart_line_id' })
  cartLineId!: string;

  @ManyToOne(() => UserEntity, (user) => user.savedCartLines, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @Column()
  size!: string;

  @Column()
  color!: string;
}
