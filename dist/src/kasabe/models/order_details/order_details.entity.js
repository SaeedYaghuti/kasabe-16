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
var OrderDetails_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const shipper_entity_1 = require("../shipper/shipper.entity");
const order_status_enum_1 = require("../order/order_status.enum");
const order_entity_1 = require("../order/order.entity");
const product_entity_1 = require("../product/product.entity");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const common_1 = require("@nestjs/common");
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
let OrderDetails = OrderDetails_1 = class OrderDetails extends typeorm_1.BaseEntity {
    static of(rOrderDetails) {
        const nOrderDetails = new OrderDetails_1();
        Object.assign(nOrderDetails, rOrderDetails);
        return nOrderDetails;
    }
    async checkDataValidation() {
        const errors = await class_validator_1.validate(this, { validationError: { target: true, value: true } });
        if (errors.length > 0) {
            console.log('<checkDataValidation| OrderDetails| errors>', errors);
            throw new common_1.BadRequestException('Validation failed!');
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OrderDetails.prototype, "order_details_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => order_entity_1.Order, order => order.order_details, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ referencedColumnName: "order_id", name: "order_id" }),
    type_graphql_1.Field(() => product_entity_1.Product),
    __metadata("design:type", order_entity_1.Order)
], OrderDetails.prototype, "order", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OrderDetails.prototype, "order_id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => product_entity_1.Product, product => product.order_details, { eager: true }),
    typeorm_1.JoinColumn({ name: "product_id" }),
    type_graphql_1.Field(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], OrderDetails.prototype, "product", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OrderDetails.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3 }),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], OrderDetails.prototype, "msrp", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3 }),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], OrderDetails.prototype, "discount", void 0);
__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3 }),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], OrderDetails.prototype, "price", void 0);
__decorate([
    typeorm_1.ManyToOne(type => shipper_entity_1.Shipper, shipper => shipper.order, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: false,
    }),
    typeorm_1.JoinColumn({ name: 'shipper_id' }),
    type_graphql_1.Field(() => shipper_entity_1.Shipper),
    __metadata("design:type", shipper_entity_1.Shipper)
], OrderDetails.prototype, "shipper", void 0);
__decorate([
    typeorm_1.Column("integer"),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OrderDetails.prototype, "shipper_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], OrderDetails.prototype, "required_date", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], OrderDetails.prototype, "ship_date", void 0);
__decorate([
    typeorm_1.Column('decimal', { scale: 3, nullable: true }),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "freight", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    class_validator_1.IsEnum(order_status_enum_1.OrderStatus),
    type_graphql_1.Field(() => order_status_enum_1.OrderStatus),
    __metadata("design:type", String)
], OrderDetails.prototype, "status", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderDetails.prototype, "checkDataValidation", null);
OrderDetails = OrderDetails_1 = __decorate([
    typeorm_1.Entity({ name: 'order_details' }),
    type_graphql_1.ObjectType()
], OrderDetails);
exports.OrderDetails = OrderDetails;
//# sourceMappingURL=order_details.entity.js.map