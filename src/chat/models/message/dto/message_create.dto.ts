import { IsNotEmpty, IsOptional, IsInt, IsString, IsNumber, IsBoolean, IsEnum, IsEmail, IsPhoneNumber, IsMobilePhone, MaxLength, MinLength, Matches, ValidateIf } from 'class-validator';
import { MessageRecipiant } from '../messag_recipiant.enum';

export class MessageCreateDto {
    @IsNotEmpty()
    @IsEnum(MessageRecipiant)
    to!: MessageRecipiant;

    @ValidateIf(m => m.to === MessageRecipiant.Client)
    @IsNotEmpty()
    @IsInt()
    reciver_client_id?: number; 
    
    @ValidateIf(m => m.to === MessageRecipiant.Room)
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
