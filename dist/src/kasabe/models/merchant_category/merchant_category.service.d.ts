import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { MerchantCategoryRepository } from './merchant_category.repository';
export declare class MerchantCategoryService {
    private merchantCategoryRepository;
    constructor(merchantCategoryRepository: MerchantCategoryRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(category: BuildMerchantCategoryInput): Promise<MerchantCategory>;
    rebuild(category: UpdateMerchantCategoryInput): Promise<MerchantCategory>;
    fetchById(rId: number): Promise<MerchantCategory>;
}
