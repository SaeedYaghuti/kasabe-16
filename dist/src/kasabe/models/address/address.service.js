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
const address_repository_1 = require("./address.repository");
let AddressService = class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(address) {
        console.log('service build() is running');
        const gAddress = await this.addressRepository.build(address);
        console.log('service build() db resutlt address:> ');
        console.log(gAddress);
        return gAddress;
    }
    async rebuild(address) {
        console.log('service rebuild() is running');
        const gAddress = await this.addressRepository.rebuild(address);
        console.log('service rebuild() db resutlt address:> ');
        console.log(gAddress);
        return gAddress;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fAddress = await this.addressRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fAddress:> ');
        console.log(fAddress);
        return fAddress;
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(address_repository_1.AddressRepository)),
    __metadata("design:paramtypes", [address_repository_1.AddressRepository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map