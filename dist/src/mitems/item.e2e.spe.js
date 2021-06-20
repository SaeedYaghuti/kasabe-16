"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest"));
const item_module_1 = require("./item.module");
const item_repository_1 = require("./item.repository");
const items_service_1 = require("./items.service");
describe('item.e2e.spec.ts', () => {
    let app;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                item_module_1.ItemModule,
            ],
            providers: [
                item_repository_1.ItemRepository,
                items_service_1.ItemService,
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    }, 90000);
    afterAll(async () => {
        await app.close();
    });
    it('[1] createItem', () => {
        const createItemInput = {
            item_title: "first item",
            item_description: "first description"
        };
        const mCreateItemInput = JSON.stringify(createItemInput).replace(/\"([^(\")"]+)\":/g, '$1:');
        const createItemQuery = `
        mutation {
          createItem(item: ${mCreateItemInput}){
            item_id
            item_title
            item_description
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
            var _a;
            `body: {"data":{"createItem":{"item_id":1,"item_title":"first item","item_description":"first description"}}}`;
            const item = (_a = body.data) === null || _a === void 0 ? void 0 : _a.createItem;
            expect(item).toBeDefined();
            expect(item.item_title).toBe(createItemInput.item_title);
            expect(item.item_description).toBe(createItemInput.item_description);
        })
            .expect(200);
    });
    it('[2] getItems', () => {
        const createItemInput = {
            item_title: "first item",
            item_description: "first description"
        };
        return supertest_1.default(app.getHttpServer())
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
        const updatedItem = {
            item_id: 2,
            item_title: "updated first item",
            item_description: "updated first description"
        };
        const updateItemObject = JSON.stringify(updatedItem).replace(/\"([^(\")"]+)\":/g, '$1:');
        const updateItemQuery = `
        mutation {
            updateItem(item: ${updateItemObject}){
              item_id
              item_title
              item_description
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
            console.log('[3] body:', JSON.stringify(body));
            const uItem = body.data.updateItem;
            expect(uItem.item_id).toBe(updatedItem.item_id);
            expect(uItem.item_title).toBe(updatedItem.item_title);
            expect(uItem.item_description).toEqual(updatedItem.item_description);
        })
            .expect(200);
    });
    it('[4] deleteItem', () => {
        const updatedItem = {
            item_id: 2,
            item_title: "updated first item",
            item_description: "updated first description"
        };
        const deleteItemQuery = `
        query {
          getItemById(item_id: ${2}){
            item_id
            item_title
            item_description
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
            var _a;
            console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.getItemById, JSON.stringify(body));
            const item = body.data.getItemById;
            expect(item.item_id).toBe(updatedItem.item_id);
            expect(item.item_title).toBe(updatedItem.item_title);
            expect(item.item_description).toEqual(updatedItem.item_description);
        })
            .expect(200);
    });
    it('[5] Greet', () => {
        return supertest_1.default(app.getHttpServer())
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
            var _a, _b;
            console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.itemGreet, JSON.stringify(body));
            const greet = (_b = body.data) === null || _b === void 0 ? void 0 : _b.itemGreet;
            expect(greet.to).toBe('world');
            expect(greet.title).toBe("Hello world!");
            expect(greet.time).toBe("all day");
        })
            .expect(200);
    });
    it('[5] say', () => {
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: `{ 
          say(message: "Hoyye") 
       }`
        })
            .expect(({ body }) => {
            var _a, _b;
            console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.say, JSON.stringify(body));
            const message = (_b = body.data) === null || _b === void 0 ? void 0 : _b.say;
            expect(message).toBe("Hoyye");
        })
            .expect(200);
    });
});
//# sourceMappingURL=item.e2e.spe.js.map