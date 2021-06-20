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
const shipper_service_1 = require("./shipper.service");
const create_shipper_input_1 = require("./dto/create_shipper.input");
const update_shipper_input_1 = require("./dto/update_shipper.input");
const shipper_entity_1 = require("./shipper.entity");
const message_type_1 = require("../../../util/type/message.type");
let ShipperResolver = class ShipperResolver {
    constructor(shipperService) {
        this.shipperService = shipperService;
    }
    async shipperTestQuery(message) {
        console.log('shipperTestQuery is running...');
        return await this.shipperService.testQuery(message);
    }
    async shipperTestMutation(message) {
        return await this.shipperService.testQuery(message);
    }
    async build(shipper) {
        console.log('mutation build() is running...');
        return await this.shipperService.build(shipper);
    }
    async rebuild(shipper) {
        console.log('mutation rebuild() is running...');
        return await this.shipperService.rebuild(shipper);
    }
    async fetchById(shipper_id) {
        const shipper = await this.shipperService.fetchById(shipper_id);
        if (!shipper)
            throw new common_1.BadRequestException(`There is no shipper with id ${shipper_id}`);
        return shipper;
    }
};
__decorate([
    graphql_1.Query(type => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipperResolver.prototype, "shipperTestQuery", null);
__decorate([
    graphql_1.Mutation(type => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShipperResolver.prototype, "shipperTestMutation", null);
__decorate([
    graphql_1.Mutation(type => shipper_entity_1.Shipper),
    __param(0, graphql_1.Args('shipper')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipper_input_1.CreateShipperInput]),
    __metadata("design:returntype", Promise)
], ShipperResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(type => shipper_entity_1.Shipper),
    __param(0, graphql_1.Args('shipper')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_shipper_input_1.UpdateShipperInput]),
    __metadata("design:returntype", Promise)
], ShipperResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(type => shipper_entity_1.Shipper),
    __param(0, graphql_1.Args('shipper_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShipperResolver.prototype, "fetchById", null);
ShipperResolver = __decorate([
    graphql_1.Resolver('Shipper'),
    __metadata("design:paramtypes", [shipper_service_1.ShipperService])
], ShipperResolver);
exports.ShipperResolver = ShipperResolver;
//# sourceMappingURL=shipper.resolver.js.map