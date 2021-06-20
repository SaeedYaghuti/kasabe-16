import { RoomType } from '../room_type.enum';
export declare class RoomCreateDto {
    room_type: RoomType;
    title: string;
    status?: string;
    profile_image_url?: string;
}
