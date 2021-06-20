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
const graphql_1 = require("@nestjs/graphql");
const auth_entity_1 = require("./auth/auth.entity");
const auth_service_1 = require("./auth.service");
const message_type_1 = require("../util/type/message.type");
const create_auth_input_1 = require("./auth/dto/create.auth.input");
const login_auth_input_1 = require("./auth/dto/login_auth.input");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("./guard/gql_auth.guard");
const current_auth_decorator_1 = require("./decorator/current_auth.decorator");
const roles_decorator_1 = require("./decorator/roles.decorator");
const roles_guard_1 = require("./guard/roles.guard");
const nest_access_control_1 = require("nest-access-control");
const acguard_guard_1 = require("./guard/acguard.guard");
const auth_roles_decorator_1 = require("./decorator/auth_roles.decorator");
const login_token_type_1 = require("./role/dto/login_token.type");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async authTestQuery(message) {
        console.log('authTestQuery is running...');
        return await this.authService.testQuery(message);
    }
    async authTestMutation(message) {
        return await this.authService.testQuery(message);
    }
    async testGuardQuery(message) {
        console.log('testGuardQuery is running...');
        return await this.authService.testQuery(message);
    }
    async whoAmI(auth) {
        console.log("<auth.resolver| whoAmI| auth", auth);
        return auth;
    }
    async testAC(auth) {
        console.log("<auth.resolver| testAC| auth>", auth);
        return auth;
    }
    async testRBAC(authRoles) {
        console.log("<auth.resolver| testRBAC| authRoles>", authRoles);
        return "testRBAC";
    }
    async build(auth) {
        console.log('mutation build() is running...');
        return await this.authService.build(auth);
    }
    async loginAuth(loginAuthInput) {
        console.log('mutation loginAuth() is running...');
        return await this.authService.loginAuth(loginAuthInput);
    }
};
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "authTestQuery", null);
__decorate([
    graphql_1.Mutation(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "authTestMutation", null);
__decorate([
    graphql_1.Query(() => message_type_1.MessageType),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "testGuardQuery", null);
__decorate([
    graphql_1.Query(() => auth_entity_1.Auth),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard),
    __param(0, current_auth_decorator_1.CurrentAuth()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.Auth]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "whoAmI", null);
__decorate([
    graphql_1.Query(() => auth_entity_1.Auth),
    roles_decorator_1.Roles('admin'),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    __param(0, current_auth_decorator_1.CurrentAuth()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.Auth]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "testAC", null);
__decorate([
    graphql_1.Query(() => String),
    common_1.UseGuards(gql_auth_guard_1.GqlAuthGuard, acguard_guard_1.GqlACGuard),
    nest_access_control_1.UseRoles({
        resource: 'video',
        action: 'read',
        possession: 'any',
    }),
    __param(0, auth_roles_decorator_1.GqlAuthRoles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "testRBAC", null);
__decorate([
    graphql_1.Mutation(() => auth_entity_1.Auth),
    __param(0, graphql_1.Args('auth')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_input_1.CreateAuthInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "build", null);
__decorate([
    graphql_1.Query(() => login_token_type_1.LoginToken),
    __param(0, graphql_1.Args('loginAuthInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_input_1.LoginAuthInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginAuth", null);
AuthResolver = __decorate([
    graphql_1.Resolver('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map