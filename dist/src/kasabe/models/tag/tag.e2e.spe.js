"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const tag_service_1 = require("./tag.service");
const tag_repository_1 = require("./tag.repository");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const supertest_1 = __importDefault(require("supertest"));
const product_repository_1 = require("../product/product.repository");
const product_service_1 = require("../product/product.service");
jest.setTimeout(90000);
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('tag.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let tagService;
    let tagResolver;
    let tagRepository;
    let http;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                tag_repository_1.TagRepository,
                tag_service_1.TagService,
                product_repository_1.ProductRepository,
                product_service_1.ProductService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        tagService = app.get(tag_service_1.TagService);
        tagRepository = testUtils.databaseService.connection.getCustomRepository(tag_repository_1.TagRepository);
    });
    afterAll(async (done) => {
        var _a;
        (_a = app) === null || _a === void 0 ? void 0 : _a.close();
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<m.r.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe('[a] variables', () => {
        it('[1] tagService should be defined', async (done) => {
            expect(tagService).toBeDefined();
            expect(tagService).toBeInstanceOf(tag_service_1.TagService);
            done();
        }, 20000);
        it('[2] testUtils should be defined', async (done) => {
            expect(testUtils).toBeDefined();
            done();
        }, 20000);
        it('[3] tagRepository should be defined', async (done) => {
            expect(tagRepository).toBeDefined();
            expect(tagRepository).toBeInstanceOf(tag_repository_1.TagRepository);
            done();
        }, 20000);
    });
    describe('[b] test queries', () => {
        it('[1] tagTestQuery', async () => {
            return supertest_1.default(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                query: `{ 
            tagTestQuery(message: "salam") {
              message
          }
        }`
            })
                .expect(({ body }) => {
                var _a, _b, _c;
                console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.tagTestQuery, JSON.stringify(body));
                const message = (_c = (_b = body.data) === null || _b === void 0 ? void 0 : _b.tagTestQuery) === null || _c === void 0 ? void 0 : _c.message;
                expect(message).toBe("salam");
            })
                .expect(200);
        }, 20000);
        it('[2] tagTestMutation', async () => {
            return supertest_1.default(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                query: `mutation { 
            tagTestMutation (message: "salam") {
              message
            }
        }`
            })
                .expect(({ body }) => {
                var _a, _b, _c;
                console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.tagTestMutation, JSON.stringify(body));
                const message = (_c = (_b = body.data) === null || _b === void 0 ? void 0 : _b.tagTestMutation) === null || _c === void 0 ? void 0 : _c.message;
                expect(message).toBe("salam");
            })
                .expect(200);
        }, 20000);
    });
    describe('[c] build', () => {
        it('[1] should create new tag', async () => {
            expect(await tagRepository.find()).toEqual([]);
            const tagInput = {
                tag_title: "Emotion",
            };
            const build = `
        mutation {
          build(tag: ${fixInput(tagInput)}){
            tag_id
            tag_title
          }
        }
      `;
            return supertest_1.default(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                query: build
            })
                .expect(async ({ body }) => {
                var _a, _b;
                console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.build, JSON.stringify(body));
                const tag = (_b = body.data) === null || _b === void 0 ? void 0 : _b.build;
                expect(tag).toBeDefined();
                expect(tag.tag_title).toBe(tagInput.tag_title);
                expect((await tagRepository.find()).length).toEqual(1);
            })
                .expect(200);
        }, 20000);
    });
    describe('[d] rebuild', () => {
        it('[1] should update tag', async () => {
            const tagInput = {
                tag_title: "Emotion",
            };
            await tagRepository.build(tagInput);
            const qInput = {
                tag_id: 1,
                tag_title: "update Emotion",
            };
            const query = `
        mutation {
          rebuild(tag: ${fixInput(qInput)}){
            tag_id
            tag_title
          }
        }
      `;
            return supertest_1.default(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                query: query
            })
                .expect(async ({ body }) => {
                var _a, _b;
                console.assert((_a = body.data) === null || _a === void 0 ? void 0 : _a.rebuild, JSON.stringify(body));
                const tag = (_b = body.data) === null || _b === void 0 ? void 0 : _b.rebuild;
                expect(tag).toBeDefined();
                expect(tag.tag_title).toBe(qInput.tag_title);
            })
                .expect(200);
        }, 20000);
    });
    describe('[e] fetchById', () => {
        it('[1] should get a tag', async (done) => {
            const tagInput = {
                tag_title: "Emotion e1",
            };
            const gTag = await tagRepository.build(tagInput);
            const query = `
      query {
        fetchById(tag_id: ${gTag.tag_id}){
            tag_id
            tag_title
          }
        }
      `;
            supertest_1.default(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                query: query
            })
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                var _a, _b;
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const tag = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.fetchById;
                expect(tag.tag_title).toBe(tagInput.tag_title);
                done();
            });
        }, 20000);
    });
});
//# sourceMappingURL=tag.e2e.spe.js.map