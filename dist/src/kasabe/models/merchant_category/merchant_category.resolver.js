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
const merchant_category_service_1 = require("./merchant_category.service");
const create_merchant_category_input_1 = require("./dto/create_merchant_category.input");
const update_merchant_category_input_1 = require("./dto/update_merchant_category.input");
const merchant_category_entity_1 = require("./merchant_category.entity");
const message_type_1 = require("../../../util/type/message.type");
let MerchantCategoryResolver = class MerchantCategoryResolver {
    constructor(merchantCategoryService) {
        this.merchantCategoryService = merchantCategoryService;
    }
    async merchantCategoryTestQuery(message) {
        console.log('merchantCategoryTestQuery is running...');
        return await this.merchantCategoryService.testQuery(message);
    }
    async merchantCategoryTestMutation(message) {
        return await this.merchantCategoryService.testQuery(message);
    }
    async build(merchantCategory) {
        console.log('mutation build() is running...');
        return await this.merchantCategoryService.build(merchantCategory);
    }
    async fetchById(merchantCategory_id) {
        return await this.merchantCategoryService.fetchById(merchantCategory_id);
    }
    async rebuild(merchantCategory) {
        console.log('mutation rebuild() is running...');
        return await this.merchantCategoryService.rebuild(merchantCategory);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantCategoryResolver.prototype, "merchantCategoryTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantCategoryResolver.prototype, "merchantCategoryTestMutation", null);
__decorate([
    graphql_1.Mutation(() => merchant_category_entity_1.MerchantCategory),
    __param(0, graphql_1.Args('merchantCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merchant_category_input_1.BuildMerchantCategoryInput]),
    __metadata("design:returntype", Promise)
], MerchantCategoryResolver.prototype, "build", null);
__decorate([
    graphql_1.Query(() => merchant_category_entity_1.MerchantCategory),
    __param(0, graphql_1.Args('merchantCategory_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MerchantCategoryResolver.prototype, "fetchById", null);
__decorate([
    graphql_1.Mutation(() => merchant_category_entity_1.MerchantCategory),
    __param(0, graphql_1.Args('merchantCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_merchant_category_input_1.UpdateMerchantCategoryInput]),
    __metadata("design:returntype", Promise)
], MerchantCategoryResolver.prototype, "rebuild", null);
MerchantCategoryResolver = __decorate([
    graphql_1.Resolver('MerchantCategory'),
    __metadata("design:paramtypes", [merchant_category_service_1.MerchantCategoryService])
], MerchantCategoryResolver);
exports.MerchantCategoryResolver = MerchantCategoryResolver;
//# sourceMappingURL=merchant_category.resolver.js.map