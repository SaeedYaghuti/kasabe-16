import { BaseEntity } from 'typeorm';
import { Message } from '../message/message.entity';
import { RoomType } from './room_type.enum';
import { RoomCreateDto } from './dto/room_create.dto';
import { RoomClient } from '../room_client/room_client.entity';
export declare class Room extends BaseEntity {
    room_id: number;
    room_clients: RoomClient[];
    recived_messages: Message[];
    room_type: RoomType;
    title: string;
    status: string;
    profile_image_url: string;
    is_active: boolean;
    is_reported: boolean;
    is_blocked: boolean;
    created_at: Date;
    updated_at: Date;
    static of(rRoom: RoomCreateDto): Room;
    checkDataValidation(): Promise<void>;
}
