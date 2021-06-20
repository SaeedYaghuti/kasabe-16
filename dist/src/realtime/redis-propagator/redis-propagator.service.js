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
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const redis_service_1 = require("../redis/redis.service");
const socket_state_service_1 = require("../socket-state/socket-state.service");
const redis_propagator_constants_1 = require("./redis-propagator.constants");
const chat_service_1 = require("../../chat/chat.service");
let RedisPropagatorService = class RedisPropagatorService {
    constructor(socketStateService, redisService) {
        this.socketStateService = socketStateService;
        this.redisService = redisService;
        this.logger = new common_1.Logger('RedisPropagatorService');
        this.consumeSendEventtoAuth = (eventInfo) => {
            this.logger.log(`[APP_FLOW: 14 (Auth) ] - consumeSendEventtoAuth() recived data> ${JSON.stringify(eventInfo)}`);
            const { authId, event, data, excludedSocketId } = eventInfo;
            return this.socketStateService
                .getAuthSockets(authId)
                .filter((socket) => socket.id !== excludedSocketId)
                .forEach((socket) => socket.emit(event, data));
        };
        this.consumeSendEventtoGroup = (eventInfo) => {
            this.logger.log(`[APP_FLOW: 14 (Group) ] - consumeSendEventtoGroup() recived data> ${JSON.stringify(eventInfo)}`);
            const { type, event, data, reciverAuthsId, groupId, senderAuthId, senderSocketId } = eventInfo;
            return reciverAuthsId
                .flatMap(authId => this.socketStateService.getAuthSockets(authId))
                .filter(socket => socket.id !== senderSocketId)
                .forEach(socket => socket.emit(event, data));
        };
        this.consumeEmitClientStatus = async (eventInfo) => {
            this.logger.log(`[APP_FLOW: 14 (Status) ] - consumeSendClientStatustoSubscriber() data> ${JSON.stringify(eventInfo)}`);
            const { type, event, data, client_status, senderAuthId, senderSocketId } = eventInfo;
            const flowerIds = await this.redisService.getFollowers(senderAuthId);
            flowerIds
                .flatMap(flowerId => this.socketStateService.getAuthSockets(parseInt(flowerId)))
                .filter(socket => socket.id !== senderSocketId)
                .forEach(socket => {
                socket.emit(event, data);
            });
        };
        this.consumeWatchClientStatus = (eventInfo) => {
            this.logger.log(`[APP_FLOW: 14 (Watch) ] - consumeSendClientStatustoSubscriber() data> ${JSON.stringify(eventInfo)}`);
            const { type, event, data, followed_client_ids, emitted_at, senderAuthId, senderSocketId } = eventInfo;
            this.redisService.setFollowings(senderAuthId, followed_client_ids);
        };
        this.consumeEmitToAllEvent = (eventInfo) => {
            this.socketServer.emit(eventInfo.event, eventInfo.data);
        };
        this.consumeEmitToAuthenticatedEvent = (eventInfo) => {
            const { event, data } = eventInfo;
            return this.socketStateService
                .getAll()
                .forEach((socket) => socket.emit(event, data));
        };
        this.consumeSendEvent = (eventInfo) => {
            this.logger.log(`[APP_FLOW: 14 (Event) ] - consumeSendEvent() recived data> ${JSON.stringify(eventInfo)}`);
            const { authId, excludedSocketId, event, data } = eventInfo;
            return this.socketStateService
                .getAuthSockets(authId)
                .filter((socket) => socket.id !== excludedSocketId)
                .forEach((socket) => socket.emit(event, data));
        };
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_USER)
            .pipe(operators_1.tap(this.consumeSendEventtoAuth))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_GROUP)
            .pipe(operators_1.tap(this.consumeSendEventtoGroup))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS)
            .pipe(operators_1.tap(this.consumeEmitClientStatus))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS)
            .pipe(operators_1.tap(this.consumeWatchClientStatus))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_ALL)
            .pipe(operators_1.tap(this.consumeEmitToAllEvent))
            .subscribe();
        this.redisService
            .fromEvent(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED)
            .pipe(operators_1.tap(this.consumeEmitToAuthenticatedEvent))
            .subscribe();
    }
    injectSocketServer(server) {
        this.socketServer = server;
        return this;
    }
    publishEmittoAuth(eventInfo) {
        this.logger.log(`[APP_FLOW: 9 ] - publishEmittoAuth() argument eventInfo> ${JSON.stringify(eventInfo)}`);
        if (!eventInfo.authId) {
            return false;
        }
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_USER, eventInfo);
        return true;
    }
    publishEmittoGroup(eventInfo) {
        this.logger.log(`[APP_FLOW: 9 ] - publishEmittoGroup() argument eventInfo> ${JSON.stringify(eventInfo)}`);
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_GROUP, eventInfo);
        return true;
    }
    publishEmitClientStatus(eventInfo) {
        this.logger.log(`[APP_FLOW: 9 ] - publishEmitClientStatus() eventInfo> ${JSON.stringify(eventInfo)}`);
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_CLIENT_STATUS, eventInfo);
        return true;
    }
    publishWatchClientStatus(eventInfo) {
        this.logger.log(`[APP_FLOW: 9 ] - publishWatchClientStatus() eventInfo> ${JSON.stringify(eventInfo)}`);
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_WATCH_CLIENT_STATUS, eventInfo);
        return true;
    }
    propagateEvent(eventInfo) {
        this.logger.log(`[APP_FLOW: 9 ] - propagateEvent() argument eventInfo> ${JSON.stringify(eventInfo)}`);
        if (!eventInfo.authId) {
            return false;
        }
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_USER, eventInfo);
        return true;
    }
    emitToAuthenticated(eventInfo) {
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_AUTHENTICATED, eventInfo);
        return true;
    }
    emitToAll(eventInfo) {
        this.redisService.publish(redis_propagator_constants_1.REDIS_SOCKET_EVENT_EMIT_ALL, eventInfo);
        return true;
    }
};
RedisPropagatorService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [socket_state_service_1.SocketStateService,
        redis_service_1.RedisService])
], RedisPropagatorService);
exports.RedisPropagatorService = RedisPropagatorService;
//# sourceMappingURL=redis-propagator.service.js.map