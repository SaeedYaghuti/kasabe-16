import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, MinLength, MaxLength } from 'class-validator';
import { AuthType } from '../auth_type.enum';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


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
export class CreateAuthInput {

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  authname!: string;

  @IsString()
  // @MinLength(6)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: `Password must contain at list:
  //               # 1 upper case letter
  //               # 1 lower case letter
  //               # 1 number or special character
  //           `,
  // })
  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  // There is no length validation (min, max) in this regex!
  // heart: 1!Aa123456
  @Field()
  password: string;

  @IsOptional()
  // @IsEnum(AuthRole)
  @Field(() => [AuthType])
  auth_type?: AuthType[]; 

}
