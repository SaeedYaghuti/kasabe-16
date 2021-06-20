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
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
const article_entity_1 = require("../article/article.entity");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Comment)  @Field(() => Comment, {nullable: true})  
@Field(() => [Comment])   @Field(() => [Comment], {nullable: true})
`;
let Comment = Comment_1 = class Comment extends typeorm_1.BaseEntity {
    static of(rComment) {
        const nComment = new Comment_1();
        Object.assign(nComment, rComment);
        return nComment;
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
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Comment.prototype, "comment_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, auth => auth.comments, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Comment.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "auth_id", void 0);
__decorate([
    typeorm_2.OneToOne(type => article_entity_1.Article, article => article.article_comment, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'comment_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Comment.prototype, "comment_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "comment_article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => article_entity_1.Article, article => article.comments, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'audience_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Comment.prototype, "audience_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Comment.prototype, "audience_article_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Comment.prototype, "comment_text", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Comment.prototype, "heart_count", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    typeorm_1.Column({ insert: false, update: false, select: false, nullable: true }),
    __metadata("design:type", Boolean)
], Comment.prototype, "liked", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ insert: false, update: false, select: true, nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "comment_count", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updated_at", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Comment.prototype, "checkDataValidation", null);
Comment = Comment_1 = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map