import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  categoryId!: string;

  @Column({ name: 'category_name' })
  categoryName!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
