import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  @Get(':id')
  getSingleProduct(@Param('id') id) {
    return this.productService.getSingleProduct(id);
  }

  @Delete(':id')
  deleteSingleProduct(@Param('id') id) {
    return this.productService.deleteSingleProduct(id);
  }
}
