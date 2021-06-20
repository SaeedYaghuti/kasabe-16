import { BaseEntity } from 'typeorm';
import { ClientRole } from './client_role.enum';
import { Client } from './client.entity';
import { Room } from '../room/room.entity';
export declare class ClientSubscriber extends BaseEntity {
    client_subscriber_id: number;
    client: Client;
    client_id: number;
    room: Room;
    room_id: number;
    client_role: ClientRole;
}
