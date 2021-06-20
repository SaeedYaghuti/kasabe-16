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
const product_category_entity_1 = require("./product_category.entity");
let ProductCategoryRepository = class ProductCategoryRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ProductCategoryRepository');
    }
    async build(rCategory) {
        console.log('ProductCategoryRepository rData: ', rCategory);
        const nCategory = new product_category_entity_1.ProductCategory();
        Object.assign(nCategory, rCategory);
        const gProductCategory = await product_category_entity_1.ProductCategory.save(nCategory);
        return this.fetchById(gProductCategory.id);
    }
    async fetchById(rId) {
        console.log('fetchById rId: ', rId);
        const fProductCategory = await product_category_entity_1.ProductCategory.findOne({
            where: { id: rId },
            relations: ["children", "parent", "flag_product", "products"],
        });
        return fProductCategory;
    }
    async rebuild(rCategory) {
        console.log('ProductCategoryRepository rData: ', rCategory);
        const fProductCategory = await product_category_entity_1.ProductCategory.findOneOrFail(rCategory.id);
        const tuProductCategory = Object.assign(fProductCategory, rCategory);
        await product_category_entity_1.ProductCategory.save(tuProductCategory);
        const uProductCategory = this.fetchById(rCategory.id);
        return uProductCategory;
    }
};
ProductCategoryRepository = __decorate([
    typeorm_1.EntityRepository(product_category_entity_1.ProductCategory)
], ProductCategoryRepository);
exports.ProductCategoryRepository = ProductCategoryRepository;
class ProductCategoryRepositoryFake {
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
exports.ProductCategoryRepositoryFake = ProductCategoryRepositoryFake;
//# sourceMappingURL=product_category.repository.js.map