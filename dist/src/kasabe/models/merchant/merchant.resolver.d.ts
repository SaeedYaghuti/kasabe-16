import { MerchantService } from './merchant.service';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Merchant } from './merchant.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class MerchantResolver {
    private merchantService;
    constructor(merchantService: MerchantService);
    merchantTestQuery(message: string): Promise<MessageType>;
    merchantTestMutation(message: string): Promise<MessageType>;
    build(merchant: BuildMerchantInput): Promise<Merchant>;
    rebuild(merchant: UpdateMerchantInput): Promise<Merchant>;
    fetchById(merchant_id: number): Promise<Merchant>;
}
