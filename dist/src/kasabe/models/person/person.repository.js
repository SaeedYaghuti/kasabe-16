"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const person_entity_1 = require("./person.entity");
let PersonRepository = class PersonRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('PersonRepository');
    }
    async build(rPerson) {
        console.log('PersonRepository rData: ', rPerson);
        const person_role = rPerson.person_role;
        const person_name = rPerson.person_name;
        const nPerson = new person_entity_1.Person();
        nPerson.person_role = person_role;
        nPerson.person_name = person_name;
        try {
            const gPerson = await nPerson.save();
            console.log('gPerson: ', gPerson);
            return gPerson;
        }
        catch (error) {
            this.logger.error(`!> Failed to save person: ${JSON.stringify(rPerson)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save person',
                origin: '@person.repository.ts',
                person: rPerson,
            });
        }
    }
    async rebuild(rPerson) {
        console.log('PersonRepository rData: ', rPerson);
        const nPerson = new person_entity_1.Person();
        nPerson.person_id = rPerson.person_id;
        nPerson.person_role = rPerson.person_role;
        nPerson.person_name = rPerson.person_name;
        try {
            await nPerson.save();
            const fPerson = await person_entity_1.Person.findOne(rPerson.person_id);
            console.log('fPerson: ', fPerson);
            return fPerson;
        }
        catch (error) {
            this.logger.error(`!> Failed to update person: ${JSON.stringify(rPerson)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update person',
                origin: '@person.repository.ts',
                person: rPerson,
            });
        }
    }
    async fetchById(rId) {
        console.log('PersonRepository rId: ', rId);
        try {
            const fPerson = await person_entity_1.Person.findOne(rId);
            console.log('fPerson: ', fPerson);
            return fPerson;
        }
        catch (error) {
            this.logger.error(`!> Failed to fetch person by id: ${JSON.stringify(rId)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch person',
                origin: '@person.repository.ts',
                person_id: rId,
            });
        }
    }
};
PersonRepository = __decorate([
    typeorm_1.EntityRepository(person_entity_1.Person)
], PersonRepository);
exports.PersonRepository = PersonRepository;
//# sourceMappingURL=person.repository.js.map