"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const graphql_1 = require("@nestjs/graphql");
const supertest_1 = __importDefault(require("supertest"));
const kasabe_service_1 = require("./kasabe.service");
const kasabe_resolver_1 = require("./kasabe.resolver");
describe('kasabe.e2e.spec.ts', () => {
    let app;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    autoSchemaFile: 'schema.gql'
                }),
            ],
            providers: [
                kasabe_service_1.KasabeService,
                kasabe_resolver_1.KasabeResolver,
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    const modifyInput = (input) => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
    it('[1] kasabeTestQuery', () => {
        const kasabeTestQuery = `
        query {
          kasabeTestQuery(message: "Hello Query"){
            message
          }
        }
      `;
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: kasabeTestQuery
        })
            .expect(({ body }) => {
            var _a;
            console.log('<<[1]>> body:', body);
            const message = (_a = body.data) === null || _a === void 0 ? void 0 : _a.kasabeTestQuery.message;
            expect(body.data).toBeDefined();
            expect(message).toBe("HardCoded Hello");
        })
            .expect(200);
    });
    it('[2] kasabeTestMutation', () => {
        const kasabeTestMutation = `
        mutation {
            kasabeTestMutation(message: "Hello Mutation"){
              message
            }
        }
      `;
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: kasabeTestMutation
        })
            .expect(({ body }) => {
            var _a, _b;
            console.log('<<[2]>> body:', body);
            const message = (_b = (_a = body.data) === null || _a === void 0 ? void 0 : _a.kasabeTestMutation) === null || _b === void 0 ? void 0 : _b.message;
            expect(body.data).toBeDefined();
            expect(message).toBe("Hello Mutation");
        })
            .expect(200);
    });
    it('[3] hello', () => {
        return supertest_1.default(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            query: '{ hello }'
        })
            .expect(({ body }) => {
            console.log('[3] body:', body);
            const hello = body.data.hello;
            expect(hello).toBe('hello');
        })
            .expect(200);
    });
});
//# sourceMappingURL=kasabe.e2e.spe.js.map