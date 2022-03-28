import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../dto/Product';
import { Product as ProductEntity } from '../../entities/Product';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>
  ) {}

  getProducts() {
    return this.productRepo.find();
  }

  getSingleProduct(id) {
    return this.productRepo.findBy({ "uuid": id });
  }

  deleteSingleProduct(id) {
    return this.productRepo.delete({'uuid' : id});
  }

  saveProduct(dto: Product) {
    dto.uuid = uuidv4();
    return this.productRepo.save(dto);
  }
}
