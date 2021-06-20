import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import request from 'supertest';
import { CreateItemInput } from './dto/create_item.input';
import { ItemModule } from './item.module';
import { ItemRepository } from './item.repository';
import { ItemService } from './items.service';
import { DatabaseModule } from '../database/database.module';
import { ItemResolver } from './item.resolver';
import { UpdateItemInput } from './dto/update_item.input';


describe('item.e2e.spec.ts', () => {

  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          ItemModule,
      ],
      providers: [
        ItemRepository,
        ItemService,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  }, 90000);

  afterAll(async () => {
    await app.close();
  });


  



  it('[1] createItem', () => {

      const createItemInput: CreateItemInput = {
        item_title: "first item",
        item_description: "first description"
      }

      // modifing third item
      const mCreateItemInput = JSON.stringify(createItemInput).replace(
        /\"([^(\")"]+)\":/g,
        '$1:',
      );

      const createItemQuery = 
      `
        mutation {
          createItem(item: ${mCreateItemInput}){
            item_id
            item_title
            item_description
          }
        }
      `;

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: createItemQuery
      })
      .expect(({ body }) => {
        `body: {"data":{"createItem":{"item_id":1,"item_title":"first item","item_description":"first description"}}}`;
        // console.log('<<[1]>> body:', JSON.stringify(body));
        
        const item = body.data?.createItem;
        expect(item).toBeDefined();

        expect(item.item_title).toBe(createItemInput.item_title);
        expect(item.item_description).toBe(createItemInput.item_description);
      })
      .expect(200);
  })

  it('[2] getItems', () => {
    const createItemInput: CreateItemInput = {
      item_title: "first item",
      item_description: "first description"
    }

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: `{  getItems { item_id, item_title, item_description } }`
    })
    .expect(({ body }) => {

      console.log('[2] body:', JSON.stringify(body));

      const items = body.data.getItems;
      const item1 = items[0];
      expect(items.length).toBeGreaterThan(0);

      expect(item1.item_title).toBe(createItemInput.item_title);
      expect(item1.item_description).toEqual(createItemInput.item_description);
    })
    .expect(200);

  });


  it('[3] updateItem', () => {
    const updatedItem: UpdateItemInput = {
      item_id: 2,
      item_title: "updated first item",
      item_description: "updated first description"
    }

    const updateItemObject = JSON.stringify(updatedItem).replace(
      /\"([^(\")"]+)\":/g,
      '$1:',
    );

    const updateItemQuery = 
    `
        mutation {
            updateItem(item: ${updateItemObject}){
              item_id
              item_title
              item_description
            }
        }
    `;

    
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: updateItemQuery,
    })
    .expect(({ body }) => {

      console.log('[3] body:', JSON.stringify(body));

      const uItem = body.data.updateItem;

      expect(uItem.item_id).toBe(updatedItem.item_id);
      expect(uItem.item_title).toBe(updatedItem.item_title);
      expect(uItem.item_description).toEqual(updatedItem.item_description);
    })
    .expect(200);
  });


  it('[4] deleteItem', () => {

    const updatedItem: UpdateItemInput = {
      item_id: 2,
      item_title: "updated first item",
      item_description: "updated first description"
    }

    const deleteItemQuery = 
    `
        query {
          getItemById(item_id: ${2}){
            item_id
            item_title
            item_description
          }
        }
    `;

    
    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: deleteItemQuery,
    })
    .expect(({ body }) => {

      console.assert(body.data?.getItemById, JSON.stringify(body));
      
      const item = body.data.getItemById;

      expect(item.item_id).toBe(updatedItem.item_id);
      expect(item.item_title).toBe(updatedItem.item_title);
      expect(item.item_description).toEqual(updatedItem.item_description);
    })
    .expect(200);
  });


  it('[5] Greet', () => {

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: `{ 
          itemGreet {
            to 
            title
            time
        }
       }`
    })
    .expect(({ body }) => {

      console.assert(body.data?.itemGreet, JSON.stringify(body));

      const greet = body.data?.itemGreet;

      expect(greet.to).toBe('world');
      expect(greet.title).toBe("Hello world!");
      expect(greet.time).toBe("all day");
    })
    .expect(200);

  });
  
  
  it('[5] say', () => {

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: `{ 
          say(message: "Hoyye") 
       }`
    })
    .expect(({ body }) => {

      console.assert(body.data?.say, JSON.stringify(body));

      const message = body.data?.say;

      expect(message).toBe("Hoyye");
    })
    .expect(200);

  });



});
