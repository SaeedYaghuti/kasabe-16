import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()  @InputType()
@Field(() => Int)    @Field(() => Int,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
@InputType()
export class UpdateProductCategoryInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  id!: number; 

  @IsOptional()
  @IsString()
  @Field()
  category_name?: string; 

  @IsOptional()
  @IsString()
  @Field()
  category_description?: string; 

  @IsOptional()
  @IsInt()
  @Field(() => Int,{ nullable: true })
  parentId?: number; 

  @IsOptional()
  @IsInt()
  @Field(() => Int,{ nullable: true })
  flag_product_id?: number; 

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  picture_url?: string; 

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isActive?: boolean;
}
