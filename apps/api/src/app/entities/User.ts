import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import {Roles} from '../common/enums';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;
  @Column()
  uuid: string;
  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  Role:Roles
}


