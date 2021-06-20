"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const room_client_entity_1 = require("./room_client.entity");
const client_role_enum_1 = require("../client/client_role.enum");
const client_entity_1 = require("../client/client.entity");
let RoomClientRepository = class RoomClientRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('RoomClientRepository');
    }
    async room_clientCreate(rRC) {
        const nRoomClient = room_client_entity_1.RoomClient.of(rRC);
        const gRoomClient = await this.save(nRoomClient);
        return gRoomClient;
    }
    async roomClientCreateCascade(rRC) {
        const nRoomClient = new room_client_entity_1.RoomClient();
        nRoomClient.room = rRC.room;
        nRoomClient.client = rRC.client;
        nRoomClient.client_role = client_role_enum_1.ClientRole.ADMIN;
        const gRoomClient = await this.save(nRoomClient);
        return gRoomClient;
    }
    async roomClientCreateArray(rRCs) {
        const gRoomClients = [];
        for (const rRC of rRCs) {
            const nRoomClient = room_client_entity_1.RoomClient.of(rRC);
            try {
                const gRoomClient = await this.save(nRoomClient);
                gRoomClients.push(gRoomClient);
            }
            catch (error) {
                throw new common_1.BadRequestException({
                    message: '!> Failed to save room_client',
                    origin: '@room_client.repository.ts',
                    room_client: rRC,
                    error: error.message,
                });
            }
        }
        return gRoomClients;
    }
    async room_clientUpdate(rRoomClient) {
        let fRoom = await this.findOne(rRoomClient.room_client_id);
        fRoom.client_role = rRoomClient.client_role;
        const updatedRoom = await this.save(fRoom);
        return updatedRoom;
    }
    async clientsGetByRoomId(rId) {
        const fClients = await client_entity_1.Client.createQueryBuilder("client")
            .innerJoinAndSelect("client.room_clients", "room_client", "room_client.room_id = :room_clientId", { room_clientId: rId })
            .getMany();
        return fClients;
    }
    async room_clientsGetByClientId(clientId) {
        const fRooms = await this.find({ client_id: clientId });
        return fRooms;
    }
    async clientLeftRoom(client_id, room_id) {
        const deleteResult = await room_client_entity_1.RoomClient.delete({ room_id, client_id });
        return deleteResult;
    }
    async room_clientGetById(rId) {
        const fRoom = await room_client_entity_1.RoomClient.findOne(rId);
        return fRoom;
    }
};
RoomClientRepository = __decorate([
    typeorm_1.EntityRepository(room_client_entity_1.RoomClient)
], RoomClientRepository);
exports.RoomClientRepository = RoomClientRepository;
//# sourceMappingURL=room_client.repository.js.map