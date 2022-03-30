import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product, UpdateProductDto } from '../../dto/Product';
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

  @Put(':id')
  updateSingleProduct(@Param('id') id, @Body() product: UpdateProductDto) {
    return this.productService.updateProduct(id, product);
  }
}
