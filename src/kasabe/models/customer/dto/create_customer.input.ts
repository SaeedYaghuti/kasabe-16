import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, Int, ObjectType, InputType } from 'type-graphql';


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
export class CreateCustomerInput {
  @IsNotEmpty()
  @IsString()
  @Field() 
  customer_name!: string; 

  @IsNotEmpty()
  @IsString()
  @Field() 
  password!: string; 
  
  @IsOptional()
  @IsInt()
  @Field(() => Int,{ nullable: true })
  address_id?: number; 
}
