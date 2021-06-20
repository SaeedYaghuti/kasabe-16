import { Room } from '../../../chat/models/room/room.entity';
import { RoomType } from '../../../chat/models/room/room_type.enum';

export const SampleRoomEntities: Partial<Room> [] = [
    {
        // room_id: 1,
        room_type: RoomType.GROUP,
        title: 'All Hassan',
        status: 'Hasan Legendery',
        profile_image_url: 'Hassan.jpg',
        is_active: true,
        is_reported: false,
        is_blocked: false,
        // created_at: 2020-09-27T05:38:58.122Z,
        created_at: new Date(),
        updated_at: new Date(),
        
    },
    {
        // room_id: 2,
        room_type: RoomType.CHANEL,
        title: 'Sahra bagh news',
        status: 'Fast and Relieble news',
        profile_image_url: 'sahra.jpg',
        is_active: true,
        is_reported: false,
        is_blocked: false,
        created_at: new Date(),
        updated_at: new Date(),
        
    }
]
