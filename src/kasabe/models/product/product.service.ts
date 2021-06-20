import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create_product.input';
import { UpdateProductInput } from './dto/update_product.input';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        // Product
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    // #region Product
    async build(product: CreateProductInput): Promise<Product> {
        console.log('service build() is running');
        const gProduct = await this.productRepository.build(product);
        console.log('service build() db resutlt product:> ');
        console.log(gProduct);
        return gProduct;
    }
    async rebuild(product: UpdateProductInput): Promise<Product> {
        console.log('service rebuild() is running');
        const gProduct = await this.productRepository.rebuild(product);
        console.log('service rebuild() db resutlt product:> ');
        console.log(gProduct);
        return gProduct;
    }
    async fetchById( rId: number ): Promise<Product> {
        console.log('service fetchById() is running');
        const fProduct = await this.productRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fProduct:> ');
        console.log(fProduct);

        // const fctg1 = await this.productRepository.manager.getTreeRepository(Product).findTrees();
        // console.log(JSON.stringify(fctg1));

        return fProduct;
    }
    //#endregion
 
}
