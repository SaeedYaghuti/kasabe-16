import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    BeforeUpdate,
    CreateDateColumn,
    JoinTable,
    ManyToMany,
    UpdateDateColumn,
  } from 'typeorm';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BeforeInsert, Unique } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, validate, IsInt, Min, ValidateNested, ArrayMaxSize, IsEnum } from 'class-validator';
import { BuildRelationInput } from './dto/create_relation.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from '../tag/tag.entity';
import { Type } from 'class-transformer';
import { Merchant } from '../merchant/merchant.entity';
import { RelationType } from './relation_type.enum';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Relation)  @Field(() => Relation, {nullable: true})  
@Field(() => [Relation])   @Field(() => [Relation], {nullable: true})
`;

@ObjectType()
@Entity()
@Unique('UQ_RELATION', ["auth_id", "merchant_id" ] )
export class Relation extends BaseEntity {
  
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  relation_id!: number;

  //* auth
  @Field(() => Auth,{ nullable: true })
  @ManyToOne(
      type => Auth,
      // auth => auth.relations,
      {
        // cascade: [ 'insert', 'update' ],
        // onDelete: 'CASCADE',
        // eager: false,
      },
  )
  @JoinColumn({ name: 'auth_id'})
  auth?: Auth;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  @Column()
  auth_id?: number;
  
  //* merchant
  @Field(() => Merchant,{ nullable: true })
  @ManyToOne(
      type => Merchant,
      merchant => merchant.relations,
      {
        // cascade: [ 'insert', 'update' ],
        // onDelete: 'CASCADE',
        // eager: false,
      },
  )
  @JoinColumn({ name: 'merchant_id'})
  merchant?: Merchant;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  @Column()
  merchant_id?: number;

  @IsOptional()
  @IsEnum(RelationType)
  @Field(() => RelationType,{ nullable: true })
  relation_type?: RelationType; 



  @Field({ nullable: true })
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;


  public static of(rRelation: BuildRelationInput): Relation {
    
      const nRelation = new Relation();
  
      Object.assign(nRelation, rRelation);
  
      return nRelation;
  
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