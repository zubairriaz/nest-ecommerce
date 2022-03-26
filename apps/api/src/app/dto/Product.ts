import { IsNotEmpty, IsNumber, MaxLength, IsUUID, IsOptional } from 'class-validator';
import { Category } from './Categories';
export class Product {
  @IsOptional()
  @IsUUID()
  id:string
  @IsNotEmpty()
  Name: string;
  @MaxLength(400)
  Description: string;
  @IsNumber()
  Price: number;
  Discount: number;
  Categories: Category[]
}
