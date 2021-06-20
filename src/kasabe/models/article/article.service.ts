import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildArticleInput } from './dto/create_article.input';
import { UpdateArticleInput } from './dto/update_article.input';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
    constructor(
        // Article
        @InjectRepository(ArticleRepository)
        private articleRepository: ArticleRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Article
    async build(article: BuildArticleInput): Promise<Article> {
        console.log('service build() is running');
        const gArticle = await this.articleRepository.build(article);
        console.log('service build() db resutlt article:> ');
        console.log(gArticle);
        return gArticle;
    }
    async rebuild(article: UpdateArticleInput): Promise<Article> {
        console.log('service rebuild() is running');
        const gArticle = await this.articleRepository.rebuild(article);
        console.log('service rebuild() db resutlt article:> ');
        console.log(gArticle);
        return gArticle;
    }
    async fetchById ( rId: number ): Promise<Article> {
        console.log('service fetchById() is running');
        const fArticle = await this.articleRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fArticle:> ');
        console.log(fArticle);
        return fArticle;
    }
    //#endregion
 
}
