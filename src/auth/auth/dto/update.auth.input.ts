import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';
import { AuthType } from '../auth_type.enum';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Auth)     @Field(() => Auth, {nullable: true})  
@Field(() => [Auth])   @Field(() => [Auth], {nullable: true})
`;
@InputType()
export class UpdateAuthInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id!: number; 

  @IsNotEmpty()
  @IsEnum(AuthType)
  @Field(() => String)
  auth_role!: AuthType; 

  @IsNotEmpty()
  @IsString()
  @Field()
  authname!: string; 
}
