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
var Supplier_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const person_entity_1 = require("../person/person.entity");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
`
@ObjectType()
@Field(() => ID)    @Field(() => ID,{ nullable: true })

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let Supplier = Supplier_1 = class Supplier extends typeorm_1.BaseEntity {
    static of(rSupplier) {
        const nSupplier = new Supplier_1();
        Object.assign(nSupplier, rSupplier);
        return nSupplier;
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
], Supplier.prototype, "supplier_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => person_entity_1.Person),
    typeorm_1.JoinColumn({ name: 'person_id' }),
    type_graphql_1.Field(() => person_entity_1.Person),
    __metadata("design:type", person_entity_1.Person)
], Supplier.prototype, "person", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Supplier.prototype, "person_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Supplier.prototype, "supplier_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Supplier.prototype, "contact_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Supplier.prototype, "contact_title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "logo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "note", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "our_id", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Supplier.prototype, "checkDataValidation", null);
Supplier = Supplier_1 = __decorate([
    typeorm_1.Entity({ name: 'supplier' }),
    type_graphql_1.ObjectType()
], Supplier);
exports.Supplier = Supplier;
//# sourceMappingURL=supplier.entity.js.map