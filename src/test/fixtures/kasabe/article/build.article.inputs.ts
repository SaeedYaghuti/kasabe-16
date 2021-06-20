// import { BuildArticleInput } from "../../../../kasabe/models/article/dto/create_article.input";
// import { ArticleRole } from '../../../../kasabe/models/article/article_role.enum';
import { BuildArticleInput } from "../../../../kasabe/models/article/dto/create_article.input";
import { ArticleType } from "../../../../kasabe/models/article/article_type.enum";


export const BuildArticleInputs: BuildArticleInput[] = [
    {
        //* merchant
        // article_name: "Ibrahim Naghash",
        article_type: ArticleType.MERCHANT_PROFILE,
    },
    {
        //* post
        // article_name: "White and Gold",
        article_type: ArticleType.POST,
    },
    {
        //* comment
        // article_name: "Great painter",
        article_type: ArticleType.COMMENT,
    },
    {
        //* comment
        // article_name: "Ibrahim did great painting for me",
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
