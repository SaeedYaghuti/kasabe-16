import { Test, TestingModule } from '@nestjs/testing';
import { ItemsModule } from './items.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemType } from './dto/create-item.dto';
import request from 'supertest';
import { ItemInput } from './dto/input-items.input';


describe('items.e2e.spec.ts', () => {

  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
          ItemsModule,
          // typeorm
          GraphQLModule.forRoot({
              autoSchemaFile: 'schema.gql'
          }),
      ],
      providers: [
        //   ItemsService
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  // const thirdItem: ItemType = {
  const thirdItem: ItemInput = {
    title: "third item",
    description: "greate item",
    price: 10.5
  }

  const truthtedItem: ItemType[] = [
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

  let nItemId: string = '';

  const updatedItem: ItemInput = {
      title: 'Great update item',
      price: 20.5,
      description: 'Update description of this great item',
  }



  it('[1] createItem', () => {

      // modifing third item
      const mThirdItem = JSON.stringify(thirdItem).replace(
        /\"([^(\")"]+)\":/g,
        '$1:',
      );

      // console.log('thirdItem: ', thirdItem);
      // console.log('createItemObject: ', mThirdItem);

      const createItemQuery = 
      `
          mutation {
              createItem(input: ${mThirdItem}){
                  title
                  price
                  description
                  id
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

        // console.log('<<[1]>> body:', body);
        
        const data = body.data.createItem;
        nItemId = data.id;
        expect(data.title).toBe(thirdItem.title);
        expect(data.description).toBe(thirdItem.description);
        expect(data.price).toEqual(thirdItem.price);
      })
      .expect(200);
  })

  it('[2] getItems', () => {

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: '{ items { id, title, price, description } }'
    })
    .expect(({ body }) => {

      // console.log('[2] body:', body);

      const data = body.data.items;
      const itemResult = data[0];
      expect(data.length).toBeGreaterThan(0);

      expect(itemResult.title).toBe(truthtedItem[0].title);
      expect(itemResult.description).toEqual(truthtedItem[0].description);
      expect(itemResult.price).toEqual(truthtedItem[0].price);
    })
    .expect(200);

  });


  it('[3] updateItem', () => {

    const updateItemObject = JSON.stringify(updatedItem).replace(
      /\"([^(\")"]+)\":/g,
      '$1:',
    );

    const updateItemQuery = 
    `
        mutation {
            updateItem(id: "${nItemId}", input: ${updateItemObject}){
                title
                price
                description
                id
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
      const data = body.data.updateItem;

      expect(data.title).toBe(updatedItem.title);
      expect(data.description).toEqual(updatedItem.description);
      expect(data.price).toEqual(updatedItem.price);
    })
    .expect(200);
  });

  it('[4] deleteItem', () => {

    const deleteItemQuery = 
    `
        mutation {
            deleteItem(id: "${nItemId}"){
                title
                price
                description
                id
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
      const data = body.data.deleteItem;

      expect(data.title).toBe(updatedItem.title);
      expect(data.description).toEqual(updatedItem.description);
      expect(data.price).toEqual(updatedItem.price);
    })
    .expect(200);
  });


  it('[5] hello', () => {

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: '{ hello }'
    })
    .expect(({ body }) => {

      // console.log('[5] body:', body);

      const data = body.data.hello;

      expect(data).toBe('hello');
    })
    .expect(200);

  });



});
