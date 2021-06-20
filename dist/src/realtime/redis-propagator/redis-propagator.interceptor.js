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
const redis_propagator_service_1 = require("./redis-propagator.service");
let RedisPropagatorInterceptor = class RedisPropagatorInterceptor {
    constructor(redisPropagatorService) {
        this.redisPropagatorService = redisPropagatorService;
    }
    intercept(context, next) {
        const socket = context.switchToWs().getClient();
        return next.handle().pipe(operators_1.tap((data) => {
            var _a;
            this.redisPropagatorService.propagateEvent(Object.assign(Object.assign({}, data), { socketId: socket.id, authId: (_a = socket.auth) === null || _a === void 0 ? void 0 : _a.authId }));
        }));
    }
};
RedisPropagatorInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [redis_propagator_service_1.RedisPropagatorService])
], RedisPropagatorInterceptor);
exports.RedisPropagatorInterceptor = RedisPropagatorInterceptor;
//# sourceMappingURL=redis-propagator.interceptor.js.map