import { IsNumber, IsUUID, IsOptional, IsDefined, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { Product } from './Product';


export class Order {
  @IsOptional()
  @IsUUID()
  id:string
  OrderItems: OrderItem[]
  Address : Address
}


class OrderItem{
    @IsDefined()
    Product : Product
    @IsNumber()
    Quantity:number
    @IsNumber()
    Price:number
}

class Address {
    @IsNotEmpty()
    Street: string
    @IsNotEmpty()
    ZipCode: string
    @ArrayNotEmpty()
    coordinates:number[]
    @IsNotEmpty()
    FullAddress: string
}
