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
const product_repository_1 = require("./product.repository");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async testQuery(message) {
        return await { message };
    }
    async build(product) {
        console.log('service build() is running');
        const gProduct = await this.productRepository.build(product);
        console.log('service build() db resutlt product:> ');
        console.log(gProduct);
        return gProduct;
    }
    async rebuild(product) {
        console.log('service rebuild() is running');
        const gProduct = await this.productRepository.rebuild(product);
        console.log('service rebuild() db resutlt product:> ');
        console.log(gProduct);
        return gProduct;
    }
    async fetchById(rId) {
        console.log('service fetchById() is running');
        const fProduct = await this.productRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fProduct:> ');
        console.log(fProduct);
        return fProduct;
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(product_repository_1.ProductRepository)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map