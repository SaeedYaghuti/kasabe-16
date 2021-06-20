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
let ClientCreateInput = class ClientCreateInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 30),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "client_fname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 30),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "client_lname", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(3, 30),
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "client_mname", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MaxLength(20),
    class_validator_1.MinLength(4),
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ClientCreateInput.prototype, "password", void 0);
ClientCreateInput = __decorate([
    type_graphql_1.InputType()
], ClientCreateInput);
exports.ClientCreateInput = ClientCreateInput;
//# sourceMappingURL=client_create.input.js.map