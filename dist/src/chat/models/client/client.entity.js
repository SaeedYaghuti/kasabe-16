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
var Client_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("../message/message.entity");
const room_client_entity_1 = require("../room_client/room_client.entity");
let Client = Client_1 = class Client extends typeorm_1.BaseEntity {
    static of(rClient) {
        console.log('<<client.ent>> rClient: ', rClient);
        const nClient = new Client_1();
        Object.assign(nClient, rClient);
        nClient.last_seen = new Date();
        nClient.last_typed = new Date();
        nClient.is_active = true;
        nClient.is_reported = true;
        nClient.is_blocked = false;
        nClient.created_at = new Date();
        nClient.updated_at = new Date();
        return nClient;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<<checkDataValidation>> errors: ', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Client.prototype, "client_id", void 0);
__decorate([
    typeorm_1.OneToMany(type => room_client_entity_1.RoomClient, room_client => room_client.client),
    __metadata("design:type", Array)
], Client.prototype, "room_clients", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(3, 30),
    __metadata("design:type", String)
], Client.prototype, "client_fname", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(3, 30),
    __metadata("design:type", String)
], Client.prototype, "client_lname", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.Length(3, 30),
    __metadata("design:type", String)
], Client.prototype, "client_mname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.Length(8, 50),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Client.prototype, "last_seen", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Client.prototype, "last_typed", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Client.prototype, "is_active", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Client.prototype, "is_reported", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Client.prototype, "is_blocked", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Client.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Client.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "client_socket_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "client_socket_authname", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.sender_client, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "message_id", name: "message_id" }),
    __metadata("design:type", Array)
], Client.prototype, "sent_messages", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.sender_client, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "message_id", name: "message_id" }),
    __metadata("design:type", Array)
], Client.prototype, "recived_messages", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Client.prototype, "checkDataValidation", null);
Client = Client_1 = __decorate([
    typeorm_1.Entity("client")
], Client);
exports.Client = Client;
//# sourceMappingURL=client.entity.js.map