import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, ManyToOne } from 'typeorm';
import { Person } from '../person/person.entity';
import { Field, Float, ID, ObjectType, Int } from 'type-graphql';


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

@Entity({ name: 'address' })
@ObjectType()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    address_id: number;

    // relation with Person
    @ManyToOne(
        type => Person,
        // person => person.addresses,
        {
          cascade: [ 'insert', 'update' ],
          onDelete: 'CASCADE',
          // only one side of relationship could be eager
          eager: false,
        },
    ) 
    @JoinColumn({ name: 'person_id'})
    @Field(() => Person)
    person: Person;

    @Column("integer")
    @Field(() => Int) 
    person_id: number;

    @Column()
    @Field()
    address_title: string; // heart: main_warhouse, home, ...

    @Column()
    @Field()
    address_line1: string;
    
    @Column({nullable: true})
    @Field({ nullable: true }) 
    address_line2: string;

    // TODO: GeoLoacation
    @Column({nullable: true})
    @Field({ nullable: true }) 
    location: string; // maybe we must change to somthing else instead of string
    
    @Column({nullable: true})
    @Field({ nullable: true }) 
    postal_code: string;

    @Column()
    @Field()
    city: string;

    @Column()
    @Field()
    state: string;

    @Column()
    @Field()
    country: string;
    
    // TODO: is better way to store email, phone, fax in database
    @Column({nullable: true})
    @Field({ nullable: true }) 
    email: string;
    
    @Column()
    @Field()
    phone: string;
    
    @Column({nullable: true})
    @Field({ nullable: true }) 
    fax: string;
}

// address_id, person_id, address_title, address_line1 ,address_line2 ,location ,postal_code, city, state, country, email, phone, fax
