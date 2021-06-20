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
class MessageCreateClientDto {
}
__decorate([
    class_validator_1.IsNotEmpty({
        groups: ['Client']
    }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "reciver_client_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        groups: ['Room']
    }),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "reciver_room_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MessageCreateClientDto.prototype, "text", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "msg_video_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "msg_audio_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "msg_photo_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], MessageCreateClientDto.prototype, "msg_sticker_id", void 0);
exports.MessageCreateClientDto = MessageCreateClientDto;
//# sourceMappingURL=message_create_client.dto.js.map