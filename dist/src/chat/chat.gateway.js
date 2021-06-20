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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const chat_service_1 = require("./chat.service");
const propagator_interceptor_1 = require("../realtime/socket-state/propagator.interceptor");
const socket_state_service_1 = require("../realtime/socket-state/socket-state.service");
const class_transformer_validator_1 = require("class-transformer-validator");
const message_create_client_dto_1 = require("./models/message/dto/message_create_client.dto");
const validator_options_1 = require("../common/util/validator_options");
const emit_types_enum_1 = require("../realtime/redis-propagator/types/emit_types.enum");
const emit_feedback_type_1 = require("../realtime/redis-propagator/types/emit-feedback.type");
const emit_client_status_dto_1 = require("../realtime/redis-propagator/dto/emit-client-status.dto");
const request_client_status_dto_1 = require("../realtime/redis-propagator/dto/request-client-status.dto");
let ChatGateway = class ChatGateway {
    constructor(chatService, socketStateService) {
        this.chatService = chatService;
        this.socketStateService = socketStateService;
        this.logger = new common_2.Logger('ChatGateway');
    }
    afterInit(server) {
    }
    async handleConnection(socket, ...args) {
    }
    async handleDisconnect(socket) {
    }
    handleMessage(socket, [data, cb]) {
        cb('success', null);
        return {
            type: emit_types_enum_1.EnumEmitTypes.FEEDBACK,
            event: 'msgToClient',
            data: { message: "feedback of msgToServer", req: data }
        };
    }
    chatToServerHandler(socket, [rMessage, cb]) {
        this.logger.log(`[APP_FLOW: 6,7 ] - chatToServerHandler(); data> ${JSON.stringify(rMessage)}`);
        this.chatService.messageCreate(rMessage, socket.auth.authId)
            .then(message => {
            cb(message);
        })
            .catch(err => {
            cb(null, err.message);
        });
        return {
            type: emit_types_enum_1.EnumEmitTypes.FEEDBACK,
            event: 'msgToClient',
            data: {
                message: "your message delevered to server",
                req: rMessage,
            },
        };
    }
    async chattoOneHandler(socket, [rData, cb]) {
        this.logger.log(`[APP_FLOW: 6,7 ] - chattoOneHandler(); data> ${JSON.stringify(rData)}`);
        let vData;
        try {
            vData = await class_transformer_validator_1.transformAndValidate(message_create_client_dto_1.MessageCreateClientDto, rData, {
                validator: validator_options_1.validatorOptionsClient,
            });
        }
        catch (error) {
            const eventData = {
                sender: { authid: "Admin", socketid: "007" },
                reciver: { authid: socket.auth.authId, socketid: socket.id },
                message: "There was problem in message you sent!",
                createdAt: new Date(),
            };
            cb(null, error);
            return {
                type: emit_types_enum_1.EnumEmitTypes.FEEDBACK,
                event: 'msgToClient',
                data: {
                    message: eventData,
                    req: rData,
                },
                authId: socket.auth.authId,
                excludedSocketId: null,
            };
        }
        let eventData;
        this.chatService.messageCreate(vData, socket.auth.authId)
            .then(gMessage => {
            cb(gMessage);
            eventData = {
                sender: { authid: socket.auth.authId, socketid: socket.id },
                reciver: { authid: gMessage.reciver_client_id, socketid: '_' },
                message: gMessage,
                createdAt: gMessage.created_at,
            };
        })
            .catch(err => {
            cb(null, err);
        });
        return {
            type: emit_types_enum_1.EnumEmitTypes.USER,
            event: 'msgToClient',
            data: {
                message: "your message delevered to server",
                eventData,
                req: vData,
            },
            authId: vData.reciver_client_id,
            excludedSocketId: null,
        };
    }
    async chatToGroupHandler(socket, [rData, cb]) {
        this.logger.log(`[APP_FLOW: 6,7 ] - chatToGroup; data> ${JSON.stringify(rData)}`);
        let vData;
        let eventData;
        try {
            vData = await class_transformer_validator_1.transformAndValidate(message_create_client_dto_1.MessageCreateClientDto, rData, {
                validator: validator_options_1.validatorOptionsRoom,
            });
            eventData = {
                sender: { authid: socket.auth.authId, socketid: socket.id },
                reciver: { authid: vData.reciver_room_id, socketid: '_' },
                message: vData,
                createdAt: vData.created_at,
            };
        }
        catch (error) {
            cb(null, error);
            return;
        }
        this.chatService.messageCreate(vData, socket.auth.authId)
            .then(gMessage => {
        })
            .catch(err => {
            cb(null, err);
        });
        try {
            const reciverIds = [];
            const clients = await this.chatService.clientsGetByRoomId(vData.reciver_room_id);
            clients.forEach(client => {
                reciverIds.push(client.client_id);
            });
            cb(reciverIds);
            return {
                type: emit_types_enum_1.EnumEmitTypes.GROUP,
                event: 'msgToClient',
                data: eventData,
                groupId: vData.reciver_room_id,
                reciverAuthsId: reciverIds,
                senderAuthId: socket.auth.authId,
                senderSocketId: socket.id,
            };
        }
        catch (error) {
            this.logger.error('<logger-Ax3O> Error while clientsGetByRoomId() DB Error: ', error);
            cb(null, error);
        }
    }
    async onEmitClientStatus(socket, [rData, cb]) {
        this.logger.log(`[APP_FLOW: 6,7 ] - emitClientStatus; data> ${JSON.stringify(rData)}`);
        let vData;
        let result;
        try {
            result = await class_transformer_validator_1.transformAndValidate(emit_client_status_dto_1.EmitClientStatusDto, rData);
            if (Array.isArray(result)) {
                vData = result[0];
            }
            else {
                vData = result;
            }
        }
        catch (error) {
            return cb(null, error);
        }
        cb(`Your status: ${vData.status}...`);
        return {
            type: emit_types_enum_1.EnumEmitTypes.CLIENTSTATUS,
            event: 'msgToClient',
            data: vData,
            client_status: vData.status,
            senderAuthId: socket.auth.authId,
            senderSocketId: socket.id,
        };
    }
    async onWatchClientStatus(socket, [rData, cb]) {
        this.logger.log(`[APP_FLOW: 6,7 ] - onWatchClientStatus; data> ${JSON.stringify(rData)}`);
        let vData;
        let result;
        try {
            result = await class_transformer_validator_1.transformAndValidate(request_client_status_dto_1.WatchClientStatusDto, rData);
            if (Array.isArray(result)) {
                vData = result[0];
            }
            else {
                vData = result;
            }
        }
        catch (error) {
            return cb(null, error);
        }
        if (new Date().getTime() > vData.emitted_at + 2000 || vData.emitted_at > new Date().getTime()) {
            return cb(null, 'Invalid Timstamp or too past: vData.emitted_at: ' + vData.emitted_at);
        }
        cb(`You will be notified about your folowers client`);
        return {
            type: emit_types_enum_1.EnumEmitTypes.WATCHSTATUS,
            event: 'msgToClient',
            data: vData,
            emitted_at: vData.emitted_at,
            followed_client_ids: vData.followed_client_ids,
            senderAuthId: socket.auth.authId,
            senderSocketId: socket.id,
        };
    }
    async onIsOnline(socket, [rData, cb]) {
        try {
            rData = parseInt(rData);
        }
        catch (error) {
            cb('Invalid Timstamp, rData: ' + rData);
            return console.log(rData + ' is Invalid number');
        }
        if (typeof rData != "number" || (new Date().getTime() > rData + 60000)) {
            cb('Invalid Timstamp, rData: ' + rData);
            return console.log(rData + ' is Invalid number or Too late');
        }
        let nClient = {
            client_id: socket.auth.authId,
            last_seen: new Date(rData)
        };
        let uClient;
        try {
            uClient = await this.chatService.clientUpdate(nClient);
        }
        catch (error) {
            this.logger.error('!> Error while updating uClient at DB Error: ', error);
            cb(error);
            return false;
        }
        cb();
    }
    async onChat(socket, [message, cb]) {
        cb();
        socket.broadcast.emit('chat', message);
    }
    findAll1(socket, [data, cb]) {
        cb();
        return rxjs_1.from([44]).pipe(operators_1.map((item) => {
            return { event: 'msgToClient', data: { message: item } };
        }));
    }
};
__decorate([
    websockets_1.SubscribeMessage('msgToServer'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", emit_feedback_type_1.EmitFeedbackType)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('chatToServer'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", emit_feedback_type_1.EmitFeedbackType)
], ChatGateway.prototype, "chatToServerHandler", null);
__decorate([
    websockets_1.SubscribeMessage('chatToOne'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "chattoOneHandler", null);
__decorate([
    websockets_1.SubscribeMessage('chatToGroup'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "chatToGroupHandler", null);
__decorate([
    websockets_1.SubscribeMessage('emitClientStatus'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onEmitClientStatus", null);
__decorate([
    websockets_1.SubscribeMessage('watchClientStatus'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onWatchClientStatus", null);
__decorate([
    websockets_1.SubscribeMessage('isOnline'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onIsOnline", null);
__decorate([
    websockets_1.SubscribeMessage('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onChat", null);
__decorate([
    websockets_1.SubscribeMessage('test'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChatGateway.prototype, "findAll1", null);
ChatGateway = __decorate([
    common_1.UseInterceptors(propagator_interceptor_1.PropagatorInterceptor),
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        socket_state_service_1.SocketStateService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map