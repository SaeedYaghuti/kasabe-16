"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_repository_1 = require("./models/message/message.repository");
const room_repository_1 = require("./models/room/room.repository");
const room_client_repository_1 = require("./models/room_client/room_client.repository");
const client_repository_1 = require("./models/client/client.repository");
let ChatService = class ChatService {
    constructor(messageRepository, room_clientRepository, roomRepository, clientRepository) {
        this.messageRepository = messageRepository;
        this.room_clientRepository = room_clientRepository;
        this.roomRepository = roomRepository;
        this.clientRepository = clientRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async messageCreate(messageDto, sender_client_id) {
        const gMessage = await this.messageRepository.messageCreate(messageDto, sender_client_id);
        return gMessage;
    }
    async messageGetById(rId) {
        console.log('service messageGetById() is running');
        const fMessage = await this.messageRepository.messageGetById(rId);
        console.log('service messageGetById() db resutlt fMessage:> ');
        console.log(fMessage);
        return fMessage;
    }
    async clientCreate(client) {
        console.log('service clientCreate() is running client:', client);
        const gClient = await this.clientRepository.clientCreate(client);
        console.log('service clientCreate() db resutlt client:> ');
        console.log(gClient);
        return gClient;
    }
    async clientUpdate(client) {
        console.log('service clientUpdate() is running');
        const gClient = await this.clientRepository.clientUpdate(client);
        console.log('chat.service.ts> clientUpdate()> gClient recived ');
        return gClient;
    }
    async clientGetById(rId) {
        console.log('service clientGetById() is running');
        const fClient = await this.clientRepository.clientGetById(rId);
        console.log('service clientGetById() db resutlt fClient:> ');
        console.log(fClient);
        return fClient;
    }
    async clientsGetByRoomId(rId) {
        console.log('service clientsGetByRoomId() is running');
        const fClients = await this.clientRepository.clientsGetByRoomId(rId);
        console.log('service clientsGetByRoomId() db resutlt fClients:> ');
        console.log(fClients);
        return fClients;
    }
    async roomCreate(room) {
        console.log('service roomCreate() is running');
        const gRoom = await this.roomRepository.roomCreate(room);
        console.log('service roomCreate() bResult:> ');
        console.log(gRoom);
        return gRoom;
    }
    async roomUpdate(room) {
        console.log('service roomUpdate() is running');
        const gRoom = await this.roomRepository.roomUpdate(room);
        console.log('chat.service.ts> roomUpdate()> gRoom recived ');
        return gRoom;
    }
    async roomGetById(rId) {
        console.log('service roomGetById() is running');
        const fRoom = await this.roomRepository.roomGetById(rId);
        console.log('service roomGetById() db resutlt fRoom:> ');
        console.log(fRoom);
        return fRoom;
    }
    async roomsGetByClientId(rId) {
        console.log('service roomsGetByClientId() is running');
        const fRooms = await this.roomRepository.roomsGetByClientId(rId);
        console.log('service roomsGetByClientId() db resutlt fRooms:> ');
        console.log(fRooms);
        return fRooms;
    }
    async room_clientUpdate(room_client) {
        console.log('service room_clientUpdate() is running');
        const gRoomClient = await this.room_clientRepository.room_clientUpdate(room_client);
        console.log('chat.service.ts> room_clientUpdate()> gRoomClient recived ');
        return gRoomClient;
    }
    async room_clientGetById(rId) {
        console.log('service room_clientGetById() is running');
        const fRoomClient = await this.room_clientRepository.room_clientGetById(rId);
        console.log('service room_clientGetById() db resutlt fRoomClient:> ');
        console.log(fRoomClient);
        return fRoomClient;
    }
    async room_clientsGetByClientId(rId) {
        console.log('service room_clientsGetByClientId() is running');
        const fRoomClients = await this.room_clientRepository.room_clientsGetByClientId(rId);
        console.log('service room_clientsGetByClientId() db resutlt fRoomClients:> ');
        console.log(fRoomClients);
        return fRoomClients;
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(message_repository_1.MessageRepository)),
    __param(1, typeorm_1.InjectRepository(room_client_repository_1.RoomClientRepository)),
    __param(2, typeorm_1.InjectRepository(room_repository_1.RoomRepository)),
    __param(3, typeorm_1.InjectRepository(client_repository_1.ClientRepository)),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        room_client_repository_1.RoomClientRepository,
        room_repository_1.RoomRepository,
        client_repository_1.ClientRepository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map