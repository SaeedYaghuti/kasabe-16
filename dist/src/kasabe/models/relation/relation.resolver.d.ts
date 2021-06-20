import { RelationService } from './relation.service';
import { BuildRelationInput } from './dto/create_relation.input';
import { UpdateRelationInput } from './dto/update_relation.input';
import { Relation } from './relation.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class RelationResolver {
    private relationService;
    constructor(relationService: RelationService);
    relationTestQuery(message: string): Promise<MessageType>;
    relationTestMutation(message: string): Promise<MessageType>;
    build(relation: BuildRelationInput): Promise<Relation>;
    rebuild(relation: UpdateRelationInput): Promise<Relation>;
    fetchById(rId: number): Promise<Relation>;
}
