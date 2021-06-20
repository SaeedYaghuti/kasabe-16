import { BaseEntity } from 'typeorm';
import { Product } from './product.entity';
import { ProductAttribute } from './product_attribute.entity';
export declare class ProductAttributeValueString extends BaseEntity {
    value_id: number;
    product: Product;
    attribute: ProductAttribute;
    value: string;
    unit: string;
}
