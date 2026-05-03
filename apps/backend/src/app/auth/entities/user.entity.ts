import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../cart/entities/order.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity({ name: 'users' }) //users is the name of the table in the database
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; //id is the primary key of the user table

  @Column({ nullable: true })
  name!: string | null;

  @Column({ unique: true }) //unique is used to ensure that the email is unique
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column({ name: 'refresh_token_hash', nullable: true })
  refreshTokenHash!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favoriteItems!: Favorite[];
}
