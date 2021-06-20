import { BuildRelationInput } from './dto/create_relation.input';
import { UpdateRelationInput } from './dto/update_relation.input';
import { Relation } from './relation.entity';
import { RelationRepository } from './relation.repository';
export declare class RelationService {
    private relationRepository;
    constructor(relationRepository: RelationRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(relation: BuildRelationInput): Promise<Relation>;
    rebuild(relation: UpdateRelationInput): Promise<Relation>;
    fetchById(rId: number): Promise<Relation>;
}
