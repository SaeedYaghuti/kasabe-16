import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { Item } from './item.entity';
import { CreateItemInput } from './dto/create_item.input';
import { UpdateItemInput } from './dto/update_item.input';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  private logger = new Logger('ItemRepository');

  // Item
  async createItem( rItem: CreateItemInput ): Promise<Item> {
    console.log('ItemRepository rItem: ', rItem);

    const nItem = new Item();
    nItem.item_title = rItem.item_title;
    nItem.item_description = rItem.item_description;

    try {
      const gItem = await nItem.save();
      console.log('gItem: ', gItem);
      return gItem;
    } catch (error) {
      throw new InternalServerErrorException({
        // message: '!> Failed to update item',
        // origin: '@item.repository.ts',
        // item: rItem,
        error: error.stack,
      });
    }
  }
  
  
  // Item
  async updateItem( rItem: UpdateItemInput ): Promise<Item> {
    console.log('ItemRepository rData: ', rItem);

    try {
      const fItem = await Item.findOne({ item_id: rItem.item_id});

      if(fItem) {
        fItem.item_title = rItem?.item_title;
        fItem.item_description = rItem?.item_description;
      }

      try {
        const uItem = await Item.save(fItem);
        console.log('uItem: ', uItem);
        return uItem;
      } catch (error) {
        throw new InternalServerErrorException({
          message: '!> Failed to save item',
          origin: '@item.repository.ts',
          item: rItem,
          error: error.stack,
        });
      }
      
      
    } catch (error) {
      throw new InternalServerErrorException({
        message: '!> Failed to save item',
        origin: '@item.repository.ts',
        item: rItem,
        error: error.stack,
      });
    }
    
    
  }

  // Get
  async getItemById( rId: number ): Promise<Item> {
    console.log('ItemRepository rId: ', rId);

    try {
      
      const item = await Item.findOne({ item_id: rId})

      console.log('f-item: ', item);
      return item;
    } catch (error) {
      throw new InternalServerErrorException({
        message: '!> Failed to fetch item',
        origin: '@item.repository.ts',
        item_id: rId,
        error: error.stack,
      });
    }
  }
  
  async getItems(): Promise<Item[]> {

    try {
      
      const items = await Item.find();

      console.log('f-items: ', items);
      return items;
    } catch (error) {
      throw new InternalServerErrorException({
        message: '!> Failed to fetch item',
        origin: '@item.repository.ts',
        error: error.stack,
      });
    }
  }


}
