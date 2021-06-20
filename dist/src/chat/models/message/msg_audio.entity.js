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
const message_entity_1 = require("./message.entity");
let MsgAudio = class MsgAudio extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MsgAudio.prototype, "msg_audio_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => message_entity_1.Message, message => message.msg_audio, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'message_id' }),
    __metadata("design:type", message_entity_1.Message)
], MsgAudio.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], MsgAudio.prototype, "message_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MsgAudio.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], MsgAudio.prototype, "duration", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MsgAudio.prototype, "format", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], MsgAudio.prototype, "volume", void 0);
MsgAudio = __decorate([
    typeorm_1.Entity({ name: 'msg_audio' })
], MsgAudio);
exports.MsgAudio = MsgAudio;
//# sourceMappingURL=msg_audio.entity.js.map