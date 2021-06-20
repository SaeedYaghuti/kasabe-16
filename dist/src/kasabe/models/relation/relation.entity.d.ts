import { BaseEntity } from 'typeorm';
import { BuildRelationInput } from './dto/create_relation.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Merchant } from '../merchant/merchant.entity';
import { RelationType } from './relation_type.enum';
export declare class Relation extends BaseEntity {
    relation_id: number;
    auth?: Auth;
    auth_id?: number;
    merchant?: Merchant;
    merchant_id?: number;
    relation_type?: RelationType;
    created_at: Date;
    updated_at: Date;
    static of(rRelation: BuildRelationInput): Relation;
    checkDataValidation(): Promise<void>;
}
