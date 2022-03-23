import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from '../../dto/Product';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  saveProducts(@Body() product: Product) {
    return this.productService.saveProduct(product);
  }
}
