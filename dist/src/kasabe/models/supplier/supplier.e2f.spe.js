"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const supplier_service_1 = require("./supplier.service");
const supplier_repository_1 = require("./supplier.repository");
const supplier_resolver_1 = require("./supplier.resolver");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
const kasabe_test_fake_module_1 = require("../../kasabe_test_fake.module");
jest.setTimeout(90000);
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('supplier.e2f.spec.ts', () => {
    let app;
    let testUtils;
    let supplierService;
    let supplierResolver;
    let supplierRepository;
    let http;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_fake_module_1.KasabeTestFakeModule
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
        supplierResolver = app.get(supplier_resolver_1.SupplierResolver);
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
            console.log('<<m.r.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe('[a] variables', () => {
    });
    describe('[d] rebuild', () => {
    });
    describe('[e] fetchById', () => {
    });
});
//# sourceMappingURL=supplier.e2f.spe.js.map