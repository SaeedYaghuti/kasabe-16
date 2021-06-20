import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()  @InputType()
@Field(() => Int)    @Field(() => Int,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;


@InputType()
export class CreateSupplierInput {
  @IsNotEmpty()
  @Field()
  @IsString()
  supplier_name: string; 

  @IsNotEmpty()
  @Field()
  @IsString()
  contact_name: string; 
  
  @IsNotEmpty()
  @Field()
  @IsString()
  contact_title: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  url: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  logo: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  note: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  our_id: string; 
}
