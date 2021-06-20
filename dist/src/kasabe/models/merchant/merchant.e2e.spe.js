"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
const merchant_service_1 = require("./merchant.service");
const merchant_repository_1 = require("./merchant.repository");
jest.setTimeout(90000);
class MerchantServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('merchant.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let merchantService;
    let merchantRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                merchant_repository_1.MerchantRepository,
                merchant_service_1.MerchantService,
                person_repository_1.PersonRepository,
                person_service_1.PersonService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        merchantService = app.get(merchant_service_1.MerchantService);
        merchantRepository = testUtils.databaseService.connection.getCustomRepository(merchant_repository_1.MerchantRepository);
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
        it('[1] testUtils should be defined', async (done) => {
            expect(testUtils).toBeDefined();
            done();
        }, 20000);
        it('[1] merchantService should be defined', async (done) => {
            expect(merchantService).toBeDefined();
            expect(merchantService).toBeInstanceOf(merchant_service_1.MerchantService);
            done();
        }, 20000);
        it('[3] merchantRepository should be defined', async (done) => {
            expect(merchantRepository).toBeDefined();
            expect(merchantRepository).toBeInstanceOf(merchant_repository_1.MerchantRepository);
            done();
        }, 20000);
    });
    describe('[b] test queries', () => {
    });
    describe('[c] build', () => {
    });
    describe('[d] rebuild', () => {
    });
    describe('[e] fetchById', () => {
    });
});
//# sourceMappingURL=merchant.e2e.spe.js.map