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
const auth_repository_1 = require("./auth/auth.repository");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, authRepository) {
        this.jwtService = jwtService;
        this.authRepository = authRepository;
        this.logger = new common_1.Logger('AuthService');
    }
    async testQuery(message) {
        return await { message };
    }
    async build(auth) {
        console.log('service build() is running');
        const gAuth = await this.authRepository.build(auth);
        console.log('service build() db resutlt auth:> ');
        console.log(gAuth);
        return gAuth;
    }
    async loginAuth(loginAuthInput) {
        const authname = await this.authRepository.validateLoginInput(loginAuthInput);
        if (!authname) {
            throw new common_1.UnauthorizedException('Invalid authname or password!');
        }
        const payload = { authname };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async rebuild(auth) {
        console.log('service rebuild() is running');
        const gAuth = await this.authRepository.rebuild(auth);
        console.log('service rebuild() db resutlt auth:> ');
        console.log(gAuth);
        return gAuth;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fAuth = await this.authRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fAuth:> ');
        console.log(fAuth);
        return fAuth;
    }
    async signUp(authCredentialsDto) {
        return this.authRepository.signUp(authCredentialsDto);
    }
    async signIn(authCredentialsDto) {
        const authname = await this.authRepository.validateAuthPassword(authCredentialsDto);
        if (!authname) {
            throw new common_1.UnauthorizedException('Invalid authname or password!');
        }
        const payload = { authname };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(auth_repository_1.AuthRepository)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        auth_repository_1.AuthRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map