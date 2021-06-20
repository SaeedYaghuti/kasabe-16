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
const merchant_repository_1 = require("./merchant.repository");
let MerchantService = class MerchantService {
    constructor(merchantRepository) {
        this.merchantRepository = merchantRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(merchant) {
        console.log('service build() is running');
        const gMerchant = await this.merchantRepository.build(merchant);
        console.log('service build() db resutlt merchant:> ');
        console.log(gMerchant);
        return gMerchant;
    }
    async rebuild(merchant) {
        console.log('service rebuild() is running');
        const gMerchant = await this.merchantRepository.rebuild(merchant);
        console.log('service rebuild() db resutlt merchant:> ');
        console.log(gMerchant);
        return gMerchant;
    }
    async fetchById(rId) {
        const fMerchant = await this.merchantRepository.fetchById(rId);
        console.log(fMerchant);
        return fMerchant;
    }
};
MerchantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(merchant_repository_1.MerchantRepository)),
    __metadata("design:paramtypes", [merchant_repository_1.MerchantRepository])
], MerchantService);
exports.MerchantService = MerchantService;
//# sourceMappingURL=merchant.service.js.map