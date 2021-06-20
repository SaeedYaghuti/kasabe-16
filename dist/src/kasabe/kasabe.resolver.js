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
const graphql_1 = require("@nestjs/graphql");
const kasabe_service_1 = require("./kasabe.service");
const message_type_1 = require("../util/type/message.type");
const PONG_EVENT_NAME = 'pong';
let KasabeResolver = class KasabeResolver {
    constructor(kasabeService) {
        this.kasabeService = kasabeService;
    }
    async kasabeTestQuery(message) {
        return await this.kasabeService.testQuery(message);
    }
    async kasabeTestMutation(message) {
        return await {
            message: message
        };
    }
    async hello() {
        return 'hello';
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KasabeResolver.prototype, "kasabeTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KasabeResolver.prototype, "kasabeTestMutation", null);
__decorate([
    graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KasabeResolver.prototype, "hello", null);
KasabeResolver = __decorate([
    graphql_1.Resolver('Kasabe'),
    __metadata("design:paramtypes", [kasabe_service_1.KasabeService])
], KasabeResolver);
exports.KasabeResolver = KasabeResolver;
//# sourceMappingURL=kasabe.resolver.js.map