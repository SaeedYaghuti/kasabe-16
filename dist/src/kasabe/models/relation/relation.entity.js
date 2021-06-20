"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Relation_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
const merchant_entity_1 = require("../merchant/merchant.entity");
const relation_type_enum_1 = require("./relation_type.enum");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Relation)  @Field(() => Relation, {nullable: true})  
@Field(() => [Relation])   @Field(() => [Relation], {nullable: true})
`;
let Relation = Relation_1 = class Relation extends typeorm_1.BaseEntity {
    static of(rRelation) {
        const nRelation = new Relation_1();
        Object.assign(nRelation, rRelation);
        return nRelation;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<<checkDataValidation>> errors: ', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Relation.prototype, "relation_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Relation.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Relation.prototype, "auth_id", void 0);
__decorate([
    type_graphql_1.Field(() => merchant_entity_1.Merchant, { nullable: true }),
    typeorm_1.ManyToOne(type => merchant_entity_1.Merchant, merchant => merchant.relations, {}),
    typeorm_1.JoinColumn({ name: 'merchant_id' }),
    __metadata("design:type", merchant_entity_1.Merchant)
], Relation.prototype, "merchant", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Relation.prototype, "merchant_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(relation_type_enum_1.RelationType),
    type_graphql_1.Field(() => relation_type_enum_1.RelationType, { nullable: true }),
    __metadata("design:type", String)
], Relation.prototype, "relation_type", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Relation.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Relation.prototype, "updated_at", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Relation.prototype, "checkDataValidation", null);
Relation = Relation_1 = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity(),
    typeorm_2.Unique('UQ_RELATION', ["auth_id", "merchant_id"])
], Relation);
exports.Relation = Relation;
//# sourceMappingURL=relation.entity.js.map