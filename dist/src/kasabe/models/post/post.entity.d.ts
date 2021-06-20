import { BaseEntity } from 'typeorm';
import { BuildPostInput } from './dto/create_post.input';
import { Article } from '../article/article.entity';
import { Auth } from '../../../auth/auth/auth.entity';
export declare class Post extends BaseEntity {
    post_id: number;
    auth?: Auth;
    auth_id?: number;
    post_article?: Article;
    post_article_id?: number;
    audience_article?: Article;
    audience_article_id?: number;
    post_text?: string;
    picture_urls?: string[];
    created_at: Date;
    updated_at: Date;
    heart_count?: string;
    liked?: boolean;
    static of(rPost: BuildPostInput): Post;
    checkDataValidation(): Promise<void>;
}
