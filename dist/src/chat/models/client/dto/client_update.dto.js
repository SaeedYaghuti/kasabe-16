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
class ClientUpdateDto {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], ClientUpdateDto.prototype, "client_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "client_socket_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "client_socket_authname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "client_fname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "client_lname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "client_mname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ClientUpdateDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], ClientUpdateDto.prototype, "last_seen", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], ClientUpdateDto.prototype, "last_typed", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], ClientUpdateDto.prototype, "is_active", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], ClientUpdateDto.prototype, "is_reported", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], ClientUpdateDto.prototype, "is_blocked", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], ClientUpdateDto.prototype, "updated_at", void 0);
exports.ClientUpdateDto = ClientUpdateDto;
//# sourceMappingURL=client_update.dto.js.map