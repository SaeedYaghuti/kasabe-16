"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const item_entity_1 = require("./item.entity");
let ItemRepository = class ItemRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ItemRepository');
    }
    async createItem(rItem) {
        console.log('ItemRepository rItem: ', rItem);
        const nItem = new item_entity_1.Item();
        nItem.item_title = rItem.item_title;
        nItem.item_description = rItem.item_description;
        try {
            const gItem = await nItem.save();
            console.log('gItem: ', gItem);
            return gItem;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                error: error.stack,
            });
        }
    }
    async updateItem(rItem) {
        var _a, _b;
        console.log('ItemRepository rData: ', rItem);
        try {
            const fItem = await item_entity_1.Item.findOne({ item_id: rItem.item_id });
            if (fItem) {
                fItem.item_title = (_a = rItem) === null || _a === void 0 ? void 0 : _a.item_title;
                fItem.item_description = (_b = rItem) === null || _b === void 0 ? void 0 : _b.item_description;
            }
            try {
                const uItem = await item_entity_1.Item.save(fItem);
                console.log('uItem: ', uItem);
                return uItem;
            }
            catch (error) {
                throw new common_1.InternalServerErrorException({
                    message: '!> Failed to save item',
                    origin: '@item.repository.ts',
                    item: rItem,
                    error: error.stack,
                });
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to save item',
                origin: '@item.repository.ts',
                item: rItem,
                error: error.stack,
            });
        }
    }
    async getItemById(rId) {
        console.log('ItemRepository rId: ', rId);
        try {
            const item = await item_entity_1.Item.findOne({ item_id: rId });
            console.log('f-item: ', item);
            return item;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch item',
                origin: '@item.repository.ts',
                item_id: rId,
                error: error.stack,
            });
        }
    }
    async getItems() {
        try {
            const items = await item_entity_1.Item.find();
            console.log('f-items: ', items);
            return items;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to fetch item',
                origin: '@item.repository.ts',
                error: error.stack,
            });
        }
    }
};
ItemRepository = __decorate([
    typeorm_1.EntityRepository(item_entity_1.Item)
], ItemRepository);
exports.ItemRepository = ItemRepository;
//# sourceMappingURL=item.repository.js.map