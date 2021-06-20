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
@Field(() => Int)    @Field(() => Int,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let BuildMerchantInput = class BuildMerchantInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], BuildMerchantInput.prototype, "auth_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(40),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "merchant_title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(100),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "tiny_description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "long_description", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(50),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "contact_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "instagram_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "number_call", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "number_whatsapp", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(11),
    class_validator_1.MaxLength(11),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "number_telegram", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(16),
    class_validator_1.MaxLength(16),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "bank_card_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10),
    class_validator_1.MaxLength(50),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "bank_card_details", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "avatar_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "header_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(130),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "note", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuildMerchantInput.prototype, "location", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], BuildMerchantInput.prototype, "merchant_category_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], BuildMerchantInput.prototype, "tag_titles", void 0);
BuildMerchantInput = __decorate([
    type_graphql_1.InputType()
], BuildMerchantInput);
exports.BuildMerchantInput = BuildMerchantInput;
//# sourceMappingURL=create_merchant.input.js.map