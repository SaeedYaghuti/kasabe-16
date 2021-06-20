import { Test, TestingModule } from '@nestjs/testing';
import { ItemsModule } from '../src/items/items.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemType } from '../src/items/dto/create-item.dto';
import request from 'supertest';


    

describe('ItemsController (e2e)', () => {

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


  const item: ItemType = {
    title: "third item",
    description: "greate item",
    price: 10.5
}

let id: string = '';

const updatedItem: ItemType = {
    title: 'Great update item',
    price: 20.5,
    description: 'Update description of this great item',
}

const createItemObject = JSON.stringify(item).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
);

const createItemQuery = 
`
    mutation {
        createItem(input: ${createItemObject}){
            title
            price
            description
            id
        }
    }
`;



  it('createItem', () => {
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: createItemQuery
      })
      .expect(({ body }) => {
          const data = body.data.createItem;
          id = data.id;
          expect(data.title).toBe(item.title);
          expect(data.description).toBe(item.description);
          expect(data.price).toEqual(item.price);
      })
      .expect(200);
  })

});
