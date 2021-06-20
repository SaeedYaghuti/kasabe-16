import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone } from 'class-validator';
import { Field, Float, ID, ObjectType, Int, InputType } from 'type-graphql';


`
@ObjectType()            @InputType()
@Field(() => ID)         @Field(() => ID,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
@InputType()
export class UpdateAddressInput {
    @IsNotEmpty()
    @IsInt()
    @Field(() => Int) 
    address_id!: number;   

    @IsNotEmpty()
    @IsString()
    @Field()
    address_title!: string; 
    
    @IsNotEmpty()
    @IsString()
    @Field()
    address_line1!: string; 

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    address_line2?: string; 
    
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    location?: string; 
    
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    postal_code?: string; 

    @IsNotEmpty()
    @IsString()
    @Field()
    city!: string; 
    
    @IsNotEmpty()
    @IsString()
    @Field()
    state!: string; 
    
    @IsNotEmpty()
    @IsString()
    @Field()
    country!: string; 

    @IsOptional()
    @IsEmail()
    @Field({ nullable: true })
    email?: string; 

    // TODO: phone and mobile validation
    @IsNotEmpty()
    // @IsMobilePhone('oman')
    @Field()
    phone!: string; 

    // TODO: phone and mobile validation
    @IsOptional()
    // @IsPhoneNumber('oman')
    @Field({ nullable: true })
    fax?: string;
}
