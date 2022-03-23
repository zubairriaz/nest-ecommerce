import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Category } from './Categories';
export class Product {
  @IsNotEmpty()
  Name: string;
  @MaxLength(400)
  Description: string;
  @IsNumber()
  Price: number;
  Discount: number;
  categories: Category[]
}
