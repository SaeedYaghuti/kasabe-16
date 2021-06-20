import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Order } from '../order/order.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';


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

@Entity({ name: 'customer' })
@ObjectType()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    customer_id: number;

    // relation with Person
    @OneToOne(type => Person)
    @JoinColumn({ name: 'person_id'})
    @Field(() => Person) 
    person: Person;

    @Column("integer")
    @Field(() => Int)  
    person_id: number;

    @Column()
    @Field()
    customer_name: string;

    @Column()
    @Field()
    password: string;

    // relation between customer and order
    @OneToMany(
        // type =>  Many_Table
        type => Order,
        // Many_Table_alias =>  Many_Table_alias.variable_to_call_One_Table
        order => order.customer,
        { eager: false },
    )
    // variable to access Many_Part from One_part
    @Field(() => [Order], {nullable: true})
    order: Order[];

}
