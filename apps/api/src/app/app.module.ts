import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { JWTAuthenticationService } from './services/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/Product';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { Category } from './entities/Category';
import { Order } from './entities/Order';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './entities/User';
import { GlobalModule } from './modules/global/global.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.get('Mongo_URI'),
          useNewUrlParser: true,
          synchronize: false,
          logging: true,
          entities: [Product, Category, Order, User],
        };
      },
    }),
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    AuthModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
