import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from '../../entities/Product';
import { ProductService } from './product.service';
import { S3ManagerService } from '../../services/AWS/Aws.s3';
import { CognitoService } from '../../services/AWS/Aws.cognito';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, S3ManagerService, CognitoService],
})
export class ProductsModule {}
