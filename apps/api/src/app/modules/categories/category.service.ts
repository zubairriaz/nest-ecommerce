import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../dto/Categories';
import { Category as CategoryEntity } from '../../entities/Category';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {}

  getCategories(){
      return this.categoryRepo.find();
  }

  saveCategory(dto: Category){
    return this.categoryRepo.save(dto);
}
}
