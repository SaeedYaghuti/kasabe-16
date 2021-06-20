import { MerchantCategoryService } from './merchant_category.service';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class MerchantCategoryResolver {
    private merchantCategoryService;
    constructor(merchantCategoryService: MerchantCategoryService);
    merchantCategoryTestQuery(message: string): Promise<MessageType>;
    merchantCategoryTestMutation(message: string): Promise<MessageType>;
    build(merchantCategory: BuildMerchantCategoryInput): Promise<MerchantCategory>;
    fetchById(merchantCategory_id: number): Promise<MerchantCategory>;
    rebuild(merchantCategory: UpdateMerchantCategoryInput): Promise<MerchantCategory>;
}
