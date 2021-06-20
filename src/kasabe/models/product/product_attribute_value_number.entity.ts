import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
import { Product } from './product.entity';
import { ProductAttribute } from './product_attribute.entity';
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
  export class ProductAttributeValueNumber extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    value_id: number;

    // relation with Product
    @OneToOne(type => Product)
    @JoinColumn({ name: 'product_id'})
    @Field(() => Product)
    product: Product;

    // relation with ProductAttribute
    @OneToOne(type => ProductAttribute)
    @JoinColumn({ name: 'product_attribute_id'})
    @Field(() => ProductAttribute)
    attribute: ProductAttribute;

    
    @Column()
    @Field(() => Float)
    value: number; 

    @Column()
    @Field()
    unit: string; 
  }