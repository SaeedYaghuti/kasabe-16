import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginAuthInput {
  
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  authname: string;

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
}
