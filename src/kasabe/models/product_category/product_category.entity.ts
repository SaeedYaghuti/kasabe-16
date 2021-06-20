import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    TreeParent,
    TreeChildren,
    Tree,
    OneToMany,
  } from 'typeorm';
import { Product } from '../product/product.entity';
import { OneToOne } from 'typeorm';
import { Field, Float, ObjectType, Int } from 'type-graphql';


`
@ObjectType()
@Field(() => Int)    @Field(() => Int,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@Entity()
@Tree('closure-table')
@ObjectType()
  export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    id: number;

    @Column()
    @Field()
    category_name: string;
    
    @Column()
    @Field()
    category_description: string;

    @TreeChildren()
    @Field(() => [ProductCategory], { nullable: true })
    children: ProductCategory[];

    @TreeParent()
    // @JoinColumn({ name: 'parent_category_id'})
    @JoinColumn({ name: 'parentId'})
    @Field(() => ProductCategory, { nullable: true })
    parent: ProductCategory;

    @Column({nullable: true})
    @Field(() => Int,{ nullable: true })
    parentId: number;

    // relation with Product
    @OneToOne(type => Product)
    @JoinColumn({ name: 'flag_product_id'})
    @Field(() => Product, { nullable: true })
    flag_product: Product;

    @Column({nullable: true})
    @Field(() => Int,{ nullable: true })
    flag_product_id: number;

    @Column({nullable: true})
    @Field({ nullable: true })
    picture_url: string;

    @Column()
    @Field(() => Boolean) 
    isActive: boolean;

    // relation between ProductCategory and Product
    @OneToMany(
        type => Product,
        product => product.category,
        { eager: true },
    )
    // variable to access Many_Part from product_category_part
    @JoinColumn({ name: 'product_id'})
    @Field(() => [Product], { nullable: true }) 
    products: Product[];
  }

  /*
  id
  *product_category_id
  category_name
  category_description
  children
  *parentId
  parent
  flag_product_id
  picture_url
  isActive
  products
  */