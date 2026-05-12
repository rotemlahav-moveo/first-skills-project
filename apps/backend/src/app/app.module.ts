import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/backend/.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USER', 'snap_style'),
        password: config.get<string>('DB_PASSWORD', 'snap_style'),
        database: config.get<string>('DB_NAME', 'snapStyle_db'),
        autoLoadEntities: true,
        synchronize:
          (config.get<string>('DB_SYNCHRONIZE', 'false') ?? 'false').toLowerCase() ===
          'true',
      }),
    }),
    AuthModule,
    ProductsModule,
    CartModule,
    FavoritesModule,
  ],
})
export class AppModule {}
