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
export class BuildRelationInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id?: number;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  merchant_id?: number;
}
