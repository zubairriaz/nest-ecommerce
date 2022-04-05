import { IsNotEmpty, IsNumber, MaxLength, IsUUID, IsDefined, IsMongoId, IsUrl } from 'class-validator';
import { Category } from './Categories';
export class Product {
  @IsMongoId()
  id:string
  @IsDefined()
  @IsUUID()
  uuid:string
  @IsNotEmpty()
  Name: string;
  @MaxLength(400)
  Description: string;
  @IsNumber()
  Price: number;
  Discount: number;
  Categories: Category[]
  Photos: Photo[]
}

export class Photo{
  @IsUrl()
  url: string
}


export class UpdateProductDto{
  @IsNotEmpty()
  Name: string;
  @MaxLength(400)
  Description: string;
  @IsNumber()
  Price: number;
  Discount: number;
  Categories: Category[]
  Photos: Photo[]
}
