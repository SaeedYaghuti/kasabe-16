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
const typeorm_1 = require("typeorm");
const client_role_enum_1 = require("./client_role.enum");
const client_entity_1 = require("./client.entity");
const room_entity_1 = require("../room/room.entity");
let ClientSubscriber = class ClientSubscriber extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ClientSubscriber.prototype, "client_subscriber_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => client_entity_1.Client, client => client.room_clients, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], ClientSubscriber.prototype, "client", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], ClientSubscriber.prototype, "client_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.Room, room => room.room_clients, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'room_id' }),
    __metadata("design:type", room_entity_1.Room)
], ClientSubscriber.prototype, "room", void 0);
__decorate([
    typeorm_1.Column("integer"),
    __metadata("design:type", Number)
], ClientSubscriber.prototype, "room_id", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: client_role_enum_1.ClientRole }),
    __metadata("design:type", String)
], ClientSubscriber.prototype, "client_role", void 0);
ClientSubscriber = __decorate([
    typeorm_1.Entity({ name: 'client_subscriber' })
], ClientSubscriber);
exports.ClientSubscriber = ClientSubscriber;
//# sourceMappingURL=client_subscriber.entity.js.map