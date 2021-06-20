import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsArray } from 'class-validator';
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
export class UpdateMerchantInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  merchant_id: number; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  merchant_title: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  tiny_description: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  long_description: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  contact_name: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  instagram_url: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  number_call: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  number_whatsapp: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  number_telegram: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  bank_card_number: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  bank_card_details: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  avatar_url: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  header_url: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  note: string; 
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  location: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  product_category_id?: number;

  // TODO: tags: [ Tag ] 
  @IsOptional()
  @IsArray()
  @Field(() => [Int], {nullable: true})
  tag_ids: number[];
  
  @IsOptional()
  @IsArray()
  @Field(() => [BuildTagInput], {nullable: true})
  tag_inputs: BuildTagInput[];

  
 
}
