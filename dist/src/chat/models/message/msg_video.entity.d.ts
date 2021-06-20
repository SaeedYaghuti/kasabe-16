import { BaseEntity } from 'typeorm';
import { Message } from './message.entity';
export declare class MsgVideo extends BaseEntity {
    msg_video_id: number;
    message: Message;
    message_id: number;
    url: string;
    duration: number;
    format: string;
    volume: number;
}
