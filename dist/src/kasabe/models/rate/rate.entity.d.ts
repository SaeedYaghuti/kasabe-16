import { BaseEntity } from 'typeorm';
import { BuildRateInput } from './dto/create_rate.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Article } from '../article/article.entity';
export declare class Rate extends BaseEntity {
    rate_id: number;
    auth?: Auth;
    auth_id?: number;
    rate_article?: Article;
    rate_article_id?: number;
    audience_article?: Article;
    audience_article_id?: number;
    rate_text?: string;
    rate_stars?: number;
    heart_count?: string;
    liked?: boolean;
    created_at: Date;
    updated_at: Date;
    static of(rRate: BuildRateInput): Rate;
    checkDataValidation(): Promise<void>;
}
