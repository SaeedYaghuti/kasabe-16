import { Repository } from 'typeorm';
import { BuildArticleInput } from './dto/create_article.input';
import { Article } from './article.entity';
import { UpdateArticleInput } from './dto/update_article.input';
export declare class ArticleRepository extends Repository<Article> {
    private logger;
    build(rArticle: BuildArticleInput): Promise<Article>;
    rebuild(rArticle: UpdateArticleInput): Promise<Article>;
    fetchById(rId: number): Promise<Article>;
    fetch(): Promise<Article[]>;
}
