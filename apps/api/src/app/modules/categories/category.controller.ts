import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Category } from '../../dto/Categories';
import { CategoryService } from './category.service';
import {AuthGuard} from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Post()
  saveCategories(@Body() category: Category) {
    return this.categoryService.saveCategory(category);
  }
}
