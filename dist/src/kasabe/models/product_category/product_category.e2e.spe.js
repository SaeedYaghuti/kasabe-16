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
const product_category_service_1 = require("./product_category.service");
const product_category_repository_1 = require("./product_category.repository");
const product_repository_1 = require("../product/product.repository");
const product_service_1 = require("../product/product.service");
jest.setTimeout(90000);
class ProductCategoryServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('productCategory.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let productCategoryService;
    let productRepository;
    let productCategoryRepository;
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
                product_repository_1.ProductRepository,
                product_service_1.ProductService,
                product_category_repository_1.ProductCategoryRepository,
                product_category_service_1.ProductCategoryService,
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
        productCategoryService = app.get(product_category_service_1.ProductCategoryService);
        productCategoryRepository = testUtils.databaseService.connection.getCustomRepository(product_category_repository_1.ProductCategoryRepository);
        productRepository = testUtils.databaseService.connection.getCustomRepository(product_repository_1.ProductRepository);
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
    describe('[c] build', () => {
    });
    describe('[d] fetchById', () => {
    });
    describe('[e] rebuild', () => {
    });
});
//# sourceMappingURL=product_category.e2e.spe.js.map