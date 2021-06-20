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
var Post_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const article_entity_1 = require("../article/article.entity");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Post)  @Field(() => Post, {nullable: true})  
@Field(() => [Post])   @Field(() => [Post], {nullable: true})
`;
let Post = Post_1 = class Post extends typeorm_1.BaseEntity {
    static of(rPost) {
        const nPost = new Post_1();
        Object.assign(nPost, rPost);
        return nPost;
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
], Post.prototype, "post_id", void 0);
__decorate([
    type_graphql_1.Field(() => auth_entity_1.Auth, { nullable: true }),
    typeorm_1.ManyToOne(type => auth_entity_1.Auth, auth => auth.posts, {}),
    typeorm_1.JoinColumn({ name: 'auth_id' }),
    __metadata("design:type", auth_entity_1.Auth)
], Post.prototype, "auth", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "auth_id", void 0);
__decorate([
    typeorm_2.OneToOne(type => article_entity_1.Article, article => article.article_post, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'post_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Post.prototype, "post_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "post_article_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => article_entity_1.Article, article => article.posts, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'audience_article_id' }),
    __metadata("design:type", article_entity_1.Article)
], Post.prototype, "audience_article", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "audience_article_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Post.prototype, "post_text", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_validator_1.ArrayMaxSize(10),
    class_transformer_1.Type(() => String),
    type_graphql_1.Field(() => [String], { nullable: true }),
    typeorm_1.Column("text", { array: true, nullable: false }),
    __metadata("design:type", Array)
], Post.prototype, "picture_urls", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Post.prototype, "heart_count", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(200),
    type_graphql_1.Field(),
    typeorm_1.Column({ insert: false, update: false, select: true, nullable: true }),
    __metadata("design:type", Boolean)
], Post.prototype, "liked", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Post.prototype, "checkDataValidation", null);
Post = Post_1 = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map