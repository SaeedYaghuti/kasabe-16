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
var Tag_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const type_graphql_1 = require("type-graphql");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const merchant_entity_1 = require("../merchant/merchant.entity");
`
@ObjectType()
@Field(() =)    @Field(() =,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let Tag = Tag_1 = class Tag extends typeorm_1.BaseEntity {
    static of(rTag) {
        const nTag = new Tag_1();
        Object.assign(nTag, rTag);
        return nTag;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<checkDataValidation |errors>', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Tag.prototype, "tag_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(2, 50),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Tag.prototype, "tag_title", void 0);
__decorate([
    typeorm_1.ManyToMany(type => product_entity_1.Product, product => product.tags, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    }),
    type_graphql_1.Field(() => [product_entity_1.Product]),
    __metadata("design:type", Array)
], Tag.prototype, "products", void 0);
__decorate([
    typeorm_1.ManyToMany(type => merchant_entity_1.Merchant, merchant => merchant.tags, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    }),
    type_graphql_1.Field(() => [merchant_entity_1.Merchant]),
    __metadata("design:type", Array)
], Tag.prototype, "merchants", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Tag.prototype, "checkDataValidation", null);
Tag = Tag_1 = __decorate([
    typeorm_1.Entity({ name: 'tag' }),
    typeorm_1.Unique(['tag_title']),
    type_graphql_1.ObjectType()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map