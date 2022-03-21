import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../dto/Product';
import { Product as ProductEntity } from '../../entities/Product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>
  ) {}
  getProducts() {
    return this.productRepo.find();
  }
  saveProduct(dto: Product) {
    this.productRepo.save(dto);
  }
}
