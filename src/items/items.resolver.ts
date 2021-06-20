import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ItemType } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { ItemInput } from './dto/input-items.input';

@Resolver('Items')
export class ItemsResolver {

    constructor(
        private readonly itemsService: ItemsService,
    ){}

    @Query(() => [ItemType])
    async items(): Promise<ItemType[]> {
        return this.itemsService.findAll();
    }
    
    @Mutation(() => ItemType)
    async createItem(@Args('input') input: ItemInput): Promise<ItemInput> {
        console.log('<_items mutation createItem> input', input);
        return this.itemsService.create(input);
    }
    
    @Mutation(() => ItemType)
    async updateItem(
        @Args('id') id: string, 
        @Args('input') input: ItemInput
    ): Promise<ItemInput> {
        return this.itemsService.update(id, input);
    }
    
    @Mutation(() => ItemType)
    async deleteItem(
        @Args('id') id: string, 
    ): Promise<ItemInput> {
        return this.itemsService.delete(id);
    }
    
    @Query(() => String)
    async hello( ): Promise<string> {
        return 'hello';
    }

}
