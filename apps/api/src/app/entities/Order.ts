import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Product } from './Product';

export class Address {
    @Column()
    Street: string;
    @Column()
    ZipCode: string;
    @Column({type:'point'})
    Coordinates: number[];
    @Column()
    FullAddress: string;
  }

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @Column((type) => OrderItem)
  OrderItems: OrderItem[];

  @Column((type) => Address)
  Address: Address;
}

export class OrderItem {
  @Column((type) => Product)
  Product: Product;
  @Column()
  Quantity: number;
  @Column()
  Price: number;
}


