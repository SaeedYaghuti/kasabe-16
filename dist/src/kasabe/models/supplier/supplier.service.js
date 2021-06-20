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
const supplier_repository_1 = require("./supplier.repository");
let SupplierService = class SupplierService {
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(supplier) {
        console.log('service build() is running');
        const gSupplier = await this.supplierRepository.build(supplier);
        console.log('service build() db resutlt supplier:> ');
        console.log(gSupplier);
        return gSupplier;
    }
    async rebuild(supplier) {
        console.log('service rebuild() is running');
        const gSupplier = await this.supplierRepository.rebuild(supplier);
        console.log('service rebuild() db resutlt supplier:> ');
        console.log(gSupplier);
        return gSupplier;
    }
    async fetchById(rId) {
        const fSupplier = await this.supplierRepository.fetchById(rId);
        console.log(fSupplier);
        return fSupplier;
    }
};
SupplierService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(supplier_repository_1.SupplierRepository)),
    __metadata("design:paramtypes", [supplier_repository_1.SupplierRepository])
], SupplierService);
exports.SupplierService = SupplierService;
//# sourceMappingURL=supplier.service.js.map