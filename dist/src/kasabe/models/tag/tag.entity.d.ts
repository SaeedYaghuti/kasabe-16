import { BaseEntity } from 'typeorm';
import { Product } from '../product/product.entity';
import { BuildTagInput } from './dto/create_tag.input';
import { Merchant } from '../merchant/merchant.entity';
export declare class Tag extends BaseEntity {
    tag_id: number;
    tag_title: string;
    products: Product[];
    merchants: Merchant[];
    static of(rTag: BuildTagInput): Tag;
    checkDataValidation(): Promise<void>;
}
