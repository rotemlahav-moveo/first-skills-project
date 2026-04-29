import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Wishlist } from '../../wishlist/entities/wishlist.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId!: string;

  @Column({ name: 'product_name' })
  productName!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'numeric' })
  price!: number;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product)
  wishlistItems!: Wishlist[];
}
