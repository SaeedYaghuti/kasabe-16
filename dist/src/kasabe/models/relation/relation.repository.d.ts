import { Repository } from 'typeorm';
import { BuildRelationInput } from './dto/create_relation.input';
import { Relation } from './relation.entity';
import { UpdateRelationInput } from './dto/update_relation.input';
import { DisrelationInput } from './dto/disrelation.input';
export declare class RelationRepository extends Repository<Relation> {
    private logger;
    build(rRelation: BuildRelationInput): Promise<Relation>;
    disrelation(rRelation: DisrelationInput): Promise<void>;
    countMerchantRelation(rMerchantId: number): Promise<number>;
    didIRelation(rMerchantId: number, rAuthId: any): Promise<boolean>;
    rebuild(rRelation: UpdateRelationInput): Promise<Relation>;
    fetchById(rId: number): Promise<Relation>;
}
