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
const relation_service_1 = require("./relation.service");
const create_relation_input_1 = require("./dto/create_relation.input");
const update_relation_input_1 = require("./dto/update_relation.input");
const relation_entity_1 = require("./relation.entity");
const message_type_1 = require("../../../util/type/message.type");
let RelationResolver = class RelationResolver {
    constructor(relationService) {
        this.relationService = relationService;
    }
    async relationTestQuery(message) {
        console.log('relationTestQuery is running...');
        return await this.relationService.testQuery(message);
    }
    async relationTestMutation(message) {
        return await this.relationService.testQuery(message);
    }
    async build(relation) {
        console.log('mutation build() is running...');
        return await this.relationService.build(relation);
    }
    async rebuild(relation) {
        console.log('mutation rebuild() is running...');
        return await this.relationService.rebuild(relation);
    }
    async fetchById(rId) {
        return await this.relationService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "relationTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "relationTestMutation", null);
__decorate([
    graphql_1.Mutation(() => relation_entity_1.Relation),
    __param(0, graphql_1.Args('relation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_relation_input_1.BuildRelationInput]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => relation_entity_1.Relation),
    __param(0, graphql_1.Args('relation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_relation_input_1.UpdateRelationInput]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => relation_entity_1.Relation),
    __param(0, graphql_1.Args('relation_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RelationResolver.prototype, "fetchById", null);
RelationResolver = __decorate([
    graphql_1.Resolver('Relation'),
    __metadata("design:paramtypes", [relation_service_1.RelationService])
], RelationResolver);
exports.RelationResolver = RelationResolver;
//# sourceMappingURL=relation.resolver.js.map