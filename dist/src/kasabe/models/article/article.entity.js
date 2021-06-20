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
var Article_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const article_type_enum_1 = require("./article_type.enum");
const heart_entity_1 = require("../heart/heart.entity");
const comment_entity_1 = require("../comment/comment.entity");
const rate_entity_1 = require("../rate/rate.entity");
const post_entity_1 = require("../post/post.entity");
const seen_entity_1 = require("../seen/seen.entity");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Article)  @Field(() => Article, {nullable: true})  
@Field(() => [Article])   @Field(() => [Article], {nullable: true})
`;
let Article = Article_1 = class Article extends typeorm_1.BaseEntity {
    static of(rArticle) {
        const nArticle = new Article_1();
        Object.assign(nArticle, rArticle);
        return nArticle;
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
], Article.prototype, "article_id", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: article_type_enum_1.ArticleType }),
    type_graphql_1.Field(() => article_type_enum_1.ArticleType),
    __metadata("design:type", String)
], Article.prototype, "article_type", void 0);
__decorate([
    typeorm_1.OneToMany(type => heart_entity_1.Heart, heart => heart.article, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "heart_id", name: "heart_id" }),
    __metadata("design:type", Array)
], Article.prototype, "hearts", void 0);
__decorate([
    typeorm_1.OneToMany(type => seen_entity_1.Seen, seen => seen.article, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "seen_id", name: "seen_id" }),
    __metadata("design:type", Array)
], Article.prototype, "seens", void 0);
__decorate([
    typeorm_2.OneToOne(type => post_entity_1.Post, post => post.post_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", post_entity_1.Post)
], Article.prototype, "article_post", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_entity_1.Post, post => post.audience_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    type_graphql_1.Field(() => [post_entity_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], Article.prototype, "posts", void 0);
__decorate([
    typeorm_2.OneToOne(type => comment_entity_1.Comment, comment => comment.comment_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", comment_entity_1.Comment)
], Article.prototype, "article_comment", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.audience_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    type_graphql_1.Field(() => [comment_entity_1.Comment], { nullable: true }),
    __metadata("design:type", Array)
], Article.prototype, "comments", void 0);
__decorate([
    typeorm_2.OneToOne(type => rate_entity_1.Rate, rate => rate.rate_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", rate_entity_1.Rate)
], Article.prototype, "article_rate", void 0);
__decorate([
    typeorm_1.OneToMany(type => rate_entity_1.Rate, rate => rate.audience_article, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    type_graphql_1.Field(() => [rate_entity_1.Rate], { nullable: true }),
    __metadata("design:type", Array)
], Article.prototype, "rates", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Article.prototype, "checkDataValidation", null);
Article = Article_1 = __decorate([
    typeorm_1.Entity({ name: 'article' }),
    type_graphql_1.ObjectType()
], Article);
exports.Article = Article;
//# sourceMappingURL=article.entity.js.map