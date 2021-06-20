import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()  @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  sku: string; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  supplier_sku: string; 
  
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  product_category_id?: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  product_name: string; 


  @IsOptional()
  @IsNumber()
  @Field(() => Float,{ nullable: true })
  msrp: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  price_currency: string;
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true }) 
  currency_symbole: string;
  
  @IsOptional()
  @IsString()
  @Field({ nullable: true }) 
  unit_title: string;
  
  @IsOptional()
  @IsNumber()
  @Field(() => Float,{ nullable: true })
  unit_weight: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true }) 
  unit_weight_title: string;
  
  
  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true }) 
  is_discount: boolean;
  
  @IsOptional()
  @IsNumber()
  @Field(() => Float,{ nullable: true })
  discount: number;
  
  @IsOptional()
  @IsNumber()
  @Field(() => Int,{ nullable: true })
  ranking: number;
  
  @IsOptional()
  @IsNumber()
  @Field(() => Int,{ nullable: true })
  reorder_level: number;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true }) 
  is_active: boolean;

  // TODO: tags: [ Tag ] 
  @IsOptional()
  @IsArray()
  @Field(() => [Int], {nullable: true})
  tag_ids: number[];

}
