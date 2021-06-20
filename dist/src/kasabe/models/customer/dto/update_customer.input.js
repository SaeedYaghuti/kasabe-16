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
const type_graphql_1 = require("type-graphql");
`
@ObjectType()            @InputType()
@Field(() => ID)         @Field(() => ID,{ nullable: true })

@Field()                 @Field({ nullable: true }) 

@Field(() => Int)        @Field(() => Int,{ nullable: true }) 
@Field(() => Float)      @Field(() => Float,{ nullable: true }) 

@Field(() => Person)     @Field(() => Person, {nullable: true})  
@Field(() => [Person])   @Field(() => [Person], {nullable: true})
`;
let UpdateCustomerInput = class UpdateCustomerInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], UpdateCustomerInput.prototype, "customer_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "customer_name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateCustomerInput.prototype, "password", void 0);
UpdateCustomerInput = __decorate([
    type_graphql_1.InputType()
], UpdateCustomerInput);
exports.UpdateCustomerInput = UpdateCustomerInput;
//# sourceMappingURL=update_customer.input.js.map