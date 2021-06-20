import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, IsDate } from 'class-validator';
export class ClientUpdateDto {
    // TEMPERORY !!!!!!!!!!!!!
    @IsNotEmpty()
    @IsInt()
    client_id!: number;

    @IsOptional()
    @IsString()
    client_socket_id?: string; 
    
    @IsOptional()
    @IsString()
    client_socket_authname?: string; 

    @IsOptional()
    @IsString()
    client_fname?: string; 
    
    @IsOptional()
    @IsString()
    client_lname?: string; 

    @IsOptional()
    @IsString()
    client_mname?: string; 
    
    @IsOptional()
    @IsEmail()
    email?: string; 

    // TODO: phone and mobile validation
    @IsOptional()
    @IsString()
    // @IsMobilePhone('oman')
    phone?: string; 

    // @IsOptional()
    // @IsString()
    // @MaxLength(20)
    // @MinLength(4)
    // TODO: Strong password checking
    // @Matches(//, {message: "password too weak"})
    // password?: string;

    @IsOptional()
    @IsDate()
    last_seen?: Date;
    
    @IsOptional()
    @IsDate()
    last_typed?: Date;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsBoolean()
    is_reported?: boolean;

    @IsOptional()
    @IsBoolean()
    is_blocked?: boolean;
    
    // @IsOptional()
    // @IsDate()
    // created_at?: Date;
    
    @IsOptional()
    @IsDate()
    updated_at?: Date;
}
