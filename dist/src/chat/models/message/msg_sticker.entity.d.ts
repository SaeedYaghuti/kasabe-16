import { BaseEntity } from 'typeorm';
import { Message } from './message.entity';
export declare class MsgSticker extends BaseEntity {
    msg_sticker_id: number;
    message: Message;
    message_id: number;
    url: string;
    format: string;
    volume: number;
}
