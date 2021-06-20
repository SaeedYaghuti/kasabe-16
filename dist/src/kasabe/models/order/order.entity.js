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
var Order_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const shipper_entity_1 = require("../shipper/shipper.entity");
const order_status_enum_1 = require("./order_status.enum");
const order_details_entity_1 = require("../order_details/order_details.entity");
const type_graphql_1 = require("type-graphql");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
`
@ObjectType()
@Field(() => Int)   

@Field()  @Field({ nullable: true }) 

@Field(() => Int)   @Field(() => Int,{ nullable: true }) 
@Field(() => Float)   @Field(() => Float,{ nullable: true }) 
@Field(() => Boolean)   @Field(() => Boolean,{ nullable: true }) 

@Field(() => Person)  @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let Order = Order_1 = class Order extends typeorm_1.BaseEntity {
    static of(rOrder) {
        const nOrder = new Order_1();
        Object.assign(nOrder, rOrder);
        return nOrder;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<checkDataValidation| errors>', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Order.prototype, "order_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Order.prototype, "order_number", void 0);
__decorate([
    typeorm_1.ManyToOne(type => customer_entity_1.Customer, customer => customer.order, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'customer_id' }),
    type_graphql_1.Field(() => customer_entity_1.Customer),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Order.prototype, "customer_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shipper_entity_1.Shipper, shipper => shipper.order, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ name: 'shipper_id' }),
    type_graphql_1.Field(() => shipper_entity_1.Shipper, { nullable: true }),
    __metadata("design:type", shipper_entity_1.Shipper)
], Order.prototype, "shipper", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "shipper_id", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Order.prototype, "order_date", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Order.prototype, "required_date", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Order.prototype, "ship_date", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3 }),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "freight", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => order_status_enum_1.OrderStatus),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany(type => order_details_entity_1.OrderDetails, order_details => order_details.order, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "order_details_id", name: "order_details_id" }),
    type_graphql_1.Field(() => [order_details_entity_1.OrderDetails]),
    __metadata("design:type", Array)
], Order.prototype, "order_details", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Order.prototype, "checkDataValidation", null);
Order = Order_1 = __decorate([
    typeorm_1.Entity({ name: 'orders' }),
    type_graphql_1.ObjectType()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map