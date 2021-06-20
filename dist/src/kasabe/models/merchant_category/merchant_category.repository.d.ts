import { Repository } from 'typeorm';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';
export declare class MerchantCategoryRepository extends Repository<MerchantCategory> {
    private logger;
    build(rCategory: BuildMerchantCategoryInput): Promise<MerchantCategory>;
    fetchById(rId: number): Promise<MerchantCategory>;
    rebuild(rCategory: UpdateMerchantCategoryInput): Promise<MerchantCategory>;
}
export declare class MerchantCategoryRepositoryFake {
    build(): Promise<void>;
    rebuild(): Promise<void>;
    fetchById(): Promise<void>;
}
