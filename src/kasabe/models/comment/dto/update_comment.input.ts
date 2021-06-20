import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Comment)     @Field(() => Comment, {nullable: true})  
@Field(() => [Comment])   @Field(() => [Comment], {nullable: true})
`;

// TODO: checking
@InputType()
export class UpdateCommentInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  comment_id!: number; 

  // @IsNotEmpty()
  // @IsEnum(CommentRole)
  // @Field(() => CommentRole)
  // comment_role!: CommentRole; 

  @IsNotEmpty()
  @IsString()
  @Field()
  comment_name!: string; 
}
