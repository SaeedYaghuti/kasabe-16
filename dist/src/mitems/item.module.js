"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const item_resolver_1 = require("./item.resolver");
const item_repository_1 = require("./item.repository");
const database_module_1 = require("../database/database.module");
const graphql_1 = require("@nestjs/graphql");
let ItemModule = class ItemModule {
};
ItemModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql'
            }),
        ],
        providers: [item_repository_1.ItemRepository, items_service_1.ItemService, item_resolver_1.ItemResolver],
    })
], ItemModule);
exports.ItemModule = ItemModule;
//# sourceMappingURL=item.module.js.map