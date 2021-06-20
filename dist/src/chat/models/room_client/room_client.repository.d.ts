import { Repository, DeleteResult } from 'typeorm';
import { RoomClientCreateDto, RoomClientCascadeDto } from './dto/room_client_create.dto';
import { RoomClient } from './room_client.entity';
import { Client } from '../client/client.entity';
import { RoomClientUpdateDto } from './dto/room_client_update.dto';
export declare class RoomClientRepository extends Repository<RoomClient> {
    private logger;
    room_clientCreate(rRC: RoomClientCreateDto): Promise<RoomClient>;
    roomClientCreateCascade(rRC: RoomClientCascadeDto): Promise<RoomClient>;
    roomClientCreateArray(rRCs: RoomClientCreateDto[]): Promise<RoomClient[]>;
    room_clientUpdate(rRoomClient: RoomClientUpdateDto): Promise<RoomClient>;
    clientsGetByRoomId(rId: number): Promise<Client[]>;
    room_clientsGetByClientId(clientId: number): Promise<RoomClient[]>;
    clientLeftRoom(client_id: number, room_id: number): Promise<DeleteResult>;
    room_clientGetById(rId: number): Promise<RoomClient>;
}
