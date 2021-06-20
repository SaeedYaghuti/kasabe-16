import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
import { ProductCategory } from './product_category.entity';
import { ProductCategoryRepository } from './product_category.repository';

@Injectable()
export class ProductCategoryService {
    constructor(
        // ProductCategory
        @InjectRepository(ProductCategoryRepository)
        private productCategoryRepository: ProductCategoryRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    // #region  Product_Category
    async build(category: CreateProductCategoryInput): Promise<ProductCategory> {
        console.log('service build() is running');
        const gpCategory = await this.productCategoryRepository.build(category);
        console.log('service build() db resutlt product:> ');
        console.log(gpCategory);
        return gpCategory;
    }
    async rebuild(category: UpdateProductCategoryInput): Promise<ProductCategory> {
        console.log('service rebuild() is running');
        const gpCategory = await this.productCategoryRepository.rebuild(category);
        console.log('service rebuild() db resutlt product:> ');
        console.log(gpCategory);
        return gpCategory;
    }
    async fetchById( rId: number ): Promise<ProductCategory> {
        console.log('service fetchById() is running');
        const fCategory = await this.productCategoryRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fCategory:> ');
        console.log(fCategory);

        // const fctg1 = await this.productCategoryRepository.manager.getTreeRepository(ProductCategory).findTrees();
        // console.log(JSON.stringify(fctg1));

        return fCategory;
    }
    //#endregion
 
}
