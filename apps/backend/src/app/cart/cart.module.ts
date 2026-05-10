import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../products/entities/product.entity';
import { CheckoutController } from './controllers/checkout.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Order, OrderItem, Product])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CartModule {}
