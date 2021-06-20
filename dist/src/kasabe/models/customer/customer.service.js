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
const customer_repository_1 = require("./customer.repository");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(customer) {
        console.log('service build() is running');
        const gCustomer = await this.customerRepository.build(customer);
        console.log('service build() db resutlt customer:> ');
        console.log(gCustomer);
        return gCustomer;
    }
    async rebuild(customer) {
        console.log('service rebuild() is running');
        const gCustomer = await this.customerRepository.rebuild(customer);
        console.log('service rebuild() db resutlt customer:> ');
        console.log(gCustomer);
        return gCustomer;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fCustomer = await this.customerRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fCustomer:> ');
        console.log(fCustomer);
        return fCustomer;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(customer_repository_1.CustomerRepository)),
    __metadata("design:paramtypes", [customer_repository_1.CustomerRepository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map