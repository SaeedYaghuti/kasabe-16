import { Repository } from 'typeorm';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Merchant } from '../merchant';
export declare class FetchMerchantInput {
    merchant_id: number;
    auth_id: number;
    post_offset: number;
    post_limit: number;
    comment_offset: number;
    comment_limit: number;
    rate_offset: number;
    rate_limit: number;
    child_post_offset: number;
    child_post_limit: number;
    child_comment_offset: number;
    child_comment_limit: number;
    child_rate_offset: number;
    child_rate_limit: number;
}
export declare class MerchantRepository extends Repository<Merchant> {
    build(rMerchant: BuildMerchantInput): Promise<Merchant>;
    rebuild(rMerchant: UpdateMerchantInput): Promise<Merchant>;
    fetchById(rId: number): Promise<Merchant>;
    fetch01(i: FetchMerchantInput): Promise<Merchant>;
    fetch02(i: FetchMerchantInput): Promise<any>;
    fetch03(i: FetchMerchantInput): Promise<any>;
    fetch04(i: FetchMerchantInput): Promise<any>;
    fetch05(i: FetchMerchantInput): Promise<any>;
}
