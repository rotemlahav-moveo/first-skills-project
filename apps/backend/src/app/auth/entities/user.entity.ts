import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' }) //users is the name of the table in the database
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; //id is the primary key of the user table

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
}
