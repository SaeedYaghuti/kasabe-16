"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const test_utils_1 = require("../../../test/test.utils");
const database_service_1 = require("../../../database/database.service");
const kasabe_test_module_1 = require("../../kasabe_test.module");
const person_repository_1 = require("../person/person.repository");
const person_service_1 = require("../person/person.service");
const order_repository_1 = require("../order/order.repository");
const order_service_1 = require("../order/order.service");
const order_details_service_1 = require("./order_details.service");
const order_details_repository_1 = require("./order_details.repository");
jest.setTimeout(90000);
class OrderDetailsServiceFake {
    async testQuery() { }
    async buildDetails() { }
    async rebuildDetails() { }
    async getOrderDetailsById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('orderDetails.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let orderDetailsService;
    let orderDetailsRepository;
    let personRepository;
    let orderRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                kasabe_test_module_1.KasabeTestModule
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                order_details_repository_1.OrderDetailsRepository,
                order_details_service_1.OrderDetailsService,
                order_repository_1.OrderRepository,
                order_service_1.OrderService,
                person_repository_1.PersonRepository,
                person_service_1.PersonService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        orderDetailsService = app.get(order_details_service_1.OrderDetailsService);
        orderDetailsRepository = testUtils.databaseService.connection.getCustomRepository(order_details_repository_1.OrderDetailsRepository);
        personRepository = testUtils.databaseService.connection.getCustomRepository(person_repository_1.PersonRepository);
        orderRepository = testUtils.databaseService.connection.getCustomRepository(order_repository_1.OrderRepository);
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
    describe('[c] buildDetails', () => {
    });
    describe('[d] getOrderDetailsById', () => {
    });
    describe('[e] rebuildDetails', () => {
    });
});
//# sourceMappingURL=order_details.e2e.spe.js.map