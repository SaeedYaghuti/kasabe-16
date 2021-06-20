"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const redis_propagator_module_1 = require("./redis-propagator/redis-propagator.module");
const redis_module_1 = require("./redis/redis.module");
const socket_state_module_1 = require("./socket-state/socket-state.module");
let RealtimeModule = class RealtimeModule {
};
RealtimeModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            redis_module_1.RedisModule,
            redis_propagator_module_1.RedisPropagatorModule,
            socket_state_module_1.SocketStateModule
        ],
        exports: [
            redis_module_1.RedisModule,
            redis_propagator_module_1.RedisPropagatorModule,
            socket_state_module_1.SocketStateModule
        ],
    })
], RealtimeModule);
exports.RealtimeModule = RealtimeModule;
//# sourceMappingURL=realtime.module.js.map