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
const type_graphql_1 = require("type-graphql");
`
@ObjectType()  @InputType()
@Field(() => ID)    @Field(() => ID,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let BuildMerchantCategoryInput = class BuildMerchantCategoryInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 50),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildMerchantCategoryInput.prototype, "category_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 100),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildMerchantCategoryInput.prototype, "category_description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BuildMerchantCategoryInput.prototype, "parentId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BuildMerchantCategoryInput.prototype, "flag_merchant_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantCategoryInput.prototype, "picture_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], BuildMerchantCategoryInput.prototype, "isActive", void 0);
BuildMerchantCategoryInput = __decorate([
    type_graphql_1.InputType()
], BuildMerchantCategoryInput);
exports.BuildMerchantCategoryInput = BuildMerchantCategoryInput;
//# sourceMappingURL=create_merchant_category.input.js.map