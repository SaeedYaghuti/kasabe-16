"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
const address_service_1 = require("./address.service");
const address_repository_1 = require("./address.repository");
jest.setTimeout(90000);
class AddressServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('address.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let addressService;
    let addressRepository;
    let personRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                address_repository_1.AddressRepository,
                address_service_1.AddressService,
                person_repository_1.PersonRepository,
                person_service_1.PersonService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        addressService = app.get(address_service_1.AddressService);
        addressRepository = testUtils.databaseService.connection.getCustomRepository(address_repository_1.AddressRepository);
        personRepository = testUtils.databaseService.connection.getCustomRepository(person_repository_1.PersonRepository);
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
        it('[1] addressService should be defined', async (done) => {
            expect(addressService).toBeDefined();
            expect(addressService).toBeInstanceOf(address_service_1.AddressService);
            done();
        }, 20000);
        it('[3] addressRepository should be defined', async (done) => {
            expect(addressRepository).toBeDefined();
            expect(addressRepository).toBeInstanceOf(address_repository_1.AddressRepository);
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
//# sourceMappingURL=address.e2e.spe.js.map