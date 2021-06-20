import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemInput } from './dto/create_item.input';
import { UpdateItemInput } from './dto/update_item.input';
export declare class ItemRepository extends Repository<Item> {
    private logger;
    createItem(rItem: CreateItemInput): Promise<Item>;
    updateItem(rItem: UpdateItemInput): Promise<Item>;
    getItemById(rId: number): Promise<Item>;
    getItems(): Promise<Item[]>;
}
