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
const address_entity_1 = require("./address.entity");
const person_entity_1 = require("../person/person.entity");
let AddressRepository = class AddressRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('AddressRepository');
    }
    async build(rAddress) {
        console.log('AddressRepository: Address => rData: ', rAddress);
        const fPerson = await person_entity_1.Person.findOneOrFail(rAddress.person_id);
        const nAddress = new address_entity_1.Address();
        Object.assign(nAddress, rAddress);
        nAddress.person = fPerson;
        const gAddress = await address_entity_1.Address.save(nAddress);
        return gAddress;
    }
    async fetchById(rId) {
        const fAddress = await address_entity_1.Address.findOne({
            relations: ["person"],
            where: { address_id: rId },
        });
        return fAddress;
    }
    async rebuild(rAddress) {
        const fAddress = await address_entity_1.Address.findOneOrFail(rAddress.address_id);
        const tuAddress = Object.assign(fAddress, rAddress);
        await address_entity_1.Address.save(tuAddress);
        const address = this.fetchById(rAddress.address_id);
        return address;
    }
};
AddressRepository = __decorate([
    typeorm_1.EntityRepository(address_entity_1.Address)
], AddressRepository);
exports.AddressRepository = AddressRepository;
//# sourceMappingURL=address.repository.js.map