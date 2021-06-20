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
var ProductCategory_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../product/product.entity");
const typeorm_2 = require("typeorm");
const type_graphql_1 = require("type-graphql");
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
let ProductCategory = ProductCategory_1 = class ProductCategory extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductCategory.prototype, "category_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductCategory.prototype, "category_description", void 0);
__decorate([
    typeorm_1.TreeChildren(),
    type_graphql_1.Field(() => [ProductCategory_1], { nullable: true }),
    __metadata("design:type", Array)
], ProductCategory.prototype, "children", void 0);
__decorate([
    typeorm_1.TreeParent(),
    typeorm_1.JoinColumn({ name: 'parentId' }),
    type_graphql_1.Field(() => ProductCategory_1, { nullable: true }),
    __metadata("design:type", ProductCategory)
], ProductCategory.prototype, "parent", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "parentId", void 0);
__decorate([
    typeorm_2.OneToOne(type => product_entity_1.Product),
    typeorm_1.JoinColumn({ name: 'flag_product_id' }),
    type_graphql_1.Field(() => product_entity_1.Product, { nullable: true }),
    __metadata("design:type", product_entity_1.Product)
], ProductCategory.prototype, "flag_product", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ProductCategory.prototype, "flag_product_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProductCategory.prototype, "picture_url", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "isActive", void 0);
__decorate([
    typeorm_1.OneToMany(type => product_entity_1.Product, product => product.category, { eager: true }),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    type_graphql_1.Field(() => [product_entity_1.Product], { nullable: true }),
    __metadata("design:type", Array)
], ProductCategory.prototype, "products", void 0);
ProductCategory = ProductCategory_1 = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Tree('closure-table'),
    type_graphql_1.ObjectType()
], ProductCategory);
exports.ProductCategory = ProductCategory;
//# sourceMappingURL=product_category.entity.js.map