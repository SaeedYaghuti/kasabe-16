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
const common_1 = require("@nestjs/common");
const merchant_service_1 = require("./merchant.service");
const create_merchant_input_1 = require("./dto/create_merchant.input");
const update_merchant_input_1 = require("./dto/update_merchant.input");
const merchant_entity_1 = require("./merchant.entity");
const message_type_1 = require("../../../util/type/message.type");
let MerchantResolver = class MerchantResolver {
    constructor(merchantService) {
        this.merchantService = merchantService;
    }
    async merchantTestQuery(message) {
        console.log('merchantTestQuery is running...');
        return await this.merchantService.testQuery(message);
    }
    async merchantTestMutation(message) {
        return await this.merchantService.testQuery(message);
    }
    async build(merchant) {
        console.log('mutation build() is running...');
        return await this.merchantService.build(merchant);
    }
    async rebuild(merchant) {
        console.log('mutation rebuild() is running...');
        return await this.merchantService.rebuild(merchant);
    }
    async fetchById(merchant_id) {
        const merchant = await this.merchantService.fetchById(merchant_id);
        if (!merchant)
            throw new common_1.BadRequestException(`There is no merchant with id ${merchant_id}`);
        return merchant;
    }
};
__decorate([
    graphql_1.Query(type => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantResolver.prototype, "merchantTestQuery", null);
__decorate([
    graphql_1.Mutation(type => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantResolver.prototype, "merchantTestMutation", null);
__decorate([
    graphql_1.Mutation(type => merchant_entity_1.Merchant),
    __param(0, graphql_1.Args('merchant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchant_input_1.BuildMerchantInput]),
    __metadata("design:returntype", Promise)
], MerchantResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(type => merchant_entity_1.Merchant),
    __param(0, graphql_1.Args('merchant')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_merchant_input_1.UpdateMerchantInput]),
    __metadata("design:returntype", Promise)
], MerchantResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(type => merchant_entity_1.Merchant),
    __param(0, graphql_1.Args('merchant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MerchantResolver.prototype, "fetchById", null);
MerchantResolver = __decorate([
    graphql_1.Resolver('Merchant'),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService])
], MerchantResolver);
exports.MerchantResolver = MerchantResolver;
//# sourceMappingURL=merchant.resolver.js.map