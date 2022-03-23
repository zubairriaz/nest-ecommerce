import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from '../../dto/Categories';
import { CategoryService } from './category.service';

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
