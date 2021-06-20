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
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Rate)     @Field(() => Rate, {nullable: true})  
@Field(() => [Rate])   @Field(() => [Rate], {nullable: true})
`;
let BuildRateInput = class BuildRateInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], BuildRateInput.prototype, "auth_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BuildRateInput.prototype, "audience_article_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(250),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuildRateInput.prototype, "rate_text", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.Max(5),
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BuildRateInput.prototype, "rate_stars", void 0);
BuildRateInput = __decorate([
    type_graphql_1.InputType()
], BuildRateInput);
exports.BuildRateInput = BuildRateInput;
//# sourceMappingURL=create_rate.input.js.map