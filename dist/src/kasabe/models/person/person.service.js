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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const person_repository_1 = require("./person.repository");
let PersonService = class PersonService {
    constructor(personRepository) {
        this.personRepository = personRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(person) {
        console.log('service build() is running');
        const gPerson = await this.personRepository.build(person);
        console.log('service build() db resutlt person:> ');
        console.log(gPerson);
        return gPerson;
    }
    async rebuild(person) {
        console.log('service rebuild() is running');
        const gPerson = await this.personRepository.rebuild(person);
        console.log('service rebuild() db resutlt person:> ');
        console.log(gPerson);
        return gPerson;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fPerson = await this.personRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fPerson:> ');
        console.log(fPerson);
        return fPerson;
    }
};
PersonService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(person_repository_1.PersonRepository)),
    __metadata("design:paramtypes", [person_repository_1.PersonRepository])
], PersonService);
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map