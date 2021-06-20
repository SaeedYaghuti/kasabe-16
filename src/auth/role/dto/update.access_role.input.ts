import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';
import { AccessRole } from '../access_role.enum';

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
export class UpdateAccessRoleInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  auth_id!: number; 

  @IsNotEmpty()
  @IsEnum(AccessRole)
  @Field(() => String)
  auth_role!: AccessRole; 

  @IsNotEmpty()
  @IsString()
  @Field()
  authname!: string; 
}
