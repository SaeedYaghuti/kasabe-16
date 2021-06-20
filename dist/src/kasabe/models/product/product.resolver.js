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
const product_service_1 = require("./product.service");
const create_product_input_1 = require("./dto/create_product.input");
const update_product_input_1 = require("./dto/update_product.input");
const product_entity_1 = require("./product.entity");
const message_type_1 = require("../../../util/type/message.type");
let ProductResolver = class ProductResolver {
    constructor(productService) {
        this.productService = productService;
    }
    async productTestQuery(message) {
        console.log('productTestQuery is running...');
        return await this.productService.testQuery(message);
    }
    async productTestMutation(message) {
        return await this.productService.testQuery(message);
    }
    async build(product) {
        console.log('mutation build() is running...');
        return await this.productService.build(product);
    }
    async rebuild(product) {
        console.log('mutation rebuild() is running...');
        return await this.productService.rebuild(product);
    }
    async fetchById(rId) {
        return await this.productService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "productTestMutation", null);
__decorate([
    graphql_1.Mutation(() => product_entity_1.Product),
    __param(0, graphql_1.Args('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_input_1.CreateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => product_entity_1.Product),
    __param(0, graphql_1.Args('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_input_1.UpdateProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => product_entity_1.Product),
    __param(0, graphql_1.Args('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "fetchById", null);
ProductResolver = __decorate([
    graphql_1.Resolver('Product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resolver.js.map