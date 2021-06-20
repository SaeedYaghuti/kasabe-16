import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, Min, Max, Length } from 'class-validator';
import { Client } from '../client.entity';
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
export class ClientCreateInput {
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    @Field() 
    client_fname!: string; 
    
    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    @Field() 
    client_lname!: string; 

    @IsOptional()
    @IsString()
    @Length(3, 30)
    @Field({ nullable: true })
    client_mname?: string; 
    
    @IsNotEmpty()
    @IsEmail()
    @Field() 
    email?: string; 

    // TODO: phone and mobile validation
    @IsNotEmpty()
    @IsString()
    // @IsMobilePhone('oman')
    @Field() 
    phone!: string; 

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @MinLength(4)
    // TODO: Strong password checking
    // @Matches(//, {message: "password too weak"})
    @Field() 
    password!: string;

    // ✅
    // 📱 => 💻: create ClientDto with all it's helper method from raw front_end data
    // recive: _
    // current-status: we have ready this than contains all data that is necessery to make new Entity to save in DB
    // return: an Entity that is ready to save in db
    // public toEntity(): Client {
    //     const nClient = new Client();
    //     nClient.client_fname = this.client_fname;
    //     nClient.client_mname = this.client_mname;
    //     nClient.client_lname = this.client_lname;
    //     nClient.email = this.email;
    //     nClient.phone = this.phone;

    //     // Password should treat diffrently
    //     nClient.password = this.password;

    //     // property should be defined by server
    //     nClient.last_seen = new Date();
    //     nClient.last_typed = new Date();
    //     nClient.is_active = true;
    //     nClient.is_reported = true;
    //     nClient.is_blocked = false;
    //     nClient.created_at = new Date();
    //     nClient.updated_at = new Date();
        
    //     return nClient;
    // }


}
