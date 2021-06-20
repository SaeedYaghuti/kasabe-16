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
var Merchant_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const tag_entity_1 = require("../tag/tag.entity");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
const merchant_category_entity_1 = require("../merchant_category/merchant_category.entity");
const common_1 = require("@nestjs/common");
const article_entity_1 = require("../article/article.entity");
const relation_entity_1 = require("../relation/relation.entity");
let Merchant = Merchant_1 = class Merchant extends typeorm_1.BaseEntity {
    static of(rMerchant) {
        const nMerchant = new Merchant_1();
        Object.assign(nMerchant, rMerchant);
        return nMerchant;
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
], Merchant.prototype, "merchant_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    __metadata("design:type", auth_entity_1.Auth)
], Merchant.prototype, "auth", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Merchant.prototype, "auth_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => article_entity_1.Article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Merchant.prototype, "article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Merchant.prototype, "article_id", void 0);
__decorate([
    typeorm_1.OneToMany(type => relation_entity_1.Relation, relation => relation.merchant, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Merchant.prototype, "relations", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(40),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "merchant_title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(100),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "tiny_description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "long_description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(50),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "contact_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "instagram_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "number_call", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "number_whatsapp", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "number_telegram", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(16),
    class_validator_1.MaxLength(16),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "bank_card_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    class_validator_1.MaxLength(50),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "bank_card_details", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "avatar_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "header_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(130),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "note", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Merchant.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Merchant.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Merchant.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.ManyToOne(type => merchant_category_entity_1.MerchantCategory, merchant_category => merchant_category.merchants, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'merchant_category_id' }),
    type_graphql_1.Field(() => merchant_category_entity_1.MerchantCategory, { nullable: true }),
    __metadata("design:type", merchant_category_entity_1.MerchantCategory)
], Merchant.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Merchant.prototype, "merchant_category_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    typeorm_1.ManyToMany(type => tag_entity_1.Tag, tag => tag.merchants, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
        nullable: true
    }),
    typeorm_1.JoinTable({
        name: 'tag_merchant',
        joinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'merchant_id'
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'tag_id'
        }
    }),
    type_graphql_1.Field(() => [tag_entity_1.Tag], { nullable: true }),
    __metadata("design:type", Array)
], Merchant.prototype, "tags", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ insert: false, update: false, select: true, nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "rate_count", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ insert: false, update: false, select: true, nullable: true }),
    __metadata("design:type", String)
], Merchant.prototype, "rate_avg", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Merchant.prototype, "checkDataValidation", null);
Merchant = Merchant_1 = __decorate([
    typeorm_1.Entity({ name: 'merchant' }),
    type_graphql_1.ObjectType()
], Merchant);
exports.Merchant = Merchant;
//# sourceMappingURL=merchant.entity.js.map