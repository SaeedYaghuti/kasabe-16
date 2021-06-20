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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_repository_1 = require("./article.repository");
let ArticleService = class ArticleService {
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(article) {
        console.log('service build() is running');
        const gArticle = await this.articleRepository.build(article);
        console.log('service build() db resutlt article:> ');
        console.log(gArticle);
        return gArticle;
    }
    async rebuild(article) {
        console.log('service rebuild() is running');
        const gArticle = await this.articleRepository.rebuild(article);
        console.log('service rebuild() db resutlt article:> ');
        console.log(gArticle);
        return gArticle;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fArticle = await this.articleRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fArticle:> ');
        console.log(fArticle);
        return fArticle;
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(article_repository_1.ArticleRepository)),
    __metadata("design:paramtypes", [article_repository_1.ArticleRepository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map