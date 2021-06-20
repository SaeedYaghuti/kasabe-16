import { Injectable } from '@nestjs/common';
import { ItemType } from './dto/create-item.dto';
import { ItemInput } from './dto/input-items.input';

@Injectable()
export class ItemsService {

    itemsStore: ItemType[] = [
        {
            id: "1",
            title: "first item",
            description: "greate item",
            price: 10.5
        },
        {
            id: "2",
            title: "second item",
            description: "awfull item",
            price: 12.5
        }
    ] 

    constructor(){}

    async create(createItemDto: ItemInput): Promise<ItemType> {
        const createdItem: ItemType = {
            id: "3",
            title: "third item",
            description: "greate item",
            price: 10.5
        }
        
        this.itemsStore.push(createdItem);

        return createdItem;
    }
    
    async findAll(): Promise<ItemType[]> {
        return this.itemsStore;
    }
    
    async findOne(id: string): Promise<ItemType> {
        
        return this.itemsStore.find(item => item.id === id);
    }
    
    async delete(id: string): Promise<ItemType> {

        const index = this.itemsStore.findIndex(item => item.id === id); 
        const item = this.itemsStore[index];

        this.itemsStore.splice(index, 1);

        return item;
    }
    
    async update(id: string, item: ItemType): Promise<ItemType> {

        const index = this.itemsStore.findIndex(item => item.id === id); 
        const fItem = this.itemsStore[index];

        const uItem = Object.assign(fItem, item);

        this.itemsStore[index] = uItem;

        return uItem;
    }

}
