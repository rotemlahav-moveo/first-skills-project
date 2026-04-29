import { UserEntity } from '../../auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @Column({ name: 'order_date', type: 'timestamp' })
  orderDate!: Date;

  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
