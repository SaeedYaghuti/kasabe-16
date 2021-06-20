import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, IsDate } from 'class-validator';

export class ClientReadDto {
    @IsNotEmpty()
    @IsInt()
    client_id!: number;
     
    @IsNotEmpty()
    @IsString()
    client_fname!: string; 
    
    @IsNotEmpty()
    @IsString()
    client_lname!: string; 

    @IsOptional()
    @IsString()
    client_mname?: string; 
    
    @IsNotEmpty()
    @IsEmail()
    email?: string; 

    // TODO: phone and mobile validation
    @IsNotEmpty()
    @IsString()
    // @IsMobilePhone('oman')
    phone!: string; 

    // ❌
    // @IsNotEmpty()
    // @IsString()
    // @MaxLength(20)
    // @MinLength(4)
    // // TODO: Strong password checking
    // // @Matches(//, {message: "password too weak"})
    // password!: string;
    
    @IsNotEmpty()
    @IsDate()
    last_seen: Date;
    
    @IsNotEmpty()
    @IsDate()
    last_typed: Date;

    // ❌
    // @IsNotEmpty()
    // @IsBoolean()
    // is_active: boolean;

    // @IsOptional()
    // @IsBoolean()
    // is_reported: boolean;

    // @IsOptional()
    // @IsBoolean()
    // is_blocked: boolean;
    
    // @IsNotEmpty()
    // @IsDate()
    // created_at: Date;
    
    // @IsNotEmpty()
    // @IsDate()
    // updated_at: Date;


    //### Helper Method
    // ❌: not using
    // 📱 => 💻: create ClientDto with all it's helper method from raw front_end data
    // recive: raw data from front_end
    // return: new ClientDto with all it helper method 
    // public static from(dto: Partial<ClientReadDto>): ClientReadDto {
    //     const nClientDto = new ClientReadDto();
    //     // nClientDto.client_fname = dto.client_fname;
    //     // nClientDto.client_mname = dto.client_mname;
    //     // nClientDto.client_lname = dto.client_lname;
    //     // nClientDto.email = dto.email;
    //     // nClientDto.phone = dto.phone;
    //     // nClientDto.password = dto.password;
    //     Object.assign(nClientDto, dto);
    //     return nClientDto;
    // }
    
    
    
    // 💻 => 📱: filter db data and only send public data to front_end
    // recive: complete entity from db
    // return: a filtered db data that is ready to send to front_end
    // public static fromEntity(clientEntity: Client): ClientReadDto {
    //     const nClientReadDto = new ClientReadDto();

    //     Object.assign(nClientReadDto, clientEntity);
        
    //     // delete unWanted to show colunm to 📱
    //     // delete clientEntity.password;
    //     // delete clientEntity.updated_at;
    //     // delete clientEntity.created_at;
    //     // delete clientEntity.is_blocked;
    //     // delete clientEntity.is_reported;
    //     // delete clientEntity.is_active;

        

    //     return nClientReadDto;
    // }


}
