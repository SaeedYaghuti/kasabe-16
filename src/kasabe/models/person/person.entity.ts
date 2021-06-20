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
import { PersonRole } from './person_role.enum';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BeforeInsert } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreatePersonInput } from './dto/create_person.input';


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
  export class Person extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    person_id: number;

    @Column("enum", { enum: PersonRole})
    @Field(() => PersonRole)
    person_role: PersonRole;

    @Column()
    @Field()
    person_name: string;

    // relation between Person and Address
    // @OneToMany(
    //   type => Address,
    //   address => address.person,
    //   { eager: true },
    // )
    // // variable to access Many_Part from address_category_part
    // @JoinColumn({ name: 'address_id'})
    // @Field(() => [Address])
    // addresses: Address[];

    public static of(rPerson: CreatePersonInput): Person {
        
      const nPerson = new Person();

      Object.assign(nPerson, rPerson);

      return nPerson;

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