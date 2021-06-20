import { BuildTagInput } from '../../tag/dto/create_tag.input';
export declare class UpdateMerchantInput {
    merchant_id: number;
    merchant_title: string;
    tiny_description: string;
    long_description: string;
    contact_name: string;
    instagram_url: string;
    number_call: string;
    number_whatsapp: string;
    number_telegram: string;
    bank_card_number: string;
    bank_card_details: string;
    avatar_url: string;
    header_url: string;
    note: string;
    location: string;
    product_category_id?: number;
    tag_ids: number[];
    tag_inputs: BuildTagInput[];
}
