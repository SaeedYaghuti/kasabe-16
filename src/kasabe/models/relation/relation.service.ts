import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildRelationInput } from './dto/create_relation.input';
import { UpdateRelationInput } from './dto/update_relation.input';
import { Relation } from './relation.entity';
import { RelationRepository } from './relation.repository';

@Injectable()
export class RelationService {
    constructor(
        // Relation
        @InjectRepository(RelationRepository)
        private relationRepository: RelationRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Relation
    async build(relation: BuildRelationInput): Promise<Relation> {
        console.log('service build() is running');
        const gRelation = await this.relationRepository.build(relation);
        console.log('service build() db resutlt relation:> ');
        console.log(gRelation);
        return gRelation;
    }
    async rebuild(relation: UpdateRelationInput): Promise<Relation> {
        console.log('service rebuild() is running');
        const gRelation = await this.relationRepository.rebuild(relation);
        console.log('service rebuild() db resutlt relation:> ');
        console.log(gRelation);
        return gRelation;
    }
    async fetchById ( rId: number ): Promise<Relation> {
        console.log('service fetchById() is running');
        const fRelation = await this.relationRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fRelation:> ');
        console.log(fRelation);
        return fRelation;
    }
    //#endregion
 
}
