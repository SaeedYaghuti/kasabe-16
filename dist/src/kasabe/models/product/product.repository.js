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
const product_entity_1 = require("./product.entity");
const tag_entity_1 = require("../tag/tag.entity");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('ProductRepository');
    }
    async build(rProduct) {
        console.log('repostory rData: ', rProduct);
        const nProduct = new product_entity_1.Product();
        Object.assign(nProduct, rProduct);
        const gProduct = await product_entity_1.Product.save(nProduct);
        return this.fetchById(gProduct.product_id);
    }
    async fetchById(rId) {
        console.log('fetchById rId: ', rId);
        const fProduct = await product_entity_1.Product.findOne({
            where: { product_id: rId },
            relations: ["category", "tags", "order_details"],
        });
        console.log('fetchById fProduct: ', fProduct);
        return fProduct;
    }
    async rebuild(rProduct) {
        console.log('repostory rData: ', rProduct);
        const nProduct = new product_entity_1.Product();
        nProduct.product_id = rProduct.product_id;
        nProduct.sku = rProduct.sku;
        nProduct.supplier_sku = rProduct.supplier_sku;
        nProduct.supplier_sku = rProduct.supplier_sku;
        nProduct.product_category_id = rProduct.product_category_id;
        nProduct.product_name = rProduct.product_name;
        nProduct.msrp = rProduct.msrp;
        nProduct.price = rProduct.price;
        nProduct.price_currency = rProduct.price_currency;
        nProduct.currency_symbole = rProduct.currency_symbole;
        nProduct.unit_title = rProduct.unit_title;
        nProduct.unit_weight = rProduct.unit_weight;
        nProduct.unit_weight_title = rProduct.unit_weight_title;
        nProduct.is_discount = rProduct.is_discount;
        nProduct.discount = rProduct.discount;
        nProduct.ranking = rProduct.ranking;
        nProduct.reorder_level = rProduct.reorder_level;
        nProduct.is_active = rProduct.is_active;
        const tagEntities = [];
        for (const tagEl of rProduct.rebuildsInput) {
            const nTag = new tag_entity_1.Tag();
            nTag.tag_id = tagEl.tag_id;
            nTag.tag_title = tagEl.tag_title;
            tagEntities.push(nTag);
        }
        nProduct.tags = tagEntities;
        try {
            const gPrd = await nProduct.save();
            console.log('gPrd: ', gPrd);
            return gPrd;
        }
        catch (error) {
            this.logger.error(`!> Failed to update product: ${JSON.stringify(rProduct)} ";`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update product',
                origin: '@product.repository.ts',
                product: rProduct,
                error: error.stack,
            });
        }
    }
};
ProductRepository = __decorate([
    typeorm_1.EntityRepository(product_entity_1.Product)
], ProductRepository);
exports.ProductRepository = ProductRepository;
class ProductRepositoryFake {
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
exports.ProductRepositoryFake = ProductRepositoryFake;
//# sourceMappingURL=product.repository.js.map