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
import { BuildCommentInput } from './dto/create_comment.input';
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

@Field(() => Comment)  @Field(() => Comment, {nullable: true})  
@Field(() => [Comment])   @Field(() => [Comment], {nullable: true})
`;

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  
  @Field(() => Int)  
  @PrimaryGeneratedColumn()
  comment_id!: number;


  @Field(() => Auth,{ nullable: true })
  @ManyToOne(
      type => Auth,
      auth => auth.comments,
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
    article => article.article_comment,
    {
      cascade: [ 'insert', 'update' ],
      onDelete: 'CASCADE',
      eager: false,
    },
  ) 
  @JoinColumn({ name: 'comment_article_id'})
  //// @Field(() => Article,{ nullable: true })
  comment_article?: Article;

  @Column()
  //// @Field(() => Int,{ nullable: true })
  comment_article_id?: number; // name without attribute



  @ManyToOne(
    type => Article,
    article => article.comments,
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
  comment_text?: string; 
  
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
  @Column({insert: false, update: false, select: false, nullable: true})
  liked?: boolean;
  
  //* computed column
  @Field()
  @Column({insert: false, update: false, select: true, nullable: true})
  comment_count?: string;

  
  @Field({ nullable: true })
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updated_at: Date;


  // // @Field(() => [Heart],{ nullable: true })
  // @OneToMany(
  //   type => Heart,
  //   heart => heart.comment,
  // {
  //     // cascade: [ 'insert', 'update' ],
  //     onDelete: 'CASCADE',
  //     // eager: true,
  // },
  // )
  // // @JoinColumn({ referencedColumnName: "heart_id", name: "heart_id"})
  // hearts: Heart[];

  public static of(rComment: BuildCommentInput): Comment {
    
      const nComment = new Comment();
  
      Object.assign(nComment, rComment);

      //// nComment.heartsCount = 0;
  
      return nComment;
  
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