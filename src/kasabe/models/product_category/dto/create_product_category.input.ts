import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()  @InputType()
@Field(() => ID)    @Field(() => ID,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
@InputType()
export class CreateProductCategoryInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  category_name!: string; 

  @IsNotEmpty()
  @IsString()
  @Field()
  category_description!: string; 

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
