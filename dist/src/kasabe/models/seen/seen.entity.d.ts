import { BaseEntity } from 'typeorm';
import { BuildSeenInput } from './dto/create_seen.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Article } from '../article/article.entity';
export declare class Seen extends BaseEntity {
    seen_id: number;
    auth?: Auth;
    auth_id?: number;
    article?: Article;
    article_id?: number;
    created_at: Date;
    static of(rSeen: BuildSeenInput): Seen;
    checkDataValidation(): Promise<void>;
}
