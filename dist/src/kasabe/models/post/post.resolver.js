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
const post_service_1 = require("./post.service");
const create_post_input_1 = require("./dto/create_post.input");
const update_post_input_1 = require("./dto/update_post.input");
const post_entity_1 = require("./post.entity");
const message_type_1 = require("../../../util/type/message.type");
let PostResolver = class PostResolver {
    constructor(postService) {
        this.postService = postService;
    }
    async postTestQuery(message) {
        console.log('postTestQuery is running...');
        return await this.postService.testQuery(message);
    }
    async postTestMutation(message) {
        return await this.postService.testQuery(message);
    }
    async build(post) {
        console.log('mutation build() is running...');
        return await this.postService.build(post);
    }
    async rebuild(post) {
        console.log('mutation rebuild() is running...');
        return await this.postService.rebuild(post);
    }
    async fetchById(rId) {
        return await this.postService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "postTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "postTestMutation", null);
__decorate([
    graphql_1.Mutation(() => post_entity_1.Post),
    __param(0, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_input_1.BuildPostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => post_entity_1.Post),
    __param(0, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_input_1.UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => post_entity_1.Post),
    __param(0, graphql_1.Args('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "fetchById", null);
PostResolver = __decorate([
    graphql_1.Resolver('Post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map