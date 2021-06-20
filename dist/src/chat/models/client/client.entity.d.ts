import { BaseEntity } from 'typeorm';
import { Message } from '../message/message.entity';
import { RoomClient } from '../room_client/room_client.entity';
import { ClientCreateInput } from './dto/client_create.input';
export declare class Client extends BaseEntity {
    client_id: number;
    room_clients: RoomClient[];
    client_fname: string;
    client_lname: string;
    client_mname?: string;
    phone: string;
    email: string;
    password: string;
    last_seen: Date;
    last_typed: Date;
    is_active: boolean;
    is_reported: boolean;
    is_blocked: boolean;
    created_at: Date;
    updated_at: Date;
    client_socket_id: string;
    client_socket_authname: string;
    sent_messages: Message[];
    recived_messages: Message[];
    static of(rClient: ClientCreateInput): Client;
    checkDataValidation(): Promise<void>;
}
