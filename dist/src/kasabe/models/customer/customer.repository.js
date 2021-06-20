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
const person_role_enum_1 = require("../person/person_role.enum");
const customer_entity_1 = require("./customer.entity");
const person_entity_1 = require("../person/person.entity");
let CustomerRepository = class CustomerRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CustomerRepository');
    }
    async build(rCustomer) {
        console.log('PersonRepository: Customer => rData: ', rCustomer);
        const nPerson = new person_entity_1.Person();
        nPerson.person_role = person_role_enum_1.PersonRole.CUSTOMER;
        nPerson.person_name = rCustomer.customer_name;
        let gPerson;
        try {
            gPerson = await nPerson.save();
            console.log('gPerson: ', gPerson);
        }
        catch (error) {
            this.logger.error(`!> Failed to save person: ${JSON.stringify(nPerson)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save person',
                origin: '@customer.repository.ts',
                person: nPerson,
            });
        }
        const nCustomer = new customer_entity_1.Customer();
        nCustomer.person = gPerson;
        nCustomer.customer_name = rCustomer.customer_name;
        nCustomer.password = rCustomer.password;
        try {
            const gCustomer = await nCustomer.save();
            console.log('gCustomer: ', gCustomer);
            return gCustomer;
        }
        catch (error) {
            this.logger.error(`!> Failed to save customer: ${JSON.stringify(rCustomer)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save customer',
                origin: '@customer.repository.ts',
                customer: rCustomer,
            });
        }
    }
    async fetchById(rId) {
        console.log('CustomerRepository rId: ', rId);
        const fCustomer = await customer_entity_1.Customer.findOne({
            where: { customer_id: rId },
            relations: ["person"],
        });
        return fCustomer;
    }
    async rebuild(rCustomer) {
        const fCustomer = await customer_entity_1.Customer.findOneOrFail(rCustomer.customer_id);
        const tuCustomer = Object.assign(fCustomer, rCustomer);
        await customer_entity_1.Customer.save(tuCustomer);
        const customer = this.fetchById(rCustomer.customer_id);
        return customer;
    }
};
CustomerRepository = __decorate([
    typeorm_1.EntityRepository(customer_entity_1.Customer)
], CustomerRepository);
exports.CustomerRepository = CustomerRepository;
//# sourceMappingURL=customer.repository.js.map