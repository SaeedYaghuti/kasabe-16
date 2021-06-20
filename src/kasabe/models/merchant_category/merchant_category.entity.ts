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
    BeforeUpdate,
  } from 'typeorm';
import { Merchant } from '../merchant/merchant.entity';
import { OneToOne, BeforeInsert } from 'typeorm';
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BadRequestException } from '@nestjs/common';
import { validate, IsNotEmpty, IsString, Length, IsInt, IsOptional, MinLength, IsBoolean } from 'class-validator';
import { BuildMerchantInput } from '../merchant/dto/create_merchant.input';
import { Tag } from '../tag/tag.entity';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';


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
  export class MerchantCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    id: number;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    @Column()
    @Field()
    category_name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    @Column()
    @Field()
    category_description: string;

    @TreeChildren()
    @Field(() => [MerchantCategory], { nullable: true })
    children: MerchantCategory[];

    @TreeParent()
    // @JoinColumn({ name: 'parent_category_id'})
    @JoinColumn({ name: 'parentId'})
    @Field(() => MerchantCategory, { nullable: true })
    parent: MerchantCategory;

    @IsOptional()
    @IsInt()
    @Column({nullable: true})
    @Field(() => Int,{ nullable: true })
    parentId: number;

    // relation with Merchant
    @OneToOne(type => Merchant)
    @JoinColumn({ name: 'flag_merchant_id'})
    @Field(() => Merchant, { nullable: true })
    flag_merchant: Merchant;

    @IsOptional()
    @IsInt()
    @Column({nullable: true})
    @Field(() => Int,{ nullable: true })
    flag_merchant_id: number;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @Column({nullable: true})
    @Field({ nullable: true })
    picture_url: string;

    @IsOptional()
    @IsBoolean()
    @Column()
    @Field(() => Boolean) 
    isActive: boolean;

    // relation between MerchantCategory and Merchant
    @OneToMany(
        type => Merchant,
        merchant => merchant.category,
        { eager: true },
    )
    // variable to access Many_Part from merchant_category_part
    @JoinColumn({ name: 'merchant_id'})
    @Field(() => [Merchant], { nullable: true }) 
    merchants: Merchant[];


  public static of(rMerchantCategory: BuildMerchantCategoryInput): MerchantCategory {
    
    const nMerchantCategory = new MerchantCategory();

    Object.assign(nMerchantCategory, rMerchantCategory);

    return nMerchantCategory;
  
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