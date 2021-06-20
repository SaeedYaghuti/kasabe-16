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
const order_status_enum_1 = require("../../order/order_status.enum");
const type_graphql_1 = require("type-graphql");
`
@ObjectType()            @InputType()
@Field(() => Int)         @Field(() => Int,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let CreateOrderDetailsInput = class CreateOrderDetailsInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderDetailsInput.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], CreateOrderDetailsInput.prototype, "quantity", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateOrderDetailsInput.prototype, "shipper_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    class_validator_1.MinDate(new Date()),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CreateOrderDetailsInput.prototype, "required_date", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDate(),
    class_validator_1.MinDate(new Date()),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], CreateOrderDetailsInput.prototype, "ship_date", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], CreateOrderDetailsInput.prototype, "freight", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(order_status_enum_1.OrderStatus),
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrderDetailsInput.prototype, "status", void 0);
CreateOrderDetailsInput = __decorate([
    type_graphql_1.InputType()
], CreateOrderDetailsInput);
exports.CreateOrderDetailsInput = CreateOrderDetailsInput;
//# sourceMappingURL=create_order_details.input.js.map