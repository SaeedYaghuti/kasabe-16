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
import { BeforeInsert, OneToOne } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, validate, IsInt, Min, ValidateNested, ArrayMaxSize, Max } from 'class-validator';
import { BuildRateInput } from './dto/create_rate.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from '../tag/tag.entity';
import { Merchant } from '../merchant/merchant.entity';
import { Type } from 'class-transformer';
import { Heart } from '../heart/heart.entity';
import { HeartService } from '../heart/heart.service';
import { Article } from '../article/article.entity';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Rate)  @Field(() => Rate, {nullable: true})  
@Field(() => [Rate])   @Field(() => [Rate], {nullable: true})
`;

@Entity()
@ObjectType()
export class Rate extends BaseEntity {
  
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  rate_id!: number;


  @Field(() => Auth,{ nullable: true })
  @ManyToOne(
      type => Auth,
      auth => auth.rates,
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

  @OneToOne(
    type => Article,
    article => article.article_rate,
    {
      cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      eager: false,
    },
  ) 
  @JoinColumn({ name: 'rate_article_id'})
  //// @Field(() => Article,{ nullable: true })
  rate_article?: Article;

  @Column()
  //// @Field(() => Int,{ nullable: true })
  rate_article_id?: number; // name without attribute




  @ManyToOne(
    type => Article,
    article => article.rates,
    {
      cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      eager: false,
    },
  ) 
  @JoinColumn({ name: 'audience_article_id'})
  //// @Field(() => Article,{ nullable: true })
  audience_article?: Article;

  @Column()
  //// @Field(() => Int,{ nullable: true })
  audience_article_id?: number; 



  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field()
  @Column()
  rate_text?: string; 
  
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  @Field()
  @Column()
  rate_stars?: number; 
  
  //// @IsOptional()
  //// @IsString()
  //// @MinLength(3)
  //// @MaxLength(200)
  //// @Column()
  @Field()
  heart_count?: string; //! BigInt in db
  
  
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field()
  //// @Column()
  liked?: boolean;

  
  @Field({ nullable: true })
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;


  // // @Field(() => [Heart],{ nullable: true })
  // @OneToMany(
  //   type => Heart,
  //   heart => heart.rate,
  // {
  //     // cascade: [ 'insert', 'update' ],
  //     onDelete: 'CASCADE',
  //     // eager: true,
  // },
  // )
  // // @JoinColumn({ referencedColumnName: "heart_id", name: "heart_id"})
  // hearts: Heart[];

  public static of(rRate: BuildRateInput): Rate {
    
      const nRate = new Rate();
  
      Object.assign(nRate, rRate);

      //// nRate.heartsCount = 0;
  
      return nRate;
  
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