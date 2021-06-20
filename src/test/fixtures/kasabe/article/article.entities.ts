import { Article } from "../../../../kasabe/models/article/article.entity";
import { ArticleType } from '../../../../kasabe/models/article/article_type.enum';

export const ArticleEntities: Partial<Article> [] = [
    {
        //* merchant
        // article_name: "Ibrahim Naghash",
        article_type: ArticleType.MERCHANT_PROFILE,
    },
    {
        //* post 1
        // article_name: "Node vs. Deno",
        article_type: ArticleType.POST,
    },
    {
        //* post 2
        // article_name: "Node vs. Deno",
        article_type: ArticleType.POST,
    },
    {
        //* comment
        // article_name: "Great painter",
        article_type: ArticleType.COMMENT,
    },
    {
        //* reply
        // article_name: "I agree",
        article_type: ArticleType.COMMENT, 
    },
    {
        //* rate
        // article_name: "I agree",
        article_type: ArticleType.RATE,
    },
    
]
