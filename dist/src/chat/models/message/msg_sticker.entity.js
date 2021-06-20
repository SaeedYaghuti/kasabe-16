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
let MsgSticker = class MsgSticker extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MsgSticker.prototype, "msg_sticker_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => message_entity_1.Message, message => message.msg_sticker, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'message_id' }),
    __metadata("design:type", message_entity_1.Message)
], MsgSticker.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], MsgSticker.prototype, "message_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MsgSticker.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MsgSticker.prototype, "format", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], MsgSticker.prototype, "volume", void 0);
MsgSticker = __decorate([
    typeorm_1.Entity({ name: 'msg_sticker' })
], MsgSticker);
exports.MsgSticker = MsgSticker;
//# sourceMappingURL=msg_sticker.entity.js.map