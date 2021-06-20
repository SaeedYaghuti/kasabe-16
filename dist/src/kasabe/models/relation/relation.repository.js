"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const relation_entity_1 = require("./relation.entity");
const relation_type_enum_1 = require("./relation_type.enum");
let RelationRepository = class RelationRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('RelationRepository');
    }
    async build(rRelation) {
        console.log('RelationRepository rRelation: ', rRelation);
        const nRelation = relation_entity_1.Relation.of(rRelation);
        nRelation.relation_type = relation_type_enum_1.RelationType.ACTIVE;
        const gRelation = await nRelation.save();
        return this.fetchById(gRelation.relation_id);
    }
    async disrelation(rRelation) {
        console.log('RelationRepository rData: ', rRelation);
        const dResult = await relation_entity_1.Relation.delete(rRelation.relation_id);
        console.log('dResult: ', dResult);
    }
    async countMerchantRelation(rMerchantId) {
        console.log('countMerchantRelation rRelation: ', rMerchantId);
        const count = await relation_entity_1.Relation.count({ where: { merchant_id: rMerchantId } });
        return count;
    }
    async didIRelation(rMerchantId, rAuthId) {
        console.log('didIRelation rMerchantId: ', rMerchantId);
        const count = await relation_entity_1.Relation.count({ where: { merchant_id: rMerchantId, auth_id: rAuthId } });
        return count === 1;
    }
    async rebuild(rRelation) {
        console.log('rebuild rRelation: ', rRelation);
        const tuRelation = await relation_entity_1.Relation.findOneOrFail({ where: { relation_id: rRelation.relation_id } });
        tuRelation.relation_type = rRelation.relation_type;
        const uRelation = await relation_entity_1.Relation.save(tuRelation);
        console.log('uRelation: ', uRelation);
        return uRelation;
    }
    async fetchById(rId) {
        console.log('RelationRepository rId: ', rId);
        const fRelation = await relation_entity_1.Relation.findOne({
            relations: ["merchant", "auth"],
            where: { relation_id: rId },
        });
        console.log('<relation.repo| fetchById| fRelation>', fRelation);
        return fRelation;
    }
};
RelationRepository = __decorate([
    typeorm_1.EntityRepository(relation_entity_1.Relation)
], RelationRepository);
exports.RelationRepository = RelationRepository;
//# sourceMappingURL=relation.repository.js.map