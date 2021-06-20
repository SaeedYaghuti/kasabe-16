import { MessageRepository } from './models/message/message.repository';
import { Client } from './models/client/client.entity';
import { Message } from './models/message/message.entity';
import { RoomRepository } from './models/room/room.repository';
import { RoomClientRepository } from './models/room_client/room_client.repository';
import { ClientUpdateDto } from './models/client/dto/client_update.dto';
import { RoomCreateDto } from './models/room/dto/room_create.dto';
import { RoomUpdateDto } from './models/room/dto/room_update.dto';
import { RoomClientUpdateDto } from './models/room_client/dto/room_client_update.dto';
import { ClientRepository } from './models/client/client.repository';
import { Room } from './models/room/room.entity';
import { MessageCreateDto } from './models/message/dto/message_create.dto';
import { RoomClient } from './models/room_client/room_client.entity';
import { ClientCreateInput } from './models/client/dto/client_create.input';
export declare class ChatService {
    private messageRepository;
    private room_clientRepository;
    private roomRepository;
    private clientRepository;
    constructor(messageRepository: MessageRepository, room_clientRepository: RoomClientRepository, roomRepository: RoomRepository, clientRepository: ClientRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    messageCreate(messageDto: MessageCreateDto, sender_client_id: number): Promise<Message>;
    messageGetById(rId: number): Promise<Message>;
    clientCreate(client: ClientCreateInput): Promise<Client>;
    clientUpdate(client: ClientUpdateDto): Promise<Client>;
    clientGetById(rId: number): Promise<Client>;
    clientsGetByRoomId(rId: number): Promise<Client[]>;
    roomCreate(room: RoomCreateDto): Promise<Room>;
    roomUpdate(room: RoomUpdateDto): Promise<Room>;
    roomGetById(rId: number): Promise<Room>;
    roomsGetByClientId(rId: number): Promise<Room[]>;
    room_clientUpdate(room_client: RoomClientUpdateDto): Promise<RoomClient>;
    room_clientGetById(rId: number): Promise<RoomClient>;
    room_clientsGetByClientId(rId: number): Promise<RoomClient[]>;
}
