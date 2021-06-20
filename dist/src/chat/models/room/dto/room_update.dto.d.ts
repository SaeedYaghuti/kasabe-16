import { RoomType } from '../room_type.enum';
export declare class RoomUpdateDto {
    room_id: number;
    room_type?: RoomType;
    title?: string;
    status?: string;
    profile_image_url?: string;
    is_active?: boolean;
    is_reported?: boolean;
    is_blocked?: boolean;
    updated_at?: Date;
}
