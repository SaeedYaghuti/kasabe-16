import { BaseEntity } from 'typeorm';
import { Message } from './message.entity';
export declare class MsgPhoto extends BaseEntity {
    msg_photo_id: number;
    message: Message;
    message_id: number;
    url: string;
    format: string;
    volume: number;
}
