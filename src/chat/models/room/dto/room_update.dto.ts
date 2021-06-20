import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, IsDate } from 'class-validator';
import { RoomType } from '../room_type.enum';
export class RoomUpdateDto {
    @IsNotEmpty()
    @IsInt()
    room_id: number;

    // TODO: we should accept client's Object or id 

    @IsOptional()
    @IsEnum(RoomType)
    room_type?: RoomType;

    @IsOptional()
    @IsString()
    title?: string;
    
    @IsOptional()
    @IsString()
    status?: string;
    
    @IsOptional()
    @IsString()
    profile_image_url?: string;

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
