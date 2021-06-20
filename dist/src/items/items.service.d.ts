import { ItemType } from './dto/create-item.dto';
import { ItemInput } from './dto/input-items.input';
export declare class ItemsService {
    itemsStore: ItemType[];
    constructor();
    create(createItemDto: ItemInput): Promise<ItemType>;
    findAll(): Promise<ItemType[]>;
    findOne(id: string): Promise<ItemType>;
    delete(id: string): Promise<ItemType>;
    update(id: string, item: ItemType): Promise<ItemType>;
}
