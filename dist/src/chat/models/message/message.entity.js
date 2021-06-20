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
var Message_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const msg_video_entity_1 = require("./msg_video.entity");
const msg_audio_entity_1 = require("./msg_audio.entity");
const msg_photo_entity_1 = require("./msg_photo.entity");
const msg_sticker_entity_1 = require("./msg_sticker.entity");
const client_entity_1 = require("../client/client.entity");
const room_entity_1 = require("../room/room.entity");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
let Message = Message_1 = class Message extends typeorm_1.BaseEntity {
    static of(params, sender_id) {
        const nMessage = new Message_1();
        Object.assign(nMessage, params);
        nMessage.sender_client_id = sender_id;
        nMessage.created_at = new Date();
        nMessage.updated_at = new Date();
        return nMessage;
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
], Message.prototype, "message_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Message.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], Message.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.ManyToOne(type => client_entity_1.Client, client => client.sent_messages, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'sender_client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Message.prototype, "sender_client", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Message.prototype, "sender_client_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => client_entity_1.Client, client => client.recived_messages, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'reciver_client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Message.prototype, "reciver_client", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "reciver_client_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => room_entity_1.Room, room => room.recived_messages, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'reciver_room_id' }),
    __metadata("design:type", room_entity_1.Room)
], Message.prototype, "reciver_room", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "reciver_room_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => msg_video_entity_1.MsgVideo, msgVideo => msgVideo.message, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'msg_video_id' }),
    __metadata("design:type", msg_video_entity_1.MsgVideo)
], Message.prototype, "msg_video", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "msg_video_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => msg_audio_entity_1.MsgAudio, msgAudio => msgAudio.message, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'msg_audio_id' }),
    __metadata("design:type", msg_audio_entity_1.MsgAudio)
], Message.prototype, "msg_audio", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "msg_audio_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => msg_photo_entity_1.MsgPhoto, msgPhoto => msgPhoto.message, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'msg_photo_id' }),
    __metadata("design:type", msg_photo_entity_1.MsgPhoto)
], Message.prototype, "msg_photo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "msg_photo_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => msg_sticker_entity_1.MsgSticker, msgSticker => msgSticker.message, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'msg_sticker_id' }),
    __metadata("design:type", msg_sticker_entity_1.MsgSticker)
], Message.prototype, "msg_sticker", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "msg_sticker_id", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Message.prototype, "checkDataValidation", null);
Message = Message_1 = __decorate([
    typeorm_1.Entity('message')
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map