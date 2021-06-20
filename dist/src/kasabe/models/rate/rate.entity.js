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
var Rate_1;
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

@Field(() => Rate)  @Field(() => Rate, {nullable: true})  
@Field(() => [Rate])   @Field(() => [Rate], {nullable: true})
`;
let Rate = Rate_1 = class Rate extends typeorm_1.BaseEntity {
    static of(rRate) {
        const nRate = new Rate_1();
        Object.assign(nRate, rRate);
        return nRate;
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
], Rate.prototype, "rate_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, auth => auth.rates, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Rate.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rate.prototype, "auth_id", void 0);
__decorate([
    typeorm_2.OneToOne(type => article_entity_1.Article, article => article.article_rate, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'rate_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Rate.prototype, "rate_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rate.prototype, "rate_article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => article_entity_1.Article, article => article.rates, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'audience_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Rate.prototype, "audience_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rate.prototype, "audience_article_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Rate.prototype, "rate_text", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.Max(5),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Rate.prototype, "rate_stars", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Rate.prototype, "heart_count", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Rate.prototype, "liked", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Rate.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Rate.prototype, "updated_at", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Rate.prototype, "checkDataValidation", null);
Rate = Rate_1 = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Rate);
exports.Rate = Rate;
//# sourceMappingURL=rate.entity.js.map