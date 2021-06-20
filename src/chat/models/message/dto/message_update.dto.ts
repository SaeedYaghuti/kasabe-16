import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches } from 'class-validator';
export class MessageUpdateDto {
    // TODO: sender-id should take from authorition
    @IsNotEmpty()
    @IsInt()
    sender_client_id!: number; 
    
    @IsNotEmpty()
    @IsInt()
    reciver_client_id!: number; 
    
    @IsNotEmpty()
    @IsInt()
    reciver_room_id!: number; 

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
