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
var Room_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("../message/message.entity");
const room_type_enum_1 = require("./room_type.enum");
const room_client_entity_1 = require("../room_client/room_client.entity");
let Room = Room_1 = class Room extends typeorm_1.BaseEntity {
    static of(rRoom) {
        const nRoom = new Room_1();
        Object.assign(nRoom, rRoom);
        nRoom.is_active = true;
        nRoom.is_reported = false;
        nRoom.is_blocked = false;
        nRoom.created_at = new Date();
        nRoom.updated_at = new Date();
        return nRoom;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Room.prototype, "room_id", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_client_entity_1.RoomClient, room_client => room_client.room),
    __metadata("design:type", Array)
], Room.prototype, "room_clients", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.reciver_room, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "message_id", name: "message_id" }),
    __metadata("design:type", Array)
], Room.prototype, "recived_messages", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: room_type_enum_1.RoomType }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(room_type_enum_1.RoomType),
    __metadata("design:type", String)
], Room.prototype, "room_type", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3),
    __metadata("design:type", String)
], Room.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3),
    __metadata("design:type", String)
], Room.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3),
    __metadata("design:type", String)
], Room.prototype, "profile_image_url", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Room.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Room.prototype, "is_reported", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Room.prototype, "is_blocked", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Room.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Room.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Room.prototype, "checkDataValidation", null);
Room = Room_1 = __decorate([
    typeorm_1.Entity({ name: 'room' })
], Room);
exports.Room = Room;
//# sourceMappingURL=room.entity.js.map