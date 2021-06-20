"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const supertest_1 = __importDefault(require("supertest"));
const supplier_service_1 = require("./supplier.service");
const supplier_repository_1 = require("./supplier.repository");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
jest.setTimeout(90000);
class SupplierServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('supplier.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let supplierService;
    let supplierResolver;
    let supplierRepository;
    let http;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                supplier_repository_1.SupplierRepository,
                supplier_service_1.SupplierService,
                person_repository_1.PersonRepository,
                person_service_1.PersonService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        supplierService = app.get(supplier_service_1.SupplierService);
        supplierRepository = testUtils.databaseService.connection.getCustomRepository(supplier_repository_1.SupplierRepository);
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
            console.log('<m.r.s> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe('[a] variables', () => {
    });
    describe('[b] test queries', () => {
    });
    describe('[c] build', () => {
    });
    describe('[d] rebuild', () => {
    });
    describe('[e] fetchById', () => {
        it('[3] supplier_id unavailable hence body.data should be null and have body.errors ', async (done) => {
            const query = `
      query {
        fetchById(supplier_id: 1){
          supplier_id
          supplier_name
          contact_name
          contact_title
          logo
          note
          our_id
          url
          person_id
          person {
            person_id
            person_role
            person_name
          }
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
                .end((e, { body, error }) => {
                expect(e).toBeNull();
                expect(error).toEqual(false);
                expect(body.data).toBeNull();
                expect(body.errors).toBeInstanceOf(Array);
                expect(body.errors.length).toEqual(1);
                expect(body.errors[0].message).toEqual('There is no supplier with id 1');
                done();
            });
        }, 20000);
    });
});
//# sourceMappingURL=supplier.e2e.spe.js.map