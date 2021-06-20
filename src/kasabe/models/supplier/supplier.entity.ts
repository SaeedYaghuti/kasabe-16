import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique, BaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Person } from '../person/person.entity';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create_supplier.input';


`
@ObjectType()
@Field(() => ID)    @Field(() => ID,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@Entity({ name: 'supplier' })
@ObjectType()
export class Supplier extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    supplier_id: number;

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
    supplier_name: string;

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
    our_id: string; // our id for supplier as customer


    public static of(rSupplier: CreateSupplierInput): Supplier {
        
        const nSupplier = new Supplier();
  
        Object.assign(nSupplier, rSupplier);

        return nSupplier;
  
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async checkDataValidation() {

      const errors = await validate(this, {validationError: { target: true, value: true }});
      
      if (errors.length > 0) {

        console.log('<<checkDataValidation>> errors: ', errors);
        throw new BadRequestException('Validation failed!');

      }
    }
}

// supplier_id, person_id, supplier_name, contact_name, contact_title, url, logo, note, address_id, our_id
