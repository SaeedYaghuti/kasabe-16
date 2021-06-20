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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var Auth_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
const auth_type_enum_1 = require("./auth_type.enum");
const heart_entity_1 = require("../../kasabe/models/heart/heart.entity");
const comment_entity_1 = require("../../kasabe/models/comment/comment.entity");
const rate_entity_1 = require("../../kasabe/models/rate/rate.entity");
const post_entity_1 = require("../../kasabe/models/post/post.entity");
const relation_entity_1 = require("../../kasabe/models/relation/relation.entity");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Auth)  @Field(() => Auth, {nullable: true})  
@Field(() => [Auth])   @Field(() => [Auth], {nullable: true})
`;
let Auth = Auth_1 = class Auth extends typeorm_1.BaseEntity {
    async validatePassword(password) {
        const hashedPass = bcrypt.hashSync(password, this.salt);
        return hashedPass === this.password;
    }
    static of(rAuth) {
        const nAuth = new Auth_1();
        Object.assign(nAuth, rAuth);
        return nAuth;
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
], Auth.prototype, "auth_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Auth.prototype, "authname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Auth.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: auth_type_enum_1.AuthType }),
    type_graphql_1.Field(() => auth_type_enum_1.AuthType),
    __metadata("design:type", String)
], Auth.prototype, "auth_type", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_entity_1.Post, post => post.auth, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "post_id", name: "post_id" }),
    type_graphql_1.Field(() => [post_entity_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], Auth.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany(type => comment_entity_1.Comment, comment => comment.auth, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "comment_id", name: "comment_id" }),
    type_graphql_1.Field(() => [comment_entity_1.Comment], { nullable: true }),
    __metadata("design:type", Array)
], Auth.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(type => rate_entity_1.Rate, rate => rate.auth, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "rate_id", name: "rate_id" }),
    type_graphql_1.Field(() => [rate_entity_1.Rate], { nullable: true }),
    __metadata("design:type", Array)
], Auth.prototype, "rates", void 0);
__decorate([
    typeorm_1.OneToMany(type => heart_entity_1.Heart, heart => heart.auth, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Auth.prototype, "hearts", void 0);
__decorate([
    typeorm_1.OneToMany(type => relation_entity_1.Relation, relation => relation.auth, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Auth.prototype, "relations", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: auth_type_enum_1.AuthType,
        array: true,
    }),
    type_graphql_1.Field(() => [auth_type_enum_1.AuthType]),
    __metadata("design:type", Array)
], Auth.prototype, "roles", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Auth.prototype, "salt", void 0);
__decorate([
    typeorm_2.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Auth.prototype, "checkDataValidation", null);
Auth = Auth_1 = __decorate([
    typeorm_1.Entity(),
    typeorm_2.Unique(['authname']),
    type_graphql_1.ObjectType()
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.entity.js.map