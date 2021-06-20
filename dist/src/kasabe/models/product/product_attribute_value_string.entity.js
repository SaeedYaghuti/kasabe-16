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
const product_entity_1 = require("./product.entity");
const product_attribute_entity_1 = require("./product_attribute.entity");
const type_graphql_1 = require("type-graphql");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let ProductAttributeValueString = class ProductAttributeValueString extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductAttributeValueString.prototype, "value_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => product_entity_1.Product),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    type_graphql_1.Field(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], ProductAttributeValueString.prototype, "product", void 0);
__decorate([
    typeorm_1.OneToOne(type => product_attribute_entity_1.ProductAttribute),
    typeorm_1.JoinColumn({ name: 'product_attribute_id' }),
    type_graphql_1.Field(() => product_attribute_entity_1.ProductAttribute),
    __metadata("design:type", product_attribute_entity_1.ProductAttribute)
], ProductAttributeValueString.prototype, "attribute", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductAttributeValueString.prototype, "value", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductAttributeValueString.prototype, "unit", void 0);
ProductAttributeValueString = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], ProductAttributeValueString);
exports.ProductAttributeValueString = ProductAttributeValueString;
//# sourceMappingURL=product_attribute_value_string.entity.js.map