import { BaseEntity } from 'typeorm';
import { ProductCategory } from '../product_category/product_category.entity';
import { Tag } from '../tag/tag.entity';
import { OrderDetails } from '../order_details/order_details.entity';
export declare class Product extends BaseEntity {
    product_id: number;
    sku: string;
    supplier_sku?: string;
    category?: ProductCategory;
    product_category_id?: number;
    product_name: string;
    msrp: number;
    price: number;
    price_currency: string;
    currency_symbole: string;
    unit_title: string;
    unit_weight: number;
    unit_weight_title: string;
    is_discount: boolean;
    discount: number;
    ranking: number;
    reorder_level: number;
    is_active: boolean;
    tags: Tag[];
    order_details: OrderDetails[];
}
