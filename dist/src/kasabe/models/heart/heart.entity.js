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
var Heart_1;
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

@Field(() => Heart)  @Field(() => Heart, {nullable: true})  
@Field(() => [Heart])   @Field(() => [Heart], {nullable: true})
`;
let Heart = Heart_1 = class Heart extends typeorm_1.BaseEntity {
    static of(rHeart) {
        const nHeart = new Heart_1();
        Object.assign(nHeart, rHeart);
        return nHeart;
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
], Heart.prototype, "heart_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Heart.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Heart.prototype, "auth_id", void 0);
__decorate([
    type_graphql_1.Field(() => article_entity_1.Article, { nullable: true }),
    typeorm_1.ManyToOne(type => article_entity_1.Article, article => article.hearts, {}),
    typeorm_1.JoinColumn({ name: 'article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Heart.prototype, "article", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Heart.prototype, "article_id", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Heart.prototype, "checkDataValidation", null);
Heart = Heart_1 = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity(),
    typeorm_2.Unique('UQ_HEART', ["auth_id", "article_id"])
], Heart);
exports.Heart = Heart;
//# sourceMappingURL=heart.entity.js.map