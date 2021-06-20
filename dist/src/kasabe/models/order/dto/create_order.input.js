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
const order_status_enum_1 = require("../order_status.enum");
const create_order_details_input_1 = require("../../order_details/dto/create_order_details.input");
const class_transformer_1 = require("class-transformer");
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
let CreateOrderInput = class CreateOrderInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "order_number", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "customer_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "shipper_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsISO8601(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], CreateOrderInput.prototype, "order_date", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsISO8601(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], CreateOrderInput.prototype, "required_date", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsISO8601(),
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], CreateOrderInput.prototype, "ship_date", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], CreateOrderInput.prototype, "freight", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEnum(order_status_enum_1.OrderStatus),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "status", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsArray(),
    class_transformer_1.Type(() => create_order_details_input_1.CreateOrderDetailsInput),
    type_graphql_1.Field(() => [create_order_details_input_1.CreateOrderDetailsInput]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "order_details", void 0);
CreateOrderInput = __decorate([
    type_graphql_1.InputType()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
//# sourceMappingURL=create_order.input.js.map