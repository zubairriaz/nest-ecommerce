import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/Product';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('Mongo_URI'),
          useNewUrlParser: true,
          synchronize: true,
          logging: true,
          entities:[Product]
        };
      },
    }),
    ProductsModule,
    OrdersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthenticationService],
})
export class AppModule {}
