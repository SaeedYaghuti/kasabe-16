import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => ID)         @Field(() => ID,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@InputType()
export class UpdateCustomerInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  customer_id!: number; 

  @IsNotEmpty()
  @IsString()
  @Field() 
  customer_name!: string; 

  @IsNotEmpty()
  @IsString()
  @Field() 
  password!: string; 
}
