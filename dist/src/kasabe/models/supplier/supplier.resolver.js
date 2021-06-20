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
const supplier_service_1 = require("./supplier.service");
const create_supplier_input_1 = require("./dto/create_supplier.input");
const update_supplier_input_1 = require("./dto/update_supplier.input");
const supplier_entity_1 = require("./supplier.entity");
const message_type_1 = require("../../../util/type/message.type");
const common_1 = require("@nestjs/common");
const PONG_EVENT_NAME = 'pong';
let SupplierResolver = class SupplierResolver {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    async supplierTestQuery(message) {
        return await this.supplierService.testQuery(message);
    }
    async supplierTestMutation(message) {
        return await this.supplierService.testQuery(message);
    }
    async build(supplier) {
        console.log('mutation build() is running...');
        return await this.supplierService.build(supplier);
    }
    async rebuild(supplier) {
        console.log('mutation rebuild() is running...');
        return await this.supplierService.rebuild(supplier);
    }
    async fetchById(supplier_id) {
        const supplier = await this.supplierService.fetchById(supplier_id);
        if (!supplier)
            throw new common_1.BadRequestException(`There is no supplier with id ${supplier_id}`);
        return supplier;
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "supplierTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "supplierTestMutation", null);
__decorate([
    graphql_1.Mutation(() => supplier_entity_1.Supplier),
    __param(0, graphql_1.Args('supplier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_input_1.CreateSupplierInput]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => supplier_entity_1.Supplier),
    __param(0, graphql_1.Args('supplier')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_supplier_input_1.UpdateSupplierInput]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => supplier_entity_1.Supplier),
    __param(0, graphql_1.Args('supplier_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SupplierResolver.prototype, "fetchById", null);
SupplierResolver = __decorate([
    graphql_1.Resolver('Supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierResolver);
exports.SupplierResolver = SupplierResolver;
//# sourceMappingURL=supplier.resolver.js.map