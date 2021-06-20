import { CreateItemInput } from './dto/create_item.input';
import { ItemRepository } from './item.repository';
import { Item } from './item.entity';
import { UpdateItemInput } from './dto/update_item.input';
export declare class ItemService {
    private itemRepository;
    constructor(itemRepository: ItemRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    createItem(item: CreateItemInput): Promise<Item>;
    updateItem(item: UpdateItemInput): Promise<Item>;
    getItemById(rId: number): Promise<Item>;
    getItems(): Promise<Item[]>;
}
