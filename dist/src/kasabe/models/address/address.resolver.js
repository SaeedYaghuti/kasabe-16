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
const address_service_1 = require("./address.service");
const create_address_input_1 = require("./dto/create_address.input");
const update_address_input_1 = require("./dto/update_address.input");
const address_entity_1 = require("./address.entity");
const message_type_1 = require("../../../util/type/message.type");
let AddressResolver = class AddressResolver {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async addressTestQuery(message) {
        console.log('addressTestQuery is running...');
        return await this.addressService.testQuery(message);
    }
    async addressTestMutation(message) {
        return await this.addressService.testQuery(message);
    }
    async build(address) {
        console.log('mutation build() is running...');
        const gAddress = await this.addressService.build(address);
        console.log('<resolver| gAddress>', gAddress);
        return gAddress;
    }
    async rebuild(address) {
        console.log('mutation rebuild() is running...');
        return await this.addressService.rebuild(address);
    }
    async fetchById(address_id) {
        return await this.addressService.fetchById(address_id);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressResolver.prototype, "addressTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AddressResolver.prototype, "addressTestMutation", null);
__decorate([
    graphql_1.Mutation(() => address_entity_1.Address),
    __param(0, graphql_1.Args('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_address_input_1.CreateAddressInput]),
    __metadata("design:returntype", Promise)
], AddressResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => address_entity_1.Address),
    __param(0, graphql_1.Args('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_address_input_1.UpdateAddressInput]),
    __metadata("design:returntype", Promise)
], AddressResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => address_entity_1.Address),
    __param(0, graphql_1.Args('address_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AddressResolver.prototype, "fetchById", null);
AddressResolver = __decorate([
    graphql_1.Resolver('Address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressResolver);
exports.AddressResolver = AddressResolver;
//# sourceMappingURL=address.resolver.js.map