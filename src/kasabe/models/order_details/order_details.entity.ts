import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Shipper } from '../shipper/shipper.entity';
import { OrderStatus } from '../order/order_status.enum';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { IsEnum, validate } from 'class-validator';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';


`
@ObjectType()
@Field(() => ID)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@Entity({ name: 'order_details' })
@ObjectType()
export class OrderDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    order_details_id!: number;

    // relation between  order_details and order
    @ManyToOne(
        type => Order,
        order => order.order_details,
        {
            cascade: [ 'insert', 'update' ],
            onDelete: 'CASCADE',
            eager: false,
        },
    ) // only one side of relationship could be eager
    @JoinColumn({referencedColumnName: "order_id", name: "order_id" })
    @Field(() => Product) 
    order: Order;
    @Column()
    @Field(() => Int)
    order_id: number;

    // relation between  order_details and product
    @ManyToOne(
        type => Product,
        product => product.order_details,
        { eager: true },
    ) // only one side of relationship could be eager
    @JoinColumn({ name: "product_id" })
    @Field(() => Product) 
    product: Product;
    @Column()
    @Field(() => Int)
    product_id: number;

    @Column( 'decimal', { scale: 3 } )
    @Field(() => Float)
    msrp: number;
    
    @Column( 'decimal', { scale: 3 } )
    @Field(() => Float)
    discount: number;
    
    @Column()
    @Field(() => Int)
    quantity: number;
    
    @Column( 'decimal', { scale: 3 } )
    @Field(() => Float)
    price: number; // msrp* discount* qty
    
    // if customer can ask to ship products seperately
    // relation with Shipper
    @ManyToOne(
        type => Shipper,
        shipper => shipper.order,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          // only one side of relationship could be eager
          eager: false,
        },
    ) 
    @JoinColumn({ name: 'shipper_id'})
    @Field(() => Shipper)
    shipper: Shipper;
    @Column("integer")
    @Field(() => Int)
    shipper_id: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    required_date: Date;
    
    @Column({ nullable: true })
    @Field({ nullable: true })
    ship_date: Date;

    @Column( 'decimal', { scale: 3, nullable: true } )
    @Field(() => Float,{ nullable: true })
    freight: number;

    @Column({ nullable: true })
    @IsEnum(OrderStatus)
    @Field(() => OrderStatus)
    status: OrderStatus;

    public static of(rOrderDetails: CreateOrderDetailsInput): OrderDetails {
        
        const nOrderDetails = new OrderDetails();
  
        Object.assign(nOrderDetails, rOrderDetails);

        return nOrderDetails;
  
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

      const errors = await validate(this, {validationError: { target: true, value: true }});
      
      if (errors.length > 0) {

        console.log('<checkDataValidation| OrderDetails| errors>', errors);
        throw new BadRequestException('Validation failed!');

      }
    }
}

// order_details_id, order_id, product_id, sku, product_name, msrp, discount, quantity, price, shipper_id, required_date, ship_date, freight, status
