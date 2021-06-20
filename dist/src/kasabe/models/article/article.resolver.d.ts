import { ArticleService } from './article.service';
import { BuildArticleInput } from './dto/create_article.input';
import { UpdateArticleInput } from './dto/update_article.input';
import { Article } from './article.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class ArticleResolver {
    private articleService;
    constructor(articleService: ArticleService);
    articleTestQuery(message: string): Promise<MessageType>;
    articleTestMutation(message: string): Promise<MessageType>;
    build(article: BuildArticleInput): Promise<Article>;
    rebuild(article: UpdateArticleInput): Promise<Article>;
    fetchById(rId: number): Promise<Article>;
}
