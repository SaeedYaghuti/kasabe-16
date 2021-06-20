"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const article_entity_1 = require("./article.entity");
let ArticleRepository = class ArticleRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ArticleRepository');
    }
    async build(rArticle) {
        console.log('ArticleRepository rData: ', rArticle);
        const article_type = rArticle.article_type;
        const nArticle = new article_entity_1.Article();
        nArticle.article_type = article_type;
        try {
            const gArticle = await nArticle.save();
            console.log('gArticle: ', gArticle);
            return gArticle;
        }
        catch (error) {
            this.logger.error(`!> Failed to save article: ${JSON.stringify(rArticle)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save article',
                origin: '@article.repository.ts',
                article: rArticle,
            });
        }
    }
    async rebuild(rArticle) {
        console.log('ArticleRepository rData: ', rArticle);
        const nArticle = new article_entity_1.Article();
        nArticle.article_id = rArticle.article_id;
        nArticle.article_type = rArticle.article_type;
        try {
            await nArticle.save();
            const fArticle = await article_entity_1.Article.findOne(rArticle.article_id);
            console.log('fArticle: ', fArticle);
            return fArticle;
        }
        catch (error) {
            this.logger.error(`!> Failed to update article: ${JSON.stringify(rArticle)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update article',
                origin: '@article.repository.ts',
                article: rArticle,
            });
        }
    }
    async fetchById(rId) {
        console.log('ArticleRepository rId: ', rId);
        const fArticle = await article_entity_1.Article.findOne({
            relations: ["hearts", "comments"],
            where: { article_id: rId },
        });
        return fArticle;
    }
    async fetch() {
        const fArticle = await article_entity_1.Article.find({
            relations: ["hearts", "posts", "comments", "rates"],
        });
        return fArticle;
    }
};
ArticleRepository = __decorate([
    typeorm_1.EntityRepository(article_entity_1.Article)
], ArticleRepository);
exports.ArticleRepository = ArticleRepository;
//# sourceMappingURL=article.repository.js.map