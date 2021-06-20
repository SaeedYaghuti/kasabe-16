"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("./auth.entity");
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const common_2 = require("@nestjs/common");
const auth_type_enum_1 = require("./auth_type.enum");
let AuthRepository = class AuthRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_2.Logger('AuthRepository');
    }
    async build(rAuth) {
        console.log('AuthRepository rData: ', rAuth);
        const { auth_type, authname, password } = rAuth;
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const nAuth = new auth_entity_1.Auth();
        nAuth.authname = authname;
        nAuth.salt = salt;
        nAuth.password = hashedPass;
        nAuth.auth_type = auth_type_enum_1.AuthType.ADMIN;
        nAuth.roles = rAuth.auth_type;
        try {
            const gAuth = await nAuth.save();
            console.log('gAuth: ', gAuth);
            return gAuth;
        }
        catch (error) {
            console.log("<auth.repository| creataeAuth| error>", error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Authname already exist in database');
            }
            else {
                throw new common_1.InternalServerErrorException('There was a problem when adding auth to database');
            }
        }
    }
    async validateLoginInput(loginAuthInput) {
        const { authname, password } = loginAuthInput;
        const auth = await auth_entity_1.Auth.findOne({ authname });
        if (auth && (await auth.validatePassword(password))) {
            return auth.authname;
        }
        else {
            return null;
        }
    }
    async rebuild(rAuth) {
        console.log('AuthRepository rData: ', rAuth);
        const nAuth = new auth_entity_1.Auth();
        nAuth.auth_id = rAuth.auth_id;
        nAuth.auth_type = rAuth.auth_role;
        nAuth.authname = rAuth.authname;
        try {
            await nAuth.save();
            const fAuth = await auth_entity_1.Auth.findOne(rAuth.auth_id);
            console.log('fAuth: ', fAuth);
            return fAuth;
        }
        catch (error) {
            this.logger.error(`!> Failed to update auth: ${JSON.stringify(rAuth)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update auth',
                origin: '@auth.repository.ts',
                auth: rAuth,
            });
        }
    }
    async fetchById(rId) {
        console.log('AuthRepository rId: ', rId);
        try {
            const fAuth = await auth_entity_1.Auth.findOne(rId);
            console.log('fAuth: ', fAuth);
            return fAuth;
        }
        catch (error) {
            this.logger.error(`!> Failed to fetch auth by id: ${JSON.stringify(rId)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch auth',
                origin: '@auth.repository.ts',
                auth_id: rId,
            });
        }
    }
    async signUp(authCredentialsDto) {
        const { authname, password } = authCredentialsDto;
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password, salt);
        const auth = new auth_entity_1.Auth();
        auth.authname = authname;
        auth.salt = salt;
        auth.password = hashedPass;
        try {
            return await auth.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Authname already exist in database');
            }
            else {
                throw new common_1.InternalServerErrorException('There was a problem when adding auth to database');
            }
        }
    }
    async validateAuthPassword(authCredentialsDto) {
        console.log('<validateAuthPassword |authCredentialsDto>', authCredentialsDto);
        const { authname, password } = authCredentialsDto;
        const auth = await this.findOne({ authname });
        console.log('<validateAuthPassword |auth>', auth);
        if (auth && (await auth.validatePassword(password))) {
            return auth.authname;
        }
        else {
            return null;
        }
    }
};
AuthRepository = __decorate([
    typeorm_1.EntityRepository(auth_entity_1.Auth)
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map