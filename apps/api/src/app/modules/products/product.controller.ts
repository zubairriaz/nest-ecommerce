import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { Product, UpdateProductDto } from '../../dto/Product';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { S3ManagerService } from '../../services/authentication/AWS/Aws.s3';
import { FileInterceptor } from '@nestjs/platform-express';
import { identifierName } from '@angular/compiler';

//@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3ManagerService
  ) {}

  @Get()
  async getProducts() {
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

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file, @Param('id') id,  @Res() res) {
    const returnValue =  await this.s3Service.uploadImage('product', id, file);
    return res.send({value: returnValue});
  }
}
