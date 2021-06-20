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
var MerchantCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const merchant_entity_1 = require("../merchant/merchant.entity");
const typeorm_2 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
`
@ObjectType()
@Field(() => Int)    @Field(() => Int,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let MerchantCategory = MerchantCategory_1 = class MerchantCategory extends typeorm_1.BaseEntity {
    static of(rMerchantCategory) {
        const nMerchantCategory = new MerchantCategory_1();
        Object.assign(nMerchantCategory, rMerchantCategory);
        return nMerchantCategory;
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
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], MerchantCategory.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 50),
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MerchantCategory.prototype, "category_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100),
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], MerchantCategory.prototype, "category_description", void 0);
__decorate([
    typeorm_1.TreeChildren(),
    type_graphql_1.Field(() => [MerchantCategory_1], { nullable: true }),
    __metadata("design:type", Array)
], MerchantCategory.prototype, "children", void 0);
__decorate([
    typeorm_1.TreeParent(),
    typeorm_1.JoinColumn({ name: 'parentId' }),
    type_graphql_1.Field(() => MerchantCategory_1, { nullable: true }),
    __metadata("design:type", MerchantCategory)
], MerchantCategory.prototype, "parent", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], MerchantCategory.prototype, "parentId", void 0);
__decorate([
    typeorm_2.OneToOne(type => merchant_entity_1.Merchant),
    typeorm_1.JoinColumn({ name: 'flag_merchant_id' }),
    type_graphql_1.Field(() => merchant_entity_1.Merchant, { nullable: true }),
    __metadata("design:type", merchant_entity_1.Merchant)
], MerchantCategory.prototype, "flag_merchant", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], MerchantCategory.prototype, "flag_merchant_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], MerchantCategory.prototype, "picture_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    typeorm_1.Column(),
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], MerchantCategory.prototype, "isActive", void 0);
__decorate([
    typeorm_1.OneToMany(type => merchant_entity_1.Merchant, merchant => merchant.category, { eager: true }),
    typeorm_1.JoinColumn({ name: 'merchant_id' }),
    type_graphql_1.Field(() => [merchant_entity_1.Merchant], { nullable: true }),
    __metadata("design:type", Array)
], MerchantCategory.prototype, "merchants", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MerchantCategory.prototype, "checkDataValidation", null);
MerchantCategory = MerchantCategory_1 = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Tree('closure-table'),
    type_graphql_1.ObjectType()
], MerchantCategory);
exports.MerchantCategory = MerchantCategory;
//# sourceMappingURL=merchant_category.entity.js.map