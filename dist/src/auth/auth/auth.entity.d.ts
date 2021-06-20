import { BaseEntity } from 'typeorm';
import { CreateAuthInput } from './dto/create.auth.input';
import { AuthType } from './auth_type.enum';
import { Heart } from '../../kasabe/models/heart/heart.entity';
import { Comment } from '../../kasabe/models/comment/comment.entity';
import { Rate } from '../../kasabe/models/rate/rate.entity';
import { Post } from '../../kasabe/models/post/post.entity';
import { Relation } from '../../kasabe/models/relation/relation.entity';
export declare class Auth extends BaseEntity {
    auth_id: number;
    authname: string;
    password: string;
    auth_type: AuthType;
    posts: Post[];
    comments: Comment[];
    rates: Rate[];
    hearts: Heart[];
    relations: Relation[];
    roles: AuthType[];
    salt: string;
    validatePassword(password: string): Promise<boolean>;
    static of(rAuth: CreateAuthInput): Auth;
    checkDataValidation(): Promise<void>;
}
