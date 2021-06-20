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
const comment_service_1 = require("./comment.service");
const create_comment_input_1 = require("./dto/create_comment.input");
const update_comment_input_1 = require("./dto/update_comment.input");
const comment_entity_1 = require("./comment.entity");
const message_type_1 = require("../../../util/type/message.type");
let CommentResolver = class CommentResolver {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async commentTestQuery(message) {
        console.log('commentTestQuery is running...');
        return await this.commentService.testQuery(message);
    }
    async commentTestMutation(message) {
        return await this.commentService.testQuery(message);
    }
    async build(comment) {
        console.log('mutation build() is running...');
        return await this.commentService.build(comment);
    }
    async rebuild(comment) {
        console.log('mutation rebuild() is running...');
        return await this.commentService.rebuild(comment);
    }
    async fetchById(rId) {
        return await this.commentService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "commentTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "commentTestMutation", null);
__decorate([
    graphql_1.Mutation(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_input_1.BuildCommentInput]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_input_1.UpdateCommentInput]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('comment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "fetchById", null);
CommentResolver = __decorate([
    graphql_1.Resolver('Comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map