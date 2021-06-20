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
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, validate, IsInt, Min, ValidateNested, ArrayMaxSize } from 'class-validator';
import { BuildSeenInput } from './dto/create_seen.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from '../tag/tag.entity';
import { Merchant } from '../merchant/merchant.entity';
import { Type } from 'class-transformer';
import { Post } from '../post/post.entity';
import { Article } from '../article/article.entity';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Seen)  @Field(() => Seen, {nullable: true})  
@Field(() => [Seen])   @Field(() => [Seen], {nullable: true})
`;

@ObjectType()
@Entity()
export class Seen extends BaseEntity {
  
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  seen_id!: number;

  //* auth
  @Field(() => Auth,{ nullable: true })
  @ManyToOne(
      type => Auth,
      // auth => auth.seens,
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
  
  //* article
  @Field(() => Article,{ nullable: true })
  @ManyToOne(
      type => Article,
      article => article.seens,
      {
        // cascade: [ 'insert', 'update' ],
        // onDelete: 'CASCADE',
        // eager: false,
      },
  )
  @JoinColumn({ name: 'article_id'})
  article?: Article;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  @Column()
  article_id?: number;

  @Field({ nullable: true })
  @CreateDateColumn()
  created_at: Date;

  // @Field({ nullable: true })
  // @UpdateDateColumn()
  // updated_at: Date;

  public static of(rSeen: BuildSeenInput): Seen {
    
      const nSeen = new Seen();
  
      Object.assign(nSeen, rSeen);
  
      return nSeen;
  
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