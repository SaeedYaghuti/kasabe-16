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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const person_service_1 = require("./person.service");
const create_person_input_1 = require("./dto/create_person.input");
const update_person_input_1 = require("./dto/update_person.input");
const person_entity_1 = require("./person.entity");
const message_type_1 = require("../../../util/type/message.type");
let PersonResolver = class PersonResolver {
    constructor(personService) {
        this.personService = personService;
    }
    async personTestQuery(message) {
        console.log('personTestQuery is running...');
        return await this.personService.testQuery(message);
    }
    async personTestMutation(message) {
        return await this.personService.testQuery(message);
    }
    async build(person) {
        console.log('mutation build() is running...');
        return await this.personService.build(person);
    }
    async rebuild(person) {
        console.log('mutation rebuild() is running...');
        return await this.personService.rebuild(person);
    }
    async fetchById(rId) {
        return await this.personService.fetchById(rId);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "personTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "personTestMutation", null);
__decorate([
    graphql_1.Mutation(() => person_entity_1.Person),
    __param(0, graphql_1.Args('person')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_input_1.CreatePersonInput]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "build", null);
__decorate([
    graphql_1.Mutation(() => person_entity_1.Person),
    __param(0, graphql_1.Args('person')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_person_input_1.UpdatePersonInput]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "rebuild", null);
__decorate([
    graphql_1.Query(() => person_entity_1.Person),
    __param(0, graphql_1.Args('person_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonResolver.prototype, "fetchById", null);
PersonResolver = __decorate([
    graphql_1.Resolver('Person'),
    __metadata("design:paramtypes", [person_service_1.PersonService])
], PersonResolver);
exports.PersonResolver = PersonResolver;
//# sourceMappingURL=person.resolver.js.map