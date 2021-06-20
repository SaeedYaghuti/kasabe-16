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
const merchant_category_entity_1 = require("./merchant_category.entity");
let MerchantCategoryRepository = class MerchantCategoryRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('MerchantCategoryRepository');
    }
    async build(rCategory) {
        console.log('MerchantCategoryRepository rData: ', rCategory);
        const nCategory = new merchant_category_entity_1.MerchantCategory();
        Object.assign(nCategory, rCategory);
        const gMerchantCategory = await merchant_category_entity_1.MerchantCategory.save(nCategory);
        return this.fetchById(gMerchantCategory.id);
    }
    async fetchById(rId) {
        console.log('fetchById rId: ', rId);
        const fMerchantCategory = await merchant_category_entity_1.MerchantCategory.findOne({
            where: { id: rId },
            relations: ["children", "parent", "flag_merchant", "merchants"],
        });
        return fMerchantCategory;
    }
    async rebuild(rCategory) {
        console.log('MerchantCategoryRepository rData: ', rCategory);
        const fMerchantCategory = await merchant_category_entity_1.MerchantCategory.findOneOrFail(rCategory.id);
        const tuMerchantCategory = Object.assign(fMerchantCategory, rCategory);
        await merchant_category_entity_1.MerchantCategory.save(tuMerchantCategory);
        const uMerchantCategory = this.fetchById(rCategory.id);
        return uMerchantCategory;
    }
};
MerchantCategoryRepository = __decorate([
    typeorm_1.EntityRepository(merchant_category_entity_1.MerchantCategory)
], MerchantCategoryRepository);
exports.MerchantCategoryRepository = MerchantCategoryRepository;
class MerchantCategoryRepositoryFake {
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
exports.MerchantCategoryRepositoryFake = MerchantCategoryRepositoryFake;
//# sourceMappingURL=merchant_category.repository.js.map