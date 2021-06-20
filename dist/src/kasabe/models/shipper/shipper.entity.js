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
let Shipper = class Shipper extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Shipper.prototype, "shipper_id", void 0);
__decorate([
    typeorm_1.OneToOne(type => person_entity_1.Person),
    typeorm_1.JoinColumn({ name: 'person_id' }),
    type_graphql_1.Field(() => person_entity_1.Person, { nullable: true }),
    __metadata("design:type", person_entity_1.Person)
], Shipper.prototype, "person", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Shipper.prototype, "person_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Shipper.prototype, "shipper_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Shipper.prototype, "contact_name", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Shipper.prototype, "contact_title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Shipper.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Shipper.prototype, "logo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Shipper.prototype, "note", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Shipper.prototype, "our_id", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_entity_1.Order, order => order.shipper, { eager: false }),
    type_graphql_1.Field(() => [order_entity_1.Order], { nullable: true }),
    __metadata("design:type", Array)
], Shipper.prototype, "order", void 0);
Shipper = __decorate([
    typeorm_1.Entity({ name: 'shipper' }),
    type_graphql_1.ObjectType()
], Shipper);
exports.Shipper = Shipper;
//# sourceMappingURL=shipper.entity.js.map