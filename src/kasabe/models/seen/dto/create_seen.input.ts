import { Type } from 'class-transformer/decorators';
import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, ArrayMaxSize, IsArray, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Seen)     @Field(() => Seen, {nullable: true})  
@Field(() => [Seen])   @Field(() => [Seen], {nullable: true})
`;
@InputType()
export class BuildSeenInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id?: number;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  article_id?: number;

}
