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
var RoomClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const client_role_enum_1 = require("../client/client_role.enum");
const client_entity_1 = require("../client/client.entity");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const room_entity_1 = require("../room/room.entity");
let RoomClient = RoomClient_1 = class RoomClient extends typeorm_1.BaseEntity {
    static of(rRoomClient) {
        const nRoomClient = new RoomClient_1();
        nRoomClient.room_id = rRoomClient.room_id;
        nRoomClient.client_id = rRoomClient.client_id;
        nRoomClient.client_role = rRoomClient.client_role;
        return nRoomClient;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<<of>> errors: ', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoomClient.prototype, "room_client_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.Room, room => room.room_clients, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], RoomClient.prototype, "room", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], RoomClient.prototype, "room_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => client_entity_1.Client, client => client.room_clients, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], RoomClient.prototype, "client", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], RoomClient.prototype, "client_id", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: client_role_enum_1.ClientRole }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(client_role_enum_1.ClientRole),
    __metadata("design:type", String)
], RoomClient.prototype, "client_role", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomClient.prototype, "checkDataValidation", null);
RoomClient = RoomClient_1 = __decorate([
    typeorm_1.Entity({ name: 'room_client' }),
    typeorm_1.Unique('UQ_CLIENT_ROOM', ["client_id", "room_id"])
], RoomClient);
exports.RoomClient = RoomClient;
//# sourceMappingURL=room_client.entity.js.map