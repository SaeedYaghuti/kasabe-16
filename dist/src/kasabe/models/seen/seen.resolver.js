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
const seen_service_1 = require("./seen.service");
const create_seen_input_1 = require("./dto/create_seen.input");
const update_seen_input_1 = require("./dto/update_seen.input");
const seen_entity_1 = require("./seen.entity");
const message_type_1 = require("../../../util/type/message.type");
let SeenResolver = class SeenResolver {
    constructor(seenService) {
        this.seenService = seenService;
    }
    async seenTestQuery(message) {
        console.log('seenTestQuery is running...');
        return await this.seenService.testQuery(message);
    }
    async seenTestMutation(message) {
        return await this.seenService.testQuery(message);
    }
    async build(seen) {
        console.log('mutation build() is running...');
        return await this.seenService.build(seen);
    }
    async rebuild(seen) {
        console.log('mutation rebuild() is running...');
        return await this.seenService.rebuild(seen);
    }
    async fetchById(rId) {
        return await this.seenService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeenResolver.prototype, "seenTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SeenResolver.prototype, "seenTestMutation", null);
__decorate([
    graphql_1.Mutation(() => seen_entity_1.Seen),
    __param(0, graphql_1.Args('seen')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_seen_input_1.BuildSeenInput]),
    __metadata("design:returntype", Promise)
], SeenResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => seen_entity_1.Seen),
    __param(0, graphql_1.Args('seen')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_seen_input_1.UpdateSeenInput]),
    __metadata("design:returntype", Promise)
], SeenResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => seen_entity_1.Seen),
    __param(0, graphql_1.Args('seen_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SeenResolver.prototype, "fetchById", null);
SeenResolver = __decorate([
    graphql_1.Resolver('Seen'),
    __metadata("design:paramtypes", [seen_service_1.SeenService])
], SeenResolver);
exports.SeenResolver = SeenResolver;
//# sourceMappingURL=seen.resolver.js.map