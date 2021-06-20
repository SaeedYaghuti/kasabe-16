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
const heart_service_1 = require("./heart.service");
const create_heart_input_1 = require("./dto/create_heart.input");
const update_heart_input_1 = require("./dto/update_heart.input");
const heart_entity_1 = require("./heart.entity");
const message_type_1 = require("../../../util/type/message.type");
let HeartResolver = class HeartResolver {
    constructor(heartService) {
        this.heartService = heartService;
    }
    async heartTestQuery(message) {
        console.log('heartTestQuery is running...');
        return await this.heartService.testQuery(message);
    }
    async heartTestMutation(message) {
        return await this.heartService.testQuery(message);
    }
    async build(heart) {
        console.log('mutation build() is running...');
        return await this.heartService.build(heart);
    }
    async rebuild(heart) {
        console.log('mutation rebuild() is running...');
        return await this.heartService.rebuild(heart);
    }
    async fetchById(rId) {
        return await this.heartService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HeartResolver.prototype, "heartTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HeartResolver.prototype, "heartTestMutation", null);
__decorate([
    graphql_1.Mutation(() => heart_entity_1.Heart),
    __param(0, graphql_1.Args('heart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_heart_input_1.BuildHeartInput]),
    __metadata("design:returntype", Promise)
], HeartResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => heart_entity_1.Heart),
    __param(0, graphql_1.Args('heart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_heart_input_1.UpdateHeartInput]),
    __metadata("design:returntype", Promise)
], HeartResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => heart_entity_1.Heart),
    __param(0, graphql_1.Args('heart_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HeartResolver.prototype, "fetchById", null);
HeartResolver = __decorate([
    graphql_1.Resolver('Heart'),
    __metadata("design:paramtypes", [heart_service_1.HeartService])
], HeartResolver);
exports.HeartResolver = HeartResolver;
//# sourceMappingURL=heart.resolver.js.map