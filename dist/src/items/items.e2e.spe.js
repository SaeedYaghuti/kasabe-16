"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const items_module_1 = require("./items.module");
const graphql_1 = require("@nestjs/graphql");
const supertest_1 = __importDefault(require("supertest"));
describe('items.e2e.spec.ts', () => {
    let app;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                items_module_1.ItemsModule,
                graphql_1.GraphQLModule.forRoot({
                    autoSchemaFile: 'schema.gql'
                }),
            ],
            providers: [],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    const thirdItem = {
        title: "third item",
        description: "greate item",
        price: 10.5
    };
    const truthtedItem = [
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
    ];
    let nItemId = '';
    const updatedItem = {
        title: 'Great update item',
        price: 20.5,
        description: 'Update description of this great item',
    };
    it('[1] createItem', () => {
        const mThirdItem = JSON.stringify(thirdItem).replace(/\"([^(\")"]+)\":/g, '$1:');
        const createItemQuery = `
          mutation {
              createItem(input: ${mThirdItem}){
                  title
                  price
                  description
                  id
              }
          }
      `;
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: createItemQuery
        })
            .expect(({ body }) => {
            const data = body.data.createItem;
            nItemId = data.id;
            expect(data.title).toBe(thirdItem.title);
            expect(data.description).toBe(thirdItem.description);
            expect(data.price).toEqual(thirdItem.price);
        })
            .expect(200);
    });
    it('[2] getItems', () => {
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: '{ items { id, title, price, description } }'
        })
            .expect(({ body }) => {
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
        const updateItemObject = JSON.stringify(updatedItem).replace(/\"([^(\")"]+)\":/g, '$1:');
        const updateItemQuery = `
        mutation {
            updateItem(id: "${nItemId}", input: ${updateItemObject}){
                title
                price
                description
                id
            }
        }
    `;
        return supertest_1.default(app.getHttpServer())
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
        const deleteItemQuery = `
        mutation {
            deleteItem(id: "${nItemId}"){
                title
                price
                description
                id
            }
        }
    `;
        return supertest_1.default(app.getHttpServer())
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
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: '{ hello }'
        })
            .expect(({ body }) => {
            const data = body.data.hello;
            expect(data).toBe('hello');
        })
            .expect(200);
    });
});
//# sourceMappingURL=items.e2e.spe.js.map