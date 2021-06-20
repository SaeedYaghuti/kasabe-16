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
const class_validator_1 = require("class-validator");
const update_tag_input_1 = require("../../tag/dto/update_tag.input");
const type_graphql_1 = require("type-graphql");
`
@ObjectType()  @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let UpdateProductInput = class UpdateProductInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "sku", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "supplier_sku", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "product_category_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "product_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "msrp", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "price", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "price_currency", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "currency_symbole", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "unit_title", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "unit_weight", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateProductInput.prototype, "unit_weight_title", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateProductInput.prototype, "is_discount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "discount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "ranking", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateProductInput.prototype, "reorder_level", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateProductInput.prototype, "is_active", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    type_graphql_1.Field(() => [update_tag_input_1.UpdateTagInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdateProductInput.prototype, "rebuildsInput", void 0);
UpdateProductInput = __decorate([
    type_graphql_1.InputType()
], UpdateProductInput);
exports.UpdateProductInput = UpdateProductInput;
//# sourceMappingURL=update_product.input.js.map