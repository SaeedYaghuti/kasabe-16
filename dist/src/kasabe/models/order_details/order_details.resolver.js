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
const order_details_service_1 = require("./order_details.service");
const message_type_1 = require("../../../util/type/message.type");
const create_order_details_input_1 = require("./dto/create_order_details.input");
const update_order_details_input_1 = require("./dto/update_order_details.input");
const order_details_entity_1 = require("./order_details.entity");
let OrderDetailsResolver = class OrderDetailsResolver {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }
    async orderDetailsTestQuery(message) {
        console.log('orderDetailsTestQuery is running...');
        return await this.orderDetailsService.testQuery(message);
    }
    async orderDetailsTestMutation(message) {
        return await this.orderDetailsService.testQuery(message);
    }
    async buildDetails(orderDetails) {
        console.log('mutation buildDetails() is running...');
        return await this.orderDetailsService.buildDetails(orderDetails);
    }
    async rebuildDetails(orderDetails) {
        console.log('mutation rebuildDetails() is running...');
        return await this.orderDetailsService.rebuildDetails(orderDetails);
    }
    async getOrderDetailsById(rId) {
        return await this.orderDetailsService.getOrderDetailsById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailsResolver.prototype, "orderDetailsTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderDetailsResolver.prototype, "orderDetailsTestMutation", null);
__decorate([
    graphql_1.Mutation(() => order_details_entity_1.OrderDetails),
    __param(0, graphql_1.Args('orderDetails')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_details_input_1.CreateOrderDetailsInput]),
    __metadata("design:returntype", Promise)
], OrderDetailsResolver.prototype, "buildDetails", null);
__decorate([
    graphql_1.Mutation(() => order_details_entity_1.OrderDetails),
    __param(0, graphql_1.Args('orderDetails')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_details_input_1.UpdateOrderDetailsInput]),
    __metadata("design:returntype", Promise)
], OrderDetailsResolver.prototype, "rebuildDetails", null);
__decorate([
    graphql_1.Query(() => order_details_entity_1.OrderDetails),
    __param(0, graphql_1.Args('orderDetails_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderDetailsResolver.prototype, "getOrderDetailsById", null);
OrderDetailsResolver = __decorate([
    graphql_1.Resolver('OrderDetails'),
    __metadata("design:paramtypes", [order_details_service_1.OrderDetailsService])
], OrderDetailsResolver);
exports.OrderDetailsResolver = OrderDetailsResolver;
//# sourceMappingURL=order_details.resolver.js.map