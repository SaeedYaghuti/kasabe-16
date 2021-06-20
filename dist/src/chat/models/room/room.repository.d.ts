import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { RoomCreateDto } from './dto/room_create.dto';
import { RoomUpdateDto } from './dto/room_update.dto';
import { Client } from '../client/client.entity';
export declare class RoomRepository extends Repository<Room> {
    private logger;
    roomCreate(rRoom: RoomCreateDto): Promise<Room>;
    roomGetById(rId: number): Promise<Room>;
    clientsGetByRoomId(rId: number): Promise<Client[]>;
    roomsGetByClientId(rId: number): Promise<Room[]>;
    roomUpdate(rRoom: RoomUpdateDto): Promise<Room>;
    roomUpdate0(rRoom: RoomUpdateDto): Promise<Room>;
}
