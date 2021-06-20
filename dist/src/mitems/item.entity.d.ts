import { BaseEntity } from 'typeorm';
export declare class Item extends BaseEntity {
    item_id: number;
    item_title: string;
    item_description?: string;
}
