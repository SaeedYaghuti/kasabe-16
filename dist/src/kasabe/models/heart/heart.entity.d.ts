import { BaseEntity } from 'typeorm';
import { BuildHeartInput } from './dto/create_heart.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Article } from '../article/article.entity';
export declare class Heart extends BaseEntity {
    heart_id: number;
    auth?: Auth;
    auth_id?: number;
    article?: Article;
    article_id?: number;
    static of(rHeart: BuildHeartInput): Heart;
    checkDataValidation(): Promise<void>;
}
