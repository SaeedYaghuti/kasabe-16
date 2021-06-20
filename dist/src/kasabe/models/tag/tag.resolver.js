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
const update_tag_input_1 = require("./dto/update_tag.input");
const tag_entity_1 = require("./tag.entity");
const tag_service_1 = require("./tag.service");
const message_type_1 = require("../../../util/type/message.type");
const create_tag_input_1 = require("./dto/create_tag.input");
const PONG_EVENT_NAME = 'pong';
let TagResolver = class TagResolver {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async tagTestQuery(message) {
        return await this.tagService.testQuery(message);
    }
    async tagTestMutation(message) {
        return await {
            message: message
        };
    }
    async build(tag) {
        const gTag = await this.tagService.build(tag);
        return gTag;
    }
    async rebuild(tag) {
        return await this.tagService.rebuild(tag);
    }
    async fetchById(tag_id) {
        return await this.tagService.fetchById(tag_id);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tagTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "tagTestMutation", null);
__decorate([
    graphql_1.Mutation(() => tag_entity_1.Tag),
    __param(0, graphql_1.Args('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_input_1.BuildTagInput]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => tag_entity_1.Tag),
    __param(0, graphql_1.Args('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_input_1.UpdateTagInput]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => tag_entity_1.Tag),
    __param(0, graphql_1.Args('tag_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TagResolver.prototype, "fetchById", null);
TagResolver = __decorate([
    graphql_1.Resolver('Tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagResolver);
exports.TagResolver = TagResolver;
//# sourceMappingURL=tag.resolver.js.map