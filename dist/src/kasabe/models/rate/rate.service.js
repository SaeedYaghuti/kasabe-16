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
const rate_repository_1 = require("./rate.repository");
let RateService = class RateService {
    constructor(rateRepository) {
        this.rateRepository = rateRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(rate) {
        console.log('service build() is running');
        const gRate = await this.rateRepository.build(rate);
        console.log('service build() db resutlt rate:> ');
        console.log(gRate);
        return gRate;
    }
    async rebuild(rate) {
        console.log('service rebuild() is running');
        const gRate = await this.rateRepository.rebuild(rate);
        console.log('service rebuild() db resutlt rate:> ');
        console.log(gRate);
        return gRate;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fRate = await this.rateRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fRate:> ');
        console.log(fRate);
        return fRate;
    }
};
RateService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(rate_repository_1.RateRepository)),
    __metadata("design:paramtypes", [rate_repository_1.RateRepository])
], RateService);
exports.RateService = RateService;
//# sourceMappingURL=rate.service.js.map