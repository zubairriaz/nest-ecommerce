import { Injectable } from '@nestjs/common';
import { EntityRepository, MongoRepository} from 'typeorm';
import {Product} from '../entities/Product';
@Injectable()
@EntityRepository(Product)
export class ProductRepository extends MongoRepository<Product> {};