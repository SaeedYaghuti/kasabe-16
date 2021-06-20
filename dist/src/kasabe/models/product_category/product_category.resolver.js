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
const product_category_service_1 = require("./product_category.service");
const create_product_category_input_1 = require("./dto/create_product_category.input");
const update_product_category_input_1 = require("./dto/update_product_category.input");
const product_category_entity_1 = require("./product_category.entity");
const message_type_1 = require("../../../util/type/message.type");
let ProductCategoryResolver = class ProductCategoryResolver {
    constructor(productCategoryService) {
        this.productCategoryService = productCategoryService;
    }
    async productCategoryTestQuery(message) {
        console.log('productCategoryTestQuery is running...');
        return await this.productCategoryService.testQuery(message);
    }
    async productCategoryTestMutation(message) {
        return await this.productCategoryService.testQuery(message);
    }
    async build(productCategory) {
        console.log('mutation build() is running...');
        return await this.productCategoryService.build(productCategory);
    }
    async fetchById(productCategory_id) {
        return await this.productCategoryService.fetchById(productCategory_id);
    }
    async rebuild(productCategory) {
        console.log('mutation rebuild() is running...');
        return await this.productCategoryService.rebuild(productCategory);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoryResolver.prototype, "productCategoryTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoryResolver.prototype, "productCategoryTestMutation", null);
__decorate([
    graphql_1.Mutation(() => product_category_entity_1.ProductCategory),
    __param(0, graphql_1.Args('productCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_category_input_1.CreateProductCategoryInput]),
    __metadata("design:returntype", Promise)
], ProductCategoryResolver.prototype, "build", null);
__decorate([
    graphql_1.Query(() => product_category_entity_1.ProductCategory),
    __param(0, graphql_1.Args('productCategory_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductCategoryResolver.prototype, "fetchById", null);
__decorate([
    graphql_1.Mutation(() => product_category_entity_1.ProductCategory),
    __param(0, graphql_1.Args('productCategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_category_input_1.UpdateProductCategoryInput]),
    __metadata("design:returntype", Promise)
], ProductCategoryResolver.prototype, "rebuild", null);
ProductCategoryResolver = __decorate([
    graphql_1.Resolver('ProductCategory'),
    __metadata("design:paramtypes", [product_category_service_1.ProductCategoryService])
], ProductCategoryResolver);
exports.ProductCategoryResolver = ProductCategoryResolver;
//# sourceMappingURL=product_category.resolver.js.map