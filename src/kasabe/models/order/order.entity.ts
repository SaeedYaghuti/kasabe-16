import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Shipper } from '../shipper/shipper.entity';
import { OrderStatus } from './order_status.enum';
import { OrderDetails } from '../order_details/order_details.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreatePersonInput } from '../person/dto/create_person.input';
import { Person } from '../person/person.entity';
import { CreateOrderInput } from './dto/create_order.input';


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

// @Entity()
@Entity({ name: 'orders' })
@ObjectType()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)  
    order_id: number;

    @Column()
    @Field()
    order_number: string;

    // relation with Customer
    @ManyToOne(
        type => Customer,
        customer => customer.order,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          // only one side of relationship could be eager
          eager: true,
        },
    ) 
    @JoinColumn({ name: 'customer_id'})
    @Field(() => Customer)
    customer: Customer;
    @Column("integer")
    @Field(() => Int) 
    customer_id: number;

    
    // relation with Shipper
    @ManyToOne(
        type => Shipper,
        shipper => shipper.order,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          // only one side of relationship could be eager
          eager: true,
        },
    ) 
    @JoinColumn({ name: 'shipper_id'})
    @Field(() => Shipper, {nullable: true})
    shipper: Shipper;
    @Column("integer")
    @Field(() => Int, {nullable: true}) 
    shipper_id: number;
    
    
    @Column()
    @Field()
    order_date: Date;

    @Column()
    @Field()
    required_date: Date;
    
    @Column()
    @Field()
    ship_date: Date;

    @Column( 'decimal', { scale: 3 } )
    @Field(() => Float,{ nullable: true })
    freight: number;

    @Column()
    @Field(() => OrderStatus)
    status: OrderStatus;

    // relation between order and order_details
    @OneToMany(
      // type =>  Many_Table
      type => OrderDetails,
      // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
      order_details => order_details.order,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: true,
      },
    )
    @JoinColumn({ referencedColumnName: "order_details_id", name: "order_details_id"})
    @Field(() => [OrderDetails])
    order_details: OrderDetails[];


    public static of(rOrder: CreateOrderInput): Order {
        
      const nOrder = new Order();
      
      // Todo: should add some current date
      
      Object.assign(nOrder, rOrder);

      return nOrder;

    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

      // Todo: should add some validation for time; shouldn't be to pass or future
      const errors = await validate(this, {validationError: { target: true, value: true }});
      
      if (errors.length > 0) {

        console.log('<checkDataValidation| errors>', errors);
        throw new BadRequestException('Validation failed!');

      }
    }

}

// order_id, order_number, customer_id, shipper_id, order_date, required_date, ship_date, freight, status
