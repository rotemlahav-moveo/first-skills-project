import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn('uuid', { name: 'department_id' })
  departmentId!: string;

  @Column({ name: 'department_name', unique: true })
  departmentName!: string;

  @OneToMany(() => Product, (product) => product.department)
  products!: Product[];
}
