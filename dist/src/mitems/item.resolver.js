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
const items_service_1 = require("./items.service");
const create_item_input_1 = require("./dto/create_item.input");
const item_entity_1 = require("./item.entity");
const update_item_input_1 = require("./dto/update_item.input");
const message_type_1 = require("./dto/message.type");
let ItemResolver = class ItemResolver {
    constructor(itemService) {
        this.itemService = itemService;
    }
    async createItem(item) {
        console.log('mitems mutation createItem() is running...');
        const gItem = await this.itemService.createItem(item);
        return gItem;
    }
    async updateItem(item) {
        console.log('mitems mutation updateItem() is running...');
        return await this.itemService.updateItem(item);
    }
    async getItemById(rId) {
        return await this.itemService.getItemById(rId);
    }
    async getItems() {
        return await this.itemService.getItems();
    }
    async itemGreet() {
        const greet = {
            to: "world",
            title: "Hello world!",
            time: "all day"
        };
        return greet;
    }
    async say(message) {
        return message;
    }
};
__decorate([
    graphql_1.Mutation(() => item_entity_1.Item),
    __param(0, graphql_1.Args('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_input_1.CreateItemInput]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "createItem", null);
__decorate([
    graphql_1.Mutation(() => item_entity_1.Item),
    __param(0, graphql_1.Args('item')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_item_input_1.UpdateItemInput]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "updateItem", null);
__decorate([
    graphql_1.Query(() => item_entity_1.Item),
    __param(0, graphql_1.Args('item_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getItemById", null);
__decorate([
    graphql_1.Query(() => [item_entity_1.Item]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "getItems", null);
__decorate([
    graphql_1.Query(() => message_type_1.Greet),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "itemGreet", null);
__decorate([
    graphql_1.Query(() => String),
    __param(0, graphql_1.Args('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "say", null);
ItemResolver = __decorate([
    graphql_1.Resolver('Item'),
    __metadata("design:paramtypes", [items_service_1.ItemService])
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.resolver.js.map