import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class Product {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   Name: string; 
   
   @Column() 
   Description: string; 

   @Column()
   Price: number

   @Column()
   discount: number
}