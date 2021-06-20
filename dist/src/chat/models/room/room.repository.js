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
const room_entity_1 = require("./room.entity");
const client_entity_1 = require("../client/client.entity");
let RoomRepository = class RoomRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('RoomRepository');
    }
    async roomCreate(rRoom) {
        const nRoom = room_entity_1.Room.of(rRoom);
        const gRoom = await nRoom.save();
        return gRoom;
    }
    async roomGetById(rId) {
        const fRoom = await room_entity_1.Room.findOne({ room_id: rId });
        return fRoom;
    }
    async clientsGetByRoomId(rId) {
        const fClients = await client_entity_1.Client.createQueryBuilder("client")
            .innerJoinAndSelect("client.room_clients", "room_client", "room_client.room_id = :roomId", { roomId: rId })
            .getMany();
        return fClients;
    }
    async roomsGetByClientId(rId) {
        const fRooms = await room_entity_1.Room.createQueryBuilder("room")
            .innerJoinAndSelect("room.room_clients", "room_client", "room_client.client_id = :clientId", { clientId: rId })
            .getMany();
        return fRooms;
    }
    async roomUpdate(rRoom) {
        delete rRoom.is_active;
        delete rRoom.is_blocked;
        delete rRoom.is_reported;
        delete rRoom.updated_at;
        const fRoom = await this.findOne(rRoom.room_id);
        if (!fRoom) {
            throw new common_1.BadRequestException('Invalid room_id');
        }
        let toUpdateRoom = Object.assign(fRoom, rRoom);
        await room_entity_1.Room.save(toUpdateRoom);
        const updatedRoom = await this.findOne(rRoom.room_id);
        return updatedRoom;
    }
    async roomUpdate0(rRoom) {
        console.log('roomUpdate => rData: ', rRoom);
        let fRoom;
        try {
            fRoom = await this.findOne(rRoom.room_id);
        }
        catch (error) {
            this.logger.error(`!> Failed to fetch room: ${JSON.stringify(rRoom)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch room',
                origin: '@room.repository.ts',
                room: rRoom,
                error: error.stack,
            });
        }
        let toUpdateRoom;
        try {
            toUpdateRoom = Object.assign(fRoom, rRoom);
            delete toUpdateRoom.created_at;
            delete toUpdateRoom.is_active;
            delete toUpdateRoom.is_blocked;
            delete toUpdateRoom.is_reported;
            delete toUpdateRoom.updated_at;
        }
        catch (error) {
            this.logger.error(`!> Failed to assign rRoom to toUpdateRoom>: ${JSON.stringify(toUpdateRoom)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to assign rRoom to toUpdateRoom',
                origin: '#room.repository.ts #roomUpdate()>',
                room: toUpdateRoom,
                error: error.stack,
            });
        }
        try {
            console.log('<<r.r.ts>> toUpdateRoom: ', toUpdateRoom);
            await room_entity_1.Room.save(toUpdateRoom);
            const updatedRoom = await this.findOne(rRoom.room_id);
            return updatedRoom;
        }
        catch (error) {
            this.logger.error(`!> Failed to update room: ${JSON.stringify(rRoom)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update room',
                origin: '#room.repository.ts #roomUpdate()',
                room: rRoom,
                error: error.stack,
            });
        }
    }
};
RoomRepository = __decorate([
    typeorm_1.EntityRepository(room_entity_1.Room)
], RoomRepository);
exports.RoomRepository = RoomRepository;
class RoomRepositoryFake {
    async roomCreate() { }
    async roomCreateSample() { }
    async roomUpdate() { }
    async roomGetById() { }
    async clientsGetByRoomId() { }
    async roomsGetByClientId() { }
}
//# sourceMappingURL=room.repository.js.map