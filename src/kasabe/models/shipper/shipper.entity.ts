import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Order } from '../order/order.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';



@Entity({ name: 'shipper' })
@ObjectType()
export class Shipper extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)  
    shipper_id!: number;

    // relation with Person
    @OneToOne(type => Person)
    @JoinColumn({ name: 'person_id'})
    @Field(() => Person, {nullable: true})  
    person: Person;

    @Column("integer")
    @Field(() => Int) 
    person_id: number;

    @Column()
    @Field() 
    shipper_name: string;

    @Column()
    @Field() 
    contact_name: string;

    @Column()
    @Field() 
    contact_title: string; //Mr, Ms

    @Column({ nullable: true })
    @Field({ nullable: true }) 
    url: string;

    @Column({ nullable: true })
    @Field({ nullable: true }) 
    logo: string;

    @Column({ nullable: true })
    @Field({ nullable: true }) 
    note: string;

    @Column({ nullable: true })
    @Field({ nullable: true }) 
    our_id: string; // our id for shipper as customer

    // relation between shipper and order
    @OneToMany(
        type => Order,
        order => order.shipper,
        { eager: false },
    )
    // variable to access Many_Part from One_part
    @Field(() => [Order], {nullable: true})
    order: Order[];
}

// shipper_id, person_id, shipper_name, contact_name, contact_title, url, logo, note, address_id, our_id
