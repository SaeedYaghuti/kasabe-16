import { BaseEntity } from 'typeorm';
import { Product } from './product.entity';
import { ProductAttribute } from './product_attribute.entity';
export declare class ProductAttributeValueNumber extends BaseEntity {
    value_id: number;
    product: Product;
    attribute: ProductAttribute;
    value: number;
    unit: string;
}
