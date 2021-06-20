import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsArray, MaxLength, MinLength } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';
import { BuildTagInput } from '../../tag/dto/create_tag.input';


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
export class BuildMerchantInput {

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id: number; 

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @Field()
  merchant_title: string; 
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Field()
  tiny_description: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field({ nullable: true })
  long_description: string; 

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Field()
  contact_name: string; 

  @IsOptional()
  @IsString()
  @MinLength(10)
  // @MaxLength(20)
  @Field({ nullable: true })
  instagram_url: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Field({ nullable: true })
  number_call: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Field({ nullable: true })
  number_whatsapp: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Field({ nullable: true })
  number_telegram: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @Field({ nullable: true })
  bank_card_number: string; 
  
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @Field({ nullable: true })
  bank_card_details: string; 

  @IsOptional()
  @IsString()
  // @MinLength(3)
  // @MaxLength(20)
  @Field({ nullable: true })
  avatar_url: string; 
  
  @IsOptional()
  @IsString()
  // @MinLength(3)
  // @MaxLength(20)
  @Field({ nullable: true })
  header_url: string; 

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(130)
  @Field({ nullable: true })
  note: string; 
  
  @IsNotEmpty()
  @IsString()
  // @MinLength(3)
  // @MaxLength(20)
  @Field({ nullable: true })
  location: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  merchant_category_id?: number;

  // TODO: tags: [ Tag ] 
  // @IsOptional()
  // @IsArray()
  // @Field(() => [Int], {nullable: true})
  // tag_ids: number[];
  
  // @IsOptional()
  // @IsArray()
  // @Field(() => [BuildTagInput], {nullable: true})
  // tag_inputs: BuildTagInput[];
  
  @IsOptional()
  @IsArray()
  @Field(() => [String], {nullable: true})
  tag_titles?: string[];

  

}
