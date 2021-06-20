import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ArticleType } from '../article_type.enum';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Article)     @Field(() => Article, {nullable: true})  
@Field(() => [Article])   @Field(() => [Article], {nullable: true})
`;
@InputType()
export class UpdateArticleInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  article_id!: number; 

  @IsNotEmpty()
  @IsEnum(ArticleType)
  @Field(() => ArticleType)
  article_type!: ArticleType; 

  // @IsNotEmpty()
  // @IsString()
  // @Field()
  // article_name!: string; 
}
