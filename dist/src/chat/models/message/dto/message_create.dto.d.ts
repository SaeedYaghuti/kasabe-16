import { MessageRecipiant } from '../messag_recipiant.enum';
export declare class MessageCreateDto {
    to: MessageRecipiant;
    reciver_client_id?: number;
    reciver_room_id?: number;
    text?: string;
    msg_video_id?: number;
    msg_audio_id?: number;
    msg_photo_id?: number;
    msg_sticker_id?: number;
}
