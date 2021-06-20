import { MerchantRepository } from './merchant.repository';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Merchant } from './merchant.entity';
export declare class MerchantService {
    private merchantRepository;
    constructor(merchantRepository: MerchantRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(merchant: BuildMerchantInput): Promise<Merchant>;
    rebuild(merchant: UpdateMerchantInput): Promise<Merchant>;
    fetchById(rId: number): Promise<Merchant>;
}
