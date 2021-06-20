import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { MerchantCategoryRepository } from './merchant_category.repository';

@Injectable()
export class MerchantCategoryService {
    constructor(
        // MerchantCategory
        @InjectRepository(MerchantCategoryRepository)
        private merchantCategoryRepository: MerchantCategoryRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    // #region  Merchant_Category
    async build(category: BuildMerchantCategoryInput): Promise<MerchantCategory> {
        console.log('service build() is running');
        const gpCategory = await this.merchantCategoryRepository.build(category);
        console.log('service build() db resutlt merchant:> ');
        console.log(gpCategory);
        return gpCategory;
    }
    async rebuild(category: UpdateMerchantCategoryInput): Promise<MerchantCategory> {
        console.log('service rebuild() is running');
        const gpCategory = await this.merchantCategoryRepository.rebuild(category);
        console.log('service rebuild() db resutlt merchant:> ');
        console.log(gpCategory);
        return gpCategory;
    }
    async fetchById( rId: number ): Promise<MerchantCategory> {
        console.log('service fetchById() is running');
        const fCategory = await this.merchantCategoryRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fCategory:> ');
        console.log(fCategory);

        // const fctg1 = await this.merchantCategoryRepository.manager.getTreeRepository(MerchantCategory).findTrees();
        // console.log(JSON.stringify(fctg1));

        return fCategory;
    }
    //#endregion
 
}
