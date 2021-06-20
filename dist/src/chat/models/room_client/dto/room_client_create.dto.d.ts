import { ClientRole } from '../../client/client_role.enum';
import { Room } from '../../room/room.entity';
import { Client } from '../../client/client.entity';
export declare class RoomClientCreateDto {
    room_id: number;
    client_id: number;
    client_role: ClientRole;
}
export declare class RoomClientCascadeDto {
    room: Room;
    client: Client;
    client_role: ClientRole;
}
