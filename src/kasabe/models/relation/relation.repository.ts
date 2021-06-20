import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildRelationInput } from './dto/create_relation.input';
import { Relation } from './relation.entity';
import { UpdateRelationInput } from './dto/update_relation.input';
import { DisrelationInput } from './dto/disrelation.input';
import { RelationType } from './relation_type.enum';

@EntityRepository(Relation)
export class RelationRepository extends Repository<Relation> {
  private logger = new Logger('RelationRepository');

  async build( rRelation: BuildRelationInput ): Promise<Relation> {
    console.log('RelationRepository rRelation: ', rRelation);

    const nRelation = Relation.of(rRelation);
    
    nRelation.relation_type = RelationType.ACTIVE;

    const gRelation = await nRelation.save();

    return this.fetchById(gRelation.relation_id);

  }
  
  async disrelation( rRelation: DisrelationInput ): Promise<void> {
    console.log('RelationRepository rData: ', rRelation);

    const dResult = await Relation.delete(rRelation.relation_id);
    console.log('dResult: ', dResult);
    
  }

  async countMerchantRelation( rMerchantId: number ): Promise<number> {
    console.log('countMerchantRelation rRelation: ', rMerchantId);

    const count = await Relation.count({ where: { merchant_id: rMerchantId}});

    return count;

  }

  async didIRelation( rMerchantId: number, rAuthId ): Promise<boolean> {
    console.log('didIRelation rMerchantId: ', rMerchantId);

    const count = await Relation.count({ where: { merchant_id: rMerchantId, auth_id: rAuthId}});

    return count === 1;

  }

  //! access should be limited to owner
  async rebuild( rRelation: UpdateRelationInput ): Promise<Relation> {
    console.log('rebuild rRelation: ', rRelation);

    const tuRelation = await Relation.findOneOrFail({ where: { relation_id: rRelation.relation_id }});

    tuRelation.relation_type = rRelation.relation_type;

    const uRelation = await Relation.save(tuRelation);
    console.log('uRelation: ', uRelation);

    return uRelation;
  }
  
  
  async fetchById( rId: number ): Promise<Relation> {
    console.log('RelationRepository rId: ', rId);

    const fRelation = await Relation.findOne({ 
      relations: ["merchant", "auth"],
      where: { relation_id: rId },
    });

    console.log('<relation.repo| fetchById| fRelation>', fRelation);
    return fRelation;
  }


}

// export class RelationRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
