import { RoomType } from '../../../chat/models/room/room_type.enum';
import { RoomCreateDto } from '../../../chat/models/room/dto/room_create.dto';
export const SampleRoomDtos: RoomCreateDto[] = [
    {
        room_type: RoomType.GROUP,
        title: "All Hassan",
        status: "Hasan Legendery",
        profile_image_url: "Hassan.jpg",
    },
    {
        room_type: RoomType.CHANEL,
        title: "Sahra bagh news",
        status: "Fast and Relieble news",
        profile_image_url: "sahra.jpg",
    },
]