import { BaseEntity } from 'typeorm';
import { BuildArticleInput } from './dto/create_article.input';
import { ArticleType } from './article_type.enum';
import { Heart } from '../heart/heart.entity';
import { Comment } from '../comment/comment.entity';
import { Rate } from '../rate/rate.entity';
import { Post } from '../post/post.entity';
import { Seen } from '../seen/seen.entity';
export declare class Article extends BaseEntity {
    article_id: number;
    article_type: ArticleType;
    hearts: Heart[];
    seens: Seen[];
    article_post?: Post;
    posts?: Post[];
    article_comment?: Comment;
    comments?: Comment[];
    article_rate?: Rate;
    rates?: Rate[];
    static of(rArticle: BuildArticleInput): Article;
    checkDataValidation(): Promise<void>;
}
