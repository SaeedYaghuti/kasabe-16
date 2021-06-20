import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, Max, Min, Length, MinLength } from 'class-validator';
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
export class BuildMerchantCategoryInput {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @Field()
  category_name!: string; 

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  @Field()
  category_description!: string; 

  @IsOptional()
  @IsInt()
  @Field(() => Int,{ nullable: true })
  parentId?: number; 

  @IsOptional()
  @IsInt()
  @Field(() => Int,{ nullable: true })
  flag_merchant_id?: number; 

  @IsOptional()
  @IsString()
  @MinLength(3)
  @Field({ nullable: true })
  picture_url?: string; 

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isActive?: boolean;
}
