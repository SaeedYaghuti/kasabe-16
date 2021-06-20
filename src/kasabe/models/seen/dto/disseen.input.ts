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
export class DisseenInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  seen_id?: number;
   
}
