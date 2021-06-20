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
const order_service_1 = require("./order.service");
const create_order_input_1 = require("./dto/create_order.input");
const update_order_input_1 = require("./dto/update_order.input");
const order_entity_1 = require("./order.entity");
const message_type_1 = require("../../../util/type/message.type");
let OrderResolver = class OrderResolver {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async orderTestQuery(message) {
        console.log('orderTestQuery is running...');
        return await this.orderService.testQuery(message);
    }
    async orderTestMutation(message) {
        return await this.orderService.testQuery(message);
    }
    async build(order) {
        console.log('<OrderResolver => build() is running...>');
        return await this.orderService.build(order);
    }
    async fetchById(rId) {
        return await this.orderService.fetchById(rId);
    }
    async rebuild(order) {
        console.log('mutation rebuild() is running...');
        return await this.orderService.rebuild(order);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orderTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orderTestMutation", null);
__decorate([
    graphql_1.Mutation(() => order_entity_1.Order),
    __param(0, graphql_1.Args('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "build", null);
__decorate([
    graphql_1.Query(() => order_entity_1.Order),
    __param(0, graphql_1.Args('order_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "fetchById", null);
__decorate([
    graphql_1.Mutation(() => order_entity_1.Order),
    __param(0, graphql_1.Args('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_input_1.UpdateOrderInput]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "rebuild", null);
OrderResolver = __decorate([
    graphql_1.Resolver('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.resolver.js.map