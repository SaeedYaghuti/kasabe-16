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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const product_category_entity_1 = require("../product_category/product_category.entity");
const tag_entity_1 = require("../tag/tag.entity");
const order_details_entity_1 = require("../order_details/order_details.entity");
const type_graphql_1 = require("type-graphql");
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "supplier_sku", void 0);
__decorate([
    typeorm_1.ManyToOne(type => product_category_entity_1.ProductCategory, product_category => product_category.products, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'product_category_id' }),
    type_graphql_1.Field(() => product_category_entity_1.ProductCategory, { nullable: true }),
    __metadata("design:type", product_category_entity_1.ProductCategory)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "product_category_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Product.prototype, "product_name", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "msrp", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3 }),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ default: 'omani riyal', nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "price_currency", void 0);
__decorate([
    typeorm_1.Column({ default: 'omr', nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "currency_symbole", void 0);
__decorate([
    typeorm_1.Column({ default: 'pc', nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "unit_title", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 2, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "unit_weight", void 0);
__decorate([
    typeorm_1.Column({ default: 'kg', nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "unit_weight_title", void 0);
__decorate([
    typeorm_1.Column({ default: false, nullable: true }),
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_discount", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 2, default: 0, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column({ default: 1, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "ranking", void 0);
__decorate([
    typeorm_1.Column({ default: 2, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "reorder_level", void 0);
__decorate([
    typeorm_1.Column({ default: true, nullable: true }),
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_active", void 0);
__decorate([
    typeorm_1.ManyToMany(type => tag_entity_1.Tag, tag => tag.products, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
        nullable: true
    }),
    typeorm_1.JoinTable({
        name: 'tag_product',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'product_id'
        },
        inverseJoinColumn: {
            name: 'tag_id',
            referencedColumnName: 'tag_id'
        }
    }),
    type_graphql_1.Field(() => [tag_entity_1.Tag], { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_details_entity_1.OrderDetails, order_details => order_details.product, { eager: false }),
    type_graphql_1.Field(() => [order_details_entity_1.OrderDetails], { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "order_details", void 0);
Product = __decorate([
    typeorm_1.Entity({ name: 'product' }),
    typeorm_1.Unique(['sku']),
    type_graphql_1.ObjectType()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map