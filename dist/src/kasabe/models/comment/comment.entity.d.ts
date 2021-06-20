import { BaseEntity } from 'typeorm';
import { BuildCommentInput } from './dto/create_comment.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Article } from '../article/article.entity';
export declare class Comment extends BaseEntity {
    comment_id: number;
    auth?: Auth;
    auth_id?: number;
    comment_article?: Article;
    comment_article_id?: number;
    audience_article?: Article;
    audience_article_id?: number;
    comment_text?: string;
    heart_count?: string;
    liked?: boolean;
    comment_count?: string;
    created_at: Date;
    updated_at: Date;
    static of(rComment: BuildCommentInput): Comment;
    checkDataValidation(): Promise<void>;
}
