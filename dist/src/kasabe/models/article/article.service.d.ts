import { BuildArticleInput } from './dto/create_article.input';
import { UpdateArticleInput } from './dto/update_article.input';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
export declare class ArticleService {
    private articleRepository;
    constructor(articleRepository: ArticleRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(article: BuildArticleInput): Promise<Article>;
    rebuild(article: UpdateArticleInput): Promise<Article>;
    fetchById(rId: number): Promise<Article>;
}
