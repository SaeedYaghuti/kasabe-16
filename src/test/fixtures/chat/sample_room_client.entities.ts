import { Room } from '../../../chat/models/room/room.entity';
import { RoomType } from '../../../chat/models/room/room_type.enum';
import { ClientRole } from '../../../chat/models/client/client_role.enum';
import { RoomClient } from '../../../chat/models/room_client/room_client.entity';

export const SampleRoomClientEntities: Partial<RoomClient> [] = [
    {
        // room_client_id: 1,
        room_id: 1,
        client_id: 1,
        client_role: ClientRole.ADMIN,
    },
    {
        // room_client_id: 2,
        room_id: 1,
        client_id: 2,
        client_role: ClientRole.ADMIN,
    },
    {
        // room_client_id: 3,
        room_id: 1,
        client_id: 3,
        client_role: ClientRole.ADMIN,
    },
    {
        // room_client_id: 4,
        room_id: 2,
        client_id: 2,
        client_role: ClientRole.READER,
    },
    {
        // room_client_id: 5,
        room_id: 2,
        client_id: 3,
        client_role: ClientRole.ADMIN,
    },
    {
        // room_client_id: 6,
        room_id: 2,
        client_id: 4,
        client_role: ClientRole.READER,
    },
    
    
    
]
