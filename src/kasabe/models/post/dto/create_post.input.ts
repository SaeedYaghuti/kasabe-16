import { Type } from 'class-transformer/decorators';
import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, ArrayMaxSize, IsArray, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Post)     @Field(() => Post, {nullable: true})  
@Field(() => [Post])   @Field(() => [Post], {nullable: true})
`;
@InputType()
export class BuildPostInput {

  //$ temperory: must be fetched at server-side
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id!: number;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  merchant_id!: number;


  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Field()
  post_text?: string; 
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(10)
  @Type(() => String)
  @Field(() => [String] ,{ nullable: true })
  picture_urls?: string[]; 
}
