import { Type } from 'class-transformer/decorators';
import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, ArrayMaxSize, IsArray, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Relation)     @Field(() => Relation, {nullable: true})  
@Field(() => [Relation])   @Field(() => [Relation], {nullable: true})
`;
@InputType()
export class DisrelationInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  relation_id?: number;
   
}
