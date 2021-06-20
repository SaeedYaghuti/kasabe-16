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
const typeorm_1 = require("typeorm");
const person_entity_1 = require("../person/person.entity");
const order_entity_1 = require("../order/order.entity");
const type_graphql_1 = require("type-graphql");
`
@ObjectType()
@Field(() => ID)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let Customer = class Customer extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Customer.prototype, "customer_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => person_entity_1.Person),
    typeorm_1.JoinColumn({ name: 'person_id' }),
    type_graphql_1.Field(() => person_entity_1.Person),
    __metadata("design:type", person_entity_1.Person)
], Customer.prototype, "person", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Customer.prototype, "person_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Customer.prototype, "customer_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_entity_1.Order, order => order.customer, { eager: false }),
    type_graphql_1.Field(() => [order_entity_1.Order], { nullable: true }),
    __metadata("design:type", Array)
], Customer.prototype, "order", void 0);
Customer = __decorate([
    typeorm_1.Entity({ name: 'customer' }),
    type_graphql_1.ObjectType()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map