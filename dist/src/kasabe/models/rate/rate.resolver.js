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
const rate_service_1 = require("./rate.service");
const create_rate_input_1 = require("./dto/create_rate.input");
const update_rate_input_1 = require("./dto/update_rate.input");
const rate_entity_1 = require("./rate.entity");
const message_type_1 = require("../../../util/type/message.type");
let RateResolver = class RateResolver {
    constructor(rateService) {
        this.rateService = rateService;
    }
    async rateTestQuery(message) {
        console.log('rateTestQuery is running...');
        return await this.rateService.testQuery(message);
    }
    async rateTestMutation(message) {
        return await this.rateService.testQuery(message);
    }
    async build(rate) {
        console.log('mutation build() is running...');
        return await this.rateService.build(rate);
    }
    async rebuild(rate) {
        console.log('mutation rebuild() is running...');
        return await this.rateService.rebuild(rate);
    }
    async fetchById(rId) {
        return await this.rateService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "rateTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "rateTestMutation", null);
__decorate([
    graphql_1.Mutation(() => rate_entity_1.Rate),
    __param(0, graphql_1.Args('rate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rate_input_1.BuildRateInput]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => rate_entity_1.Rate),
    __param(0, graphql_1.Args('rate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_rate_input_1.UpdateRateInput]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => rate_entity_1.Rate),
    __param(0, graphql_1.Args('rate_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RateResolver.prototype, "fetchById", null);
RateResolver = __decorate([
    graphql_1.Resolver('Rate'),
    __metadata("design:paramtypes", [rate_service_1.RateService])
], RateResolver);
exports.RateResolver = RateResolver;
//# sourceMappingURL=rate.resolver.js.map