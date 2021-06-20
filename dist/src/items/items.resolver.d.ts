import { ItemType } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ItemInput } from './dto/input-items.input';
export declare class ItemsResolver {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    items(): Promise<ItemType[]>;
    createItem(input: ItemInput): Promise<ItemInput>;
    updateItem(id: string, input: ItemInput): Promise<ItemInput>;
    deleteItem(id: string): Promise<ItemInput>;
    hello(): Promise<string>;
}
