import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Post)     @Field(() => Post, {nullable: true})  
@Field(() => [Post])   @Field(() => [Post], {nullable: true})
`;

// TODO: checking
@InputType()
export class UpdatePostInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  post_id!: number; 

  // @IsNotEmpty()
  // @IsEnum(PostRole)
  // @Field(() => PostRole)
  // post_role!: PostRole; 

  @IsNotEmpty()
  @IsString()
  @Field()
  post_name!: string; 
}
