import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany, 
    JoinTable,
    JoinColumn,
    Unique,
    OneToMany,
  } from 'typeorm';
import { ProductCategory } from '../product_category/product_category.entity';
import { Tag } from '../tag/tag.entity';
import { OrderDetails } from '../order_details/order_details.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';

@Entity({ name: 'product'})
@Unique(['sku']) // say to pg these columns must be unique
@ObjectType()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    product_id!: number;

    @Column()
    @Field()
    sku!: string;
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    supplier_sku?: string;

    // relation with Product_Category
    // relation with Transaction
    @ManyToOne(
        type => ProductCategory,
        product_category => product_category.products,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          eager: false,
        },
    ) // only one side of relationship could be eager
    @JoinColumn({ name: 'product_category_id'})
    @Field(() => ProductCategory,{ nullable: true })
    category?: ProductCategory;

    @Column({ nullable: true })
    @Field(() => Int,{ nullable: true })
    product_category_id?: number; // name without attribute

    @Column()
    @Field()
    product_name: string; // name without attribute

    @Column( 'decimal', { scale: 3, nullable: true } )
    @Field(() => Float,{ nullable: true })
    msrp: number; // merchand sujessted retail price

    @Column( 'decimal', { scale: 3 } )
    @Field(() => Float)
    price: number; // price after discount without tax

    @Column({default: 'omani riyal', nullable: true })
    @Field({ nullable: true })
    price_currency: string;

    @Column({default: 'omr', nullable: true })
    @Field({ nullable: true })
    currency_symbole: string;

    @Column({default: 'pc', nullable: true })
    @Field({ nullable: true })
    unit_title: string; //pc, box, ...

    @Column( 'decimal', { scale: 2, nullable: true } )
    @Field(() => Float,{ nullable: true })
    unit_weight: number; //gr, kg, oz, ...

    @Column({default: 'kg', nullable: true })
    @Field({ nullable: true })
    unit_weight_title: string; //gr, kg, oz, ...
    
    @Column({default: false, nullable: true })
    @Field(() => Boolean,{ nullable: true })
    is_discount: boolean;

    @Column( 'decimal', { scale: 2, default: 0, nullable: true } )
    @Field(() => Float,{ nullable: true })
    discount: number; //0.2, 0.3, ...

    @Column( {default: 1, nullable: true } )
    @Field(() => Int,{ nullable: true })
    ranking: number;
    
    @Column( {default: 2, nullable: true })
    @Field(() => Int,{ nullable: true })
    reorder_level: number;

    @Column({default: true, nullable: true })
    @Field(() => Boolean,{ nullable: true })
    is_active: boolean;


    // Many_to_Many relationship with tag
    @ManyToMany(
      type => Tag,
      tag => tag.products,
      {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          eager: true,
          nullable: true 
      },

    )
    @JoinTable({ 
      name: 'tag_product',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'product_id'
      },
      inverseJoinColumn: {
        name: 'tag_id',
        referencedColumnName: 'tag_id'
      } 
    })
    @Field(() => [Tag], {nullable: true})
    tags: Tag[];


    // relation between product and order
    @OneToMany(
        // type =>  Many_Table
        type => OrderDetails,
        // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
        order_details => order_details.product,
        { eager: false },
    )
    // variable to access Many_Part from One_part
    @Field(() => [OrderDetails], {nullable: true})
    order_details: OrderDetails[];
  }

  /*
  product_id
  sku
  supplier_sku
  category
  product_name
  msrp
  price
  price_currency
  currency_symbole
  unit_weight_title
  unit_weight
  is_discount
  discount
  ranking
  reorder_level 
  is_active
*/