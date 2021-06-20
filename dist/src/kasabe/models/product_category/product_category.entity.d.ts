import { BaseEntity } from 'typeorm';
import { Product } from '../product/product.entity';
export declare class ProductCategory extends BaseEntity {
    id: number;
    category_name: string;
    category_description: string;
    children: ProductCategory[];
    parent: ProductCategory;
    parentId: number;
    flag_product: Product;
    flag_product_id: number;
    picture_url: string;
    isActive: boolean;
    products: Product[];
}
