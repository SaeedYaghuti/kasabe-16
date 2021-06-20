"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("./message.entity");
let MessageRepository = class MessageRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('MessageRepository');
    }
    async messageCreate(rMessage, sender_id) {
        const nMessage = message_entity_1.Message.of(rMessage, sender_id);
        const gMessage = await this.save(nMessage);
        const fMessage = await this.findOne({ message_id: gMessage.message_id });
        return fMessage;
    }
    async messageGetById(rId) {
        const fMessage = await message_entity_1.Message.findOne({ message_id: rId });
        return fMessage;
    }
};
MessageRepository = __decorate([
    typeorm_1.EntityRepository(message_entity_1.Message)
], MessageRepository);
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map