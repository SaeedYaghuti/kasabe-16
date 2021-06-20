import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { PersonRole } from '../person_role.enum';
import { Field, Float, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
@InputType()
export class UpdatePersonInput {
  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  person_id!: number; 

  @IsNotEmpty()
  @IsEnum(PersonRole)
  @Field(() => PersonRole)
  person_role!: PersonRole; 

  @IsNotEmpty()
  @IsString()
  @Field()
  person_name!: string; 
}
