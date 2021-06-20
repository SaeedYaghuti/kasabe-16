import { Type } from 'class-transformer/decorators';
import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, ArrayMaxSize, IsArray, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';
import { RelationType } from '../relation_type.enum';

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
export class UpdateRelationInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  relation_id?: number;
  
  @IsNotEmpty()
  @IsEnum(RelationType)
  @Field(() => String)
  relation_type?: RelationType; 
   
}
