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
import { IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, validate, IsInt, Min, ValidateNested, ArrayMaxSize } from 'class-validator';
import { BuildPostInput } from './dto/create_post.input';
import { Tag } from '../tag/tag.entity';
import { Merchant } from '../merchant/merchant.entity';
import { Type } from 'class-transformer';
import { Heart } from '../heart/heart.entity';
import { HeartService } from '../heart/heart.service';
import { Article } from '../article/article.entity';
import { Auth } from '../../../auth/auth/auth.entity';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Post)  @Field(() => Post, {nullable: true})  
@Field(() => [Post])   @Field(() => [Post], {nullable: true})
`;

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  post_id!: number;

  //* auth
  @Field(() => Auth,{ nullable: true })
  @ManyToOne(
      type => Auth,
      auth => auth.posts,
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
  @OneToOne(
    type => Article,
    article => article.article_post,
    {
      cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      eager: false,
    },
  ) 
  @JoinColumn({ name: 'post_article_id'})
  //// @Field(() => Article,{ nullable: true })
  post_article?: Article;

  @Column()
  //// @Field(() => Int,{ nullable: true })
  post_article_id?: number; // name without attribute


  @ManyToOne(
    type => Article,
    article => article.posts,
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

  //> no direct relation with merchant
  // @IsNotEmpty()
  // @IsInt()
  // @Field(() => Int)
  // @Column()
  // merchant_id?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field()
  @Column()
  post_text?: string; 
  
  // @IsNotEmpty()
  // @IsInt()
  // @Min(0)
  ////@Field() shouldn't get from client
  // @Column({ default: 0 })
  // heartsCount!: number; 
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(10)
  @Type(() => String)
  @Field(() => [String] ,{ nullable: true })
  @Column("text", { array: true, nullable: false }) //! picture should be exist
  picture_urls?: string[]; 
  
  @Field({ nullable: true })
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;

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
  @Column({insert: false, update: false, select: true, nullable: true})
  liked?: boolean;


  // * we added article
  // // @Field(() => [Heart],{ nullable: true })
  // @OneToMany(
  //   type => Heart,
  //   heart => heart.post,
  // {
  //     // cascade: [ 'insert', 'update' ],
  //     onDelete: 'CASCADE',
  //     // eager: true,
  // },
  // )
  // // @JoinColumn({ referencedColumnName: "heart_id", name: "heart_id"})
  // hearts: Heart[];


  public static of(rPost: BuildPostInput): Post {
    
      const nPost = new Post();
  
      Object.assign(nPost, rPost);

      //// nPost.heartsCount = 0;
  
      return nPost;
  
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