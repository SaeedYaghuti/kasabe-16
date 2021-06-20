import { ClientRole } from '../../../chat/models/client/client_role.enum';
import { RoomClientCreateDto } from '../../../chat/models/room_client/dto/room_client_create.dto';

export const SampleRoomClientDtos: RoomClientCreateDto[] = [
    
    { room_id: 1, client_id: 1, client_role: ClientRole.ADMIN },
    { room_id: 1, client_id: 2, client_role: ClientRole.ADMIN },
    { room_id: 1, client_id: 3, client_role: ClientRole.ADMIN },

    { room_id: 2, client_id: 2, client_role: ClientRole.ADMIN },
    { room_id: 2, client_id: 3, client_role: ClientRole.ADMIN },
    { room_id: 2, client_id: 4, client_role: ClientRole.READER },
        
];