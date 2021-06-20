import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Rate)     @Field(() => Rate, {nullable: true})  
@Field(() => [Rate])   @Field(() => [Rate], {nullable: true})
`;

// TODO: checking
@InputType()
export class UpdateRateInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  rate_id!: number; 

  // @IsNotEmpty()
  // @IsEnum(RateRole)
  // @Field(() => RateRole)
  // rate_role!: RateRole; 

  @IsNotEmpty()
  @IsString()
  @Field()
  rate_name!: string; 
}
