import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches } from 'class-validator';
import { RoomType } from '../room_type.enum';
export class RoomCreateDto {

    // TODO: we should accept client's Object or id 

    @IsNotEmpty()
    @IsEnum(RoomType)
    room_type: RoomType;

    @IsNotEmpty()
    @IsString()
    title!: string;
    
    @IsOptional()
    @IsString()
    status?: string;
    
    @IsOptional()
    @IsString()
    profile_image_url?: string;
}
