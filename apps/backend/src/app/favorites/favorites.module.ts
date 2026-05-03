import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Product } from '../products/entities/product.entity';
import { FavoritesController } from './controllers/favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { FavoritesService } from './services/favorites.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Favorite, Product])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
