import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, Float, ObjectType, Int } from 'type-graphql';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@Entity()
@ObjectType()
  export class ProductAttribute extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    attribute_id: number;

    @Column()
    @Field()
    attribute_name: string;
  }