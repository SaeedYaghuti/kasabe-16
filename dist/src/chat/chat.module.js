"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const chat_resolver_1 = require("./chat.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const chat_gateway_1 = require("./chat.gateway");
const realtime_module_1 = require("../realtime/realtime.module");
const message_repository_1 = require("./models/message/message.repository");
const room_client_repository_1 = require("./models/room_client/room_client.repository");
const room_repository_1 = require("./models/room/room.repository");
const client_repository_1 = require("./models/client/client.repository");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                room_client_repository_1.RoomClientRepository,
                room_repository_1.RoomRepository,
                message_repository_1.MessageRepository,
                client_repository_1.ClientRepository,
            ]),
            realtime_module_1.RealtimeModule,
        ],
        providers: [
            {
                provide: 'PUB_SUB',
                useValue: new graphql_subscriptions_1.PubSub(),
            },
            chat_service_1.ChatService,
            chat_resolver_1.ChatResolver,
            chat_gateway_1.ChatGateway,
        ]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map