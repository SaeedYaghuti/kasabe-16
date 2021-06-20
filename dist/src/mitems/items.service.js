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
const item_repository_1 = require("./item.repository");
let ItemService = class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async createItem(item) {
        console.log('service createItem() is running');
        const gItem = await this.itemRepository.createItem(item);
        console.log('service createItem() db resutlt item:> ');
        console.log(gItem);
        return gItem;
    }
    async updateItem(item) {
        console.log('service updateItem() is running');
        const gItem = await this.itemRepository.updateItem(item);
        console.log('service updateItem() db resutlt item:> ');
        console.log(gItem);
        return gItem;
    }
    async getItemById(rId) {
        console.log('service getItemById() is running');
        const fItem = await this.itemRepository.getItemById(rId);
        console.log('service getItemById() db resutlt fItem:> ');
        console.log(fItem);
        return fItem;
    }
    async getItems() {
        console.log('service getItems() is running');
        const fItems = await this.itemRepository.getItems();
        console.log('service getItems() db resutlt fItems:> ');
        console.log(fItems);
        return fItems;
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(item_repository_1.ItemRepository)),
    __metadata("design:paramtypes", [item_repository_1.ItemRepository])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=items.service.js.map