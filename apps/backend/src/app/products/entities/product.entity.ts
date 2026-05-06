import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Category } from './category.entity';
import { Department } from './department.entity';

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

  @Column('simple-array', { name: 'sizes', default: '' })
  sizes!: string[];

  @Column()
  color: string;

  @Column()
  brand: string;

 @Column({ name: 'image_url' })
  imageUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  // Keep nullable during rollout to avoid breaking existing rows before backfill.
  @ManyToOne(() => Department, (department) => department.products, { nullable: true })
  @JoinColumn({ name: 'department_id' })
  department!: Department | null;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favoriteItems!: Favorite[];
}
