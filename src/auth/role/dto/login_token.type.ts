import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BeforeUpdate,
  } from 'typeorm';
// import { Address } from '../address/address.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';



`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Auth)  @Field(() => Auth, {nullable: true})  
@Field(() => [Auth])   @Field(() => [Auth], {nullable: true})
`;

@ObjectType()
  export class LoginToken {
    @Column()
    @Field()
    accessToken: string;
}