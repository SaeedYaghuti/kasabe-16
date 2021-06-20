import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

@Injectable()
export class ChatService {
    constructor(
        // Message
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,
        
        // RoomClient
        @InjectRepository(RoomClientRepository)
        private room_clientRepository: RoomClientRepository,

        // Room
        @InjectRepository(RoomRepository)
        private roomRepository: RoomRepository,
        
        // Client
        @InjectRepository(ClientRepository)
        private clientRepository: ClientRepository,

      ) {}

    async testQuery(message: string) {
        return await { message }
    }

    // #region Message
    async messageCreate(messageDto: MessageCreateDto, sender_client_id: number): Promise<Message> {
        // 🎯 TODO:  indtead of fake 1 we should get current client_id
        const gMessage = await this.messageRepository.messageCreate(messageDto, sender_client_id);
        // console.log('service messageCreate() db resutlt message:> ');
        // console.log(gMessage);
        return gMessage;
    }
    // temperory we don't have update
    // async messageUpdate(message: MessageUpdateDto): Promise<Message> {
    //     console.log('service messageUpdate() is running');
    //     const gMessage = await this.messageRepository.messageUpdate(message);
    //     console.log('service messageUpdate() db resutlt message:> ');
    //     console.log(gMessage);
    //     return gMessage;
    // }
    async messageGetById( rId: number ): Promise<Message> {
        console.log('service messageGetById() is running');
        const fMessage = await this.messageRepository.messageGetById(rId);
        console.log('service messageGetById() db resutlt fMessage:> ');
        console.log(fMessage);

        // const fctg1 = await this.productRepository.manager.getTreeRepository(Message).findTrees();
        // console.log(JSON.stringify(fctg1));

        return fMessage;
    }
    // #endregion

    //#region  Client
    async clientCreate(client: ClientCreateInput): Promise<Client> {
        console.log('service clientCreate() is running client:', client);
        const gClient = await this.clientRepository.clientCreate(client);
        console.log('service clientCreate() db resutlt client:> ');
        console.log(gClient);
        return gClient;
    }
    
    async clientUpdate(client: ClientUpdateDto): Promise<Client> {
        console.log('service clientUpdate() is running');
        const gClient = await this.clientRepository.clientUpdate(client);
        console.log('chat.service.ts> clientUpdate()> gClient recived ');
        return gClient;
    }
    async clientGetById( rId: number ): Promise<Client> {
        console.log('service clientGetById() is running');
        const fClient = await this.clientRepository.clientGetById(rId);
        console.log('service clientGetById() db resutlt fClient:> ');
        console.log(fClient);

        return fClient;
    }
    async clientsGetByRoomId( rId: number ): Promise<Client[]> {
        console.log('service clientsGetByRoomId() is running');
        const fClients = await this.clientRepository.clientsGetByRoomId(rId);
        console.log('service clientsGetByRoomId() db resutlt fClients:> ');
        console.log(fClients);

        return fClients;
    }
    //#endregion 
    
    //#region  Room
    async roomCreate(room: RoomCreateDto): Promise<Room> {
        console.log('service roomCreate() is running');
        const gRoom = await this.roomRepository.roomCreate(room);
        console.log('service roomCreate() bResult:> ');
        console.log(gRoom);
        return gRoom;
    }
    
    // async roomCreateSample(): Promise<Room[]> {
    //     console.log('service roomCreateSample() is running');
    //     const gRooms = await this.roomRepository.roomCreateSample();
    //     console.log('service roomCreateSample() bResult:> ');
    //     console.log(gRooms);
    //     return gRooms;
    // }
    
    async roomUpdate(room: RoomUpdateDto): Promise<Room> {
        console.log('service roomUpdate() is running');
        const gRoom = await this.roomRepository.roomUpdate(room);
        console.log('chat.service.ts> roomUpdate()> gRoom recived ');
        return gRoom;
    }
    async roomGetById( rId: number ): Promise<Room> {
        console.log('service roomGetById() is running');
        const fRoom = await this.roomRepository.roomGetById(rId);
        console.log('service roomGetById() db resutlt fRoom:> ');
        console.log(fRoom);

        return fRoom;
    }
    async roomsGetByClientId( rId: number ): Promise<Room[]> {
        console.log('service roomsGetByClientId() is running');
        const fRooms = await this.roomRepository.roomsGetByClientId(rId);
        console.log('service roomsGetByClientId() db resutlt fRooms:> ');
        console.log(fRooms);

        return fRooms;
    }
    //#endregion
    
    //#region  RoomClient💖
    // async room_clientCreate(room_client: RoomClientCreateDto): Promise<RoomClient[]> {
    //     console.log('service room_clientCreate() is running');
    //     const gRoomClients = await this.room_clientRepository.room_clientCreate(room_client);
    //     console.log('service room_clientCreate() bResult:> ');
    //     console.log(gRoomClients);
    //     return gRoomClients;
    // }
    
    async room_clientUpdate(room_client: RoomClientUpdateDto): Promise<RoomClient> {
        console.log('service room_clientUpdate() is running');
        const gRoomClient = await this.room_clientRepository.room_clientUpdate(room_client);
        console.log('chat.service.ts> room_clientUpdate()> gRoomClient recived ');
        return gRoomClient;
    }
    async room_clientGetById( rId: number ): Promise<RoomClient> {
        console.log('service room_clientGetById() is running');
        const fRoomClient = await this.room_clientRepository.room_clientGetById(rId);
        console.log('service room_clientGetById() db resutlt fRoomClient:> ');
        console.log(fRoomClient);

        return fRoomClient;
    }
    async room_clientsGetByClientId( rId: number ): Promise<RoomClient[]> {
        console.log('service room_clientsGetByClientId() is running');
        const fRoomClients = await this.room_clientRepository.room_clientsGetByClientId(rId);
        console.log('service room_clientsGetByClientId() db resutlt fRoomClients:> ');
        console.log(fRoomClients);

        return fRoomClients;
    }
    //#endregion 

    //#region init DB
    // async initDB(initDB: InitDbDto) {
    //     // step 1: Create Client
    //     let clients: Client[];
    //     if ( initDB.clients ) {
    //         clients = await this.clientCreateSample(); // create 4 new client
    //         console.log('Sample clients:> ');
    //         console.table(clients);
    //     }
        
    //     // step 2: Create Room
    //     let rooms: Room[];
    //     if ( initDB.rooms ) {
    //         rooms = await this.roomCreateSample(); // create 2 new rooms
    //         console.log('Sample rooms:> ');
    //         console.table(rooms);
    //     }
        
    //     // step 3: Create Room_Client
    //     let room_clients: RoomClient[];
    //     if ( initDB.room_clients ) {
    //         room_clients = await this.room_clientCreateSample(); // add client to room
    //         console.log('Sample room_clients:> ');
    //         console.table(room_clients);
    //     }
    
    //     return { clients, rooms, room_clients };

    // }
    //#endregion
    
}
