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
import { Field, Float, ObjectType, Int } from 'type-graphql';
import { BeforeInsert, OneToOne } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { BuildArticleInput } from './dto/create_article.input';
import { ArticleType } from './article_type.enum';
import { Heart } from '../heart/heart.entity';
import { Comment } from '../comment/comment.entity';
import { Rate } from '../rate/rate.entity';
import { Post } from '../post/post.entity';
import { Seen } from '../seen/seen.entity';


`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Article)  @Field(() => Article, {nullable: true})  
@Field(() => [Article])   @Field(() => [Article], {nullable: true})
`;

@Entity({ name: 'article' })
@ObjectType()
  export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int) 
    article_id: number;

    @Column("enum", { enum: ArticleType})
    @Field(() => ArticleType)
    article_type: ArticleType;

    // @Column()
    // @Field()
    // article_name: string;

    //* heart
    // @Field(() => [Heart],{ nullable: true })
    @OneToMany(
      type => Heart,
      heart => heart.article,
    {
        // cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // eager: true,
    },
    )
    @JoinColumn({ referencedColumnName: "heart_id", name: "heart_id"})
    hearts: Heart[];
    
    //* seen
    // @Field(() => [Seen],{ nullable: true })
    @OneToMany(
      type => Seen,
      seen => seen.article,
    {
        // cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        // eager: true,
    },
    )
    @JoinColumn({ referencedColumnName: "seen_id", name: "seen_id"})
    seens: Seen[];

    //* post
    @OneToOne(
      type => Post,
      post => post.post_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    //// @JoinColumn({ name: 'post_id'}) only one side
    //// @Field(() => Post,{ nullable: true })
    article_post?: Post;
    
    //> relation with audience_post
    @OneToMany(
      type => Post,
      post => post.audience_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    // @JoinColumn({ name: 'post_id'})
    @Field(() => [Post],{ nullable: true })
    posts?: Post[];
    
    //* comment
    @OneToOne(
      type => Comment,
      comment => comment.comment_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    //// @JoinColumn({ name: 'comment_id'}) only one side
    //// @Field(() => Comment,{ nullable: true })
    article_comment?: Comment;
    
    //> relation with audience_comment
    @OneToMany(
      type => Comment,
      comment => comment.audience_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    // @JoinColumn({ name: 'comment_id'})
    @Field(() => [Comment],{ nullable: true })
    comments?: Comment[];
    
    //* rate
    //> relation with article_rate
    @OneToOne(
      type => Rate,
      rate => rate.rate_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    //// @JoinColumn({ name: 'rate_id'}) only one side
    //// @Field(() => Rate,{ nullable: true })
    article_rate?: Rate;
    
    //> relation with audience_comment
    @OneToMany(
      type => Rate,
      rate => rate.audience_article,
      {
        cascade: [ 'insert', 'update' ],
        onDelete: 'CASCADE',
        eager: false,
      },
    ) 
    // @JoinColumn({ name: 'rate_id'})
    @Field(() => [Rate],{ nullable: true })
    rates?: Rate[];



    public static of(rArticle: BuildArticleInput): Article {
        
      const nArticle = new Article();

      Object.assign(nArticle, rArticle);

      return nArticle;

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