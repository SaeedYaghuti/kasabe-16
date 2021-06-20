import { BaseEntity } from 'typeorm';
import { ClientRole } from '../client/client_role.enum';
import { Client } from '../client/client.entity';
import { RoomClientCreateDto } from './dto/room_client_create.dto';
import { Room } from '../room/room.entity';
export declare class RoomClient extends BaseEntity {
    room_client_id: number;
    room: Room;
    room_id: number;
    client: Client;
    client_id: number;
    client_role: ClientRole;
    static of(rRoomClient: RoomClientCreateDto): RoomClient;
    checkDataValidation(): Promise<void>;
}
