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
const article_service_1 = require("./article.service");
const create_article_input_1 = require("./dto/create_article.input");
const update_article_input_1 = require("./dto/update_article.input");
const article_entity_1 = require("./article.entity");
const message_type_1 = require("../../../util/type/message.type");
let ArticleResolver = class ArticleResolver {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async articleTestQuery(message) {
        console.log('articleTestQuery is running...');
        return await this.articleService.testQuery(message);
    }
    async articleTestMutation(message) {
        return await this.articleService.testQuery(message);
    }
    async build(article) {
        console.log('mutation build() is running...');
        return await this.articleService.build(article);
    }
    async rebuild(article) {
        console.log('mutation rebuild() is running...');
        return await this.articleService.rebuild(article);
    }
    async fetchById(rId) {
        return await this.articleService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "articleTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "articleTestMutation", null);
__decorate([
    graphql_1.Mutation(() => article_entity_1.Article),
    __param(0, graphql_1.Args('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_input_1.BuildArticleInput]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => article_entity_1.Article),
    __param(0, graphql_1.Args('article')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_article_input_1.UpdateArticleInput]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => article_entity_1.Article),
    __param(0, graphql_1.Args('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "fetchById", null);
ArticleResolver = __decorate([
    graphql_1.Resolver('Article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleResolver);
exports.ArticleResolver = ArticleResolver;
//# sourceMappingURL=article.resolver.js.map