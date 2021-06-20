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
const customer_service_1 = require("./customer.service");
const create_customer_input_1 = require("./dto/create_customer.input");
const update_customer_input_1 = require("./dto/update_customer.input");
const customer_entity_1 = require("./customer.entity");
const message_type_1 = require("../../../util/type/message.type");
let CustomerResolver = class CustomerResolver {
    constructor(customerService) {
        this.customerService = customerService;
    }
    async customerTestQuery(message) {
        console.log('customerTestQuery is running...');
        return await this.customerService.testQuery(message);
    }
    async customerTestMutation(message) {
        return await this.customerService.testQuery(message);
    }
    async build(customer) {
        console.log('mutation build() is running...');
        return await this.customerService.build(customer);
    }
    async fetchById(rId) {
        return await this.customerService.fetchById(rId);
    }
    async rebuild(customer) {
        console.log('mutation rebuild() is running...');
        return await this.customerService.rebuild(customer);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "customerTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "customerTestMutation", null);
__decorate([
    graphql_1.Mutation(() => customer_entity_1.Customer),
    __param(0, graphql_1.Args('customer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "build", null);
__decorate([
    graphql_1.Query(() => customer_entity_1.Customer),
    __param(0, graphql_1.Args('customer_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "fetchById", null);
__decorate([
    graphql_1.Mutation(() => customer_entity_1.Customer),
    __param(0, graphql_1.Args('customer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_customer_input_1.UpdateCustomerInput]),
    __metadata("design:returntype", Promise)
], CustomerResolver.prototype, "rebuild", null);
CustomerResolver = __decorate([
    graphql_1.Resolver('Customer'),
    __metadata("design:paramtypes", [customer_service_1.CustomerService])
], CustomerResolver);
exports.CustomerResolver = CustomerResolver;
//# sourceMappingURL=customer.resolver.js.map