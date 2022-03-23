import { IsMongoId, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
export class Category {
  @IsOptional()
  @IsMongoId()
  id: string;
  @IsNotEmpty()
  Name: string;
  @MaxLength(400)
  Description: string;
}
