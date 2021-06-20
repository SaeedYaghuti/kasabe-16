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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const chat_module_1 = require("./chat/chat.module");
const realtime_module_1 = require("./realtime/realtime.module");
const database_1 = require("./database");
const items_module_1 = require("./items/items.module");
const nest_access_control_1 = require("nest-access-control");
const auth_roles_1 = require("./auth/auth.roles");
const file_module_1 = require("./file/file.module");
const kasabe_module_1 = require("./kasabe/kasabe.module");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
    configure(consumer) {
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_access_control_1.AccessControlModule.forRoles(auth_roles_1.roles),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
            }),
            database_1.DatabaseModule,
            auth_module_1.AuthModule,
            chat_module_1.ChatModule,
            realtime_module_1.RealtimeModule,
            items_module_1.ItemsModule,
            file_module_1.FileModule,
            kasabe_module_1.KasabeModule,
        ],
        controllers: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map