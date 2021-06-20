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
const heart_repository_1 = require("./heart.repository");
let HeartService = class HeartService {
    constructor(heartRepository) {
        this.heartRepository = heartRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(heart) {
        console.log('service build() is running');
        const gHeart = await this.heartRepository.build(heart);
        console.log('service build() db resutlt heart:> ');
        console.log(gHeart);
        return gHeart;
    }
    async rebuild(heart) {
        console.log('service rebuild() is running');
        const gHeart = await this.heartRepository.rebuild(heart);
        console.log('service rebuild() db resutlt heart:> ');
        console.log(gHeart);
        return gHeart;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fHeart = await this.heartRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fHeart:> ');
        console.log(fHeart);
        return fHeart;
    }
};
HeartService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(heart_repository_1.HeartRepository)),
    __metadata("design:paramtypes", [heart_repository_1.HeartRepository])
], HeartService);
exports.HeartService = HeartService;
//# sourceMappingURL=heart.service.js.map