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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const client_role_enum_1 = require("../../client/client_role.enum");
const room_entity_1 = require("../../room/room.entity");
const client_entity_1 = require("../../client/client.entity");
class ClientRoleCreateDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ClientRoleCreateDto.prototype, "client_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(client_role_enum_1.ClientRole),
    __metadata("design:type", String)
], ClientRoleCreateDto.prototype, "client_role", void 0);
class RoomClientCreateDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RoomClientCreateDto.prototype, "room_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RoomClientCreateDto.prototype, "client_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(client_role_enum_1.ClientRole),
    __metadata("design:type", String)
], RoomClientCreateDto.prototype, "client_role", void 0);
exports.RoomClientCreateDto = RoomClientCreateDto;
class RoomClientCascadeDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", room_entity_1.Room)
], RoomClientCascadeDto.prototype, "room", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", client_entity_1.Client)
], RoomClientCascadeDto.prototype, "client", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(client_role_enum_1.ClientRole),
    __metadata("design:type", String)
], RoomClientCascadeDto.prototype, "client_role", void 0);
exports.RoomClientCascadeDto = RoomClientCascadeDto;
//# sourceMappingURL=room_client_create.dto.js.map