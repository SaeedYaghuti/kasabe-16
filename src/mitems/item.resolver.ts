import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ItemService } from './items.service';
import { CreateItemInput } from './dto/create_item.input';
import { Item } from './item.entity';
import { UpdateItemInput } from './dto/update_item.input';
import { Int} from 'type-graphql';
import { Greet } from './dto/message.type';

@Resolver('Item')
export class ItemResolver {
    
    constructor(
        private itemService: ItemService,
    ) {}

    @Mutation(() => Item)
    async createItem( @Args('item') item: CreateItemInput ): Promise<Item> {
        console.log('mitems mutation createItem() is running...');
        const gItem = await this.itemService.createItem(item);
        
        return gItem;
    }

    @Mutation(() => Item)
    async updateItem( @Args('item') item: UpdateItemInput ): Promise<Item> {
        console.log('mitems mutation updateItem() is running...');
        return await this.itemService.updateItem(item);
    }

    @Query(() => Item)
    async getItemById (@Args('item_id') rId: number): Promise<Item> {
        return await this.itemService.getItemById(rId);
    }
    
    @Query(() => [Item])
    async getItems (): Promise<Item[]> {
        return await this.itemService.getItems();
    }
    
    @Query(() => Greet)
    async itemGreet (): Promise<Greet> {
        const greet: Greet = {
            to: "world",
            title: "Hello world!",
            time: "all day"
        }
        return greet;
    }
    
    @Query(() => String)
    async say (@Args('message') message: string): Promise<string> {
        return message;
    }
    

}
