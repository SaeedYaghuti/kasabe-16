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
const article_type_enum_1 = require("../article_type.enum");
const type_graphql_1 = require("type-graphql");
`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Article)     @Field(() => Article, {nullable: true})  
@Field(() => [Article])   @Field(() => [Article], {nullable: true})
`;
let UpdateArticleInput = class UpdateArticleInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UpdateArticleInput.prototype, "article_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(article_type_enum_1.ArticleType),
    type_graphql_1.Field(() => article_type_enum_1.ArticleType),
    __metadata("design:type", String)
], UpdateArticleInput.prototype, "article_type", void 0);
UpdateArticleInput = __decorate([
    type_graphql_1.InputType()
], UpdateArticleInput);
exports.UpdateArticleInput = UpdateArticleInput;
//# sourceMappingURL=update_article.input.js.map