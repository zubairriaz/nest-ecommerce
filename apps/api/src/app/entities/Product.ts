import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  uuid: string;
  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  Price: number;

  @Column()
  Discount: number;

  @Column((_) => Category)
  Categories: Category[];

  @Column()
  Photos: Photo[];
}

export class Photo {
  @Column()
  url: string;
}
