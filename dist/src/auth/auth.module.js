"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const auth_repository_1 = require("./auth/auth.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const graphql_1 = require("@nestjs/graphql");
const auth_resolver_1 = require("./auth.resolver");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                property: 'auth',
                session: false,
            }),
            jwt_1.JwtModule.register({
                secret: 'topSecret51',
                signOptions: {
                    expiresIn: 3600,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([auth_repository_1.AuthRepository]),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                context: ({ req }) => ({ req }),
            }),
        ],
        controllers: [],
        providers: [
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService,
            auth_resolver_1.AuthResolver,
        ],
        exports: [passport_1.PassportModule, jwt_1.JwtModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map