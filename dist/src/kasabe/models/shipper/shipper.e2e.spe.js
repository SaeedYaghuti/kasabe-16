"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
const shipper_service_1 = require("./shipper.service");
const shipper_repository_1 = require("./shipper.repository");
jest.setTimeout(90000);
class ShipperServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('shipper.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let shipperService;
    let shipperRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                shipper_repository_1.ShipperRepository,
                shipper_service_1.ShipperService,
                person_repository_1.PersonRepository,
                person_service_1.PersonService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        shipperService = app.get(shipper_service_1.ShipperService);
        shipperRepository = testUtils.databaseService.connection.getCustomRepository(shipper_repository_1.ShipperRepository);
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
    });
});
//# sourceMappingURL=shipper.e2e.spe.js.map