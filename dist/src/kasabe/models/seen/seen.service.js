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
const seen_repository_1 = require("./seen.repository");
let SeenService = class SeenService {
    constructor(seenRepository) {
        this.seenRepository = seenRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(seen) {
        console.log('service build() is running');
        const gSeen = await this.seenRepository.build(seen);
        console.log('service build() db resutlt seen:> ');
        console.log(gSeen);
        return gSeen;
    }
    async rebuild(seen) {
        console.log('service rebuild() is running');
        const gSeen = await this.seenRepository.rebuild(seen);
        console.log('service rebuild() db resutlt seen:> ');
        console.log(gSeen);
        return gSeen;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fSeen = await this.seenRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fSeen:> ');
        console.log(fSeen);
        return fSeen;
    }
};
SeenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(seen_repository_1.SeenRepository)),
    __metadata("design:paramtypes", [seen_repository_1.SeenRepository])
], SeenService);
exports.SeenService = SeenService;
//# sourceMappingURL=seen.service.js.map