import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  Name: string;

  @Column()
  Description: string;
}
