export declare class CreateProductInput {
    sku: string;
    supplier_sku: string;
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
    tag_ids: number[];
}
