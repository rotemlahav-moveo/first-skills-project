import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../products/entities/product.entity';
import { CartController } from './controllers/cart.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { SavedCartLine } from './entities/saved-cart-line.entity';
import { CartPersistenceService } from './services/cart-persistence.service';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Order, OrderItem, Product, SavedCartLine])],
  controllers: [CartController],
  providers: [CheckoutService, CartPersistenceService],
})
export class CartModule {}
