import {Entity, ObjectID, ObjectIdColumn, Column, ManyToMany, JoinTable} from "typeorm"; 
import {Category} from './Category';

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
   Discount: number

   @Column((_)=>Category)
   Categories:Category[]

}