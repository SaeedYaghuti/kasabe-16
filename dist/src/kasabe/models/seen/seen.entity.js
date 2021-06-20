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
var Seen_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
const article_entity_1 = require("../article/article.entity");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Seen)  @Field(() => Seen, {nullable: true})  
@Field(() => [Seen])   @Field(() => [Seen], {nullable: true})
`;
let Seen = Seen_1 = class Seen extends typeorm_1.BaseEntity {
    static of(rSeen) {
        const nSeen = new Seen_1();
        Object.assign(nSeen, rSeen);
        return nSeen;
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
], Seen.prototype, "seen_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Seen.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Seen.prototype, "auth_id", void 0);
__decorate([
    type_graphql_1.Field(() => article_entity_1.Article, { nullable: true }),
    typeorm_1.ManyToOne(type => article_entity_1.Article, article => article.seens, {}),
    typeorm_1.JoinColumn({ name: 'article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Seen.prototype, "article", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Seen.prototype, "article_id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Seen.prototype, "created_at", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Seen.prototype, "checkDataValidation", null);
Seen = Seen_1 = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Seen);
exports.Seen = Seen;
//# sourceMappingURL=seen.entity.js.map