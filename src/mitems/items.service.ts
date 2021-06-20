import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create_item.input';

import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from './item.repository';
import { Item } from './item.entity';
import { UpdateItemInput } from './dto/update_item.input';

@Injectable()
export class ItemService {
    constructor(
        // Item
        @InjectRepository(ItemRepository)
        private itemRepository: ItemRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Item
    async createItem(item: CreateItemInput): Promise<Item> {
        console.log('service createItem() is running');
        const gItem = await this.itemRepository.createItem(item);
        console.log('service createItem() db resutlt item:> ');
        console.log(gItem);
        return gItem;
    }

    async updateItem(item: UpdateItemInput): Promise<Item> {
        console.log('service updateItem() is running');
        const gItem = await this.itemRepository.updateItem(item);
        console.log('service updateItem() db resutlt item:> ');
        console.log(gItem);
        return gItem;
    }

    async getItemById ( rId: number ): Promise<Item> {
        console.log('service getItemById() is running');
        const fItem = await this.itemRepository.getItemById(rId);
        console.log('service getItemById() db resutlt fItem:> ');
        console.log(fItem);
        return fItem;
    }
    
    async getItems (): Promise<Item[]> {
        console.log('service getItems() is running');
        const fItems = await this.itemRepository.getItems();
        console.log('service getItems() db resutlt fItems:> ');
        console.log(fItems);
        return fItems;
    }
    //#endregion
 
}

