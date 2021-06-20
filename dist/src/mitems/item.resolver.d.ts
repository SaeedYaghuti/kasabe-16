import { ItemService } from './items.service';
import { CreateItemInput } from './dto/create_item.input';
import { Item } from './item.entity';
import { UpdateItemInput } from './dto/update_item.input';
import { Greet } from './dto/message.type';
export declare class ItemResolver {
    private itemService;
    constructor(itemService: ItemService);
    createItem(item: CreateItemInput): Promise<Item>;
    updateItem(item: UpdateItemInput): Promise<Item>;
    getItemById(rId: number): Promise<Item>;
    getItems(): Promise<Item[]>;
    itemGreet(): Promise<Greet>;
    say(message: string): Promise<string>;
}
