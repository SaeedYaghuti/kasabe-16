import { BaseEntity } from 'typeorm';
import { Merchant } from '../merchant/merchant.entity';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
export declare class MerchantCategory extends BaseEntity {
    id: number;
    category_name: string;
    category_description: string;
    children: MerchantCategory[];
    parent: MerchantCategory;
    parentId: number;
    flag_merchant: Merchant;
    flag_merchant_id: number;
    picture_url: string;
    isActive: boolean;
    merchants: Merchant[];
    static of(rMerchantCategory: BuildMerchantCategoryInput): MerchantCategory;
    checkDataValidation(): Promise<void>;
}
