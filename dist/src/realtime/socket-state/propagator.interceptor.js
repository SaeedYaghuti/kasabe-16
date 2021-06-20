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
const redis_propagator_service_1 = require("../redis-propagator/redis-propagator.service");
const emit_types_enum_1 = require("../redis-propagator/types/emit_types.enum");
let PropagatorInterceptor = class PropagatorInterceptor {
    constructor(redisPropagatorService) {
        this.redisPropagatorService = redisPropagatorService;
        this.logger = new common_1.Logger('PropagatorInterceptor');
    }
    intercept(context, next) {
        const socket = context.switchToWs().getClient();
        this.logger.log(`[APP_FLOW: 5 ] - intercept(): registering action when retruned data from handler`);
        return next.handle().pipe(operators_1.tap(data => {
            var _a, _b;
            this.logger.log(`[APP_FLOW: 8 ] - next.handle().pipe(): data> ${JSON.stringify(data)} retruned from handler`);
            switch ((_a = data) === null || _a === void 0 ? void 0 : _a.type) {
                case emit_types_enum_1.EnumEmitTypes.FEEDBACK:
                    this.redisPropagatorService.publishEmittoAuth(Object.assign(Object.assign({}, data), { socketId: socket.id, authId: (_b = socket.auth) === null || _b === void 0 ? void 0 : _b.authId }));
                    break;
                case emit_types_enum_1.EnumEmitTypes.USER:
                    this.redisPropagatorService.publishEmittoAuth(Object.assign({}, data));
                    break;
                case emit_types_enum_1.EnumEmitTypes.GROUP:
                    this.redisPropagatorService.publishEmittoGroup(Object.assign({}, data));
                    break;
                case emit_types_enum_1.EnumEmitTypes.CLIENTSTATUS:
                    this.redisPropagatorService.publishEmitClientStatus(Object.assign({}, data));
                    break;
                case emit_types_enum_1.EnumEmitTypes.WATCHSTATUS:
                    this.redisPropagatorService.publishWatchClientStatus(Object.assign({}, data));
                    break;
                default:
                    break;
            }
        }));
    }
};
PropagatorInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [redis_propagator_service_1.RedisPropagatorService])
], PropagatorInterceptor);
exports.PropagatorInterceptor = PropagatorInterceptor;
//# sourceMappingURL=propagator.interceptor.js.map