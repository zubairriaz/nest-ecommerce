import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from './entities/Product';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { Category } from './entities/Category';
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
          synchronize: false,
          logging: true,
          entities: [Product, Category],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
