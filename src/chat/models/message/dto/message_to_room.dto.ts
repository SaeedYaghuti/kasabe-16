import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches } from 'class-validator';
export class MessagetoRoomDto {

    @IsNotEmpty()
    @IsInt()
    reciver_room_id?: number; 

    @IsOptional()
    @IsString()
    text?: string; 

    @IsOptional()
    @IsInt()
    msg_video_id?: number;  
    
    @IsOptional()
    @IsInt()
    msg_audio_id?: number;  
    
    @IsOptional()
    @IsInt()
    msg_photo_id?: number;  
    
    @IsOptional()
    @IsInt()
    msg_sticker_id?: number;  
}
