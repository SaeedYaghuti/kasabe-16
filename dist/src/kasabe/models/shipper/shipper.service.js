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
const shipper_repository_1 = require("./shipper.repository");
let ShipperService = class ShipperService {
    constructor(shipperRepository) {
        this.shipperRepository = shipperRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(shipper) {
        console.log('service build() is running');
        const gShipper = await this.shipperRepository.build(shipper);
        console.log('service build() db resutlt shipper:> ');
        console.log(gShipper);
        return gShipper;
    }
    async rebuild(shipper) {
        console.log('service rebuild() is running');
        const gShipper = await this.shipperRepository.rebuild(shipper);
        console.log('service rebuild() db resutlt shipper:> ');
        console.log(gShipper);
        return gShipper;
    }
    async fetchById(rId) {
        const fShipper = await this.shipperRepository.fetchById(rId);
        console.log(fShipper);
        return fShipper;
    }
};
ShipperService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shipper_repository_1.ShipperRepository)),
    __metadata("design:paramtypes", [shipper_repository_1.ShipperRepository])
], ShipperService);
exports.ShipperService = ShipperService;
//# sourceMappingURL=shipper.service.js.map