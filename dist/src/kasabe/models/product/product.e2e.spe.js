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
const person_repository_1 = require("../person/person.repository");
const order_repository_1 = require("../order/order.repository");
const order_service_1 = require("../order/order.service");
const product_service_1 = require("./product.service");
const product_repository_1 = require("./product.repository");
const tag_repository_1 = require("../tag/tag.repository");
const tag_service_1 = require("../tag/tag.service");
const product_category_repository_1 = require("../product_category/product_category.repository");
const product_category_service_1 = require("../product_category/product_category.service");
const create_product_inputs_1 = require("../../../test/fixtures/kasabe/product/create.product.inputs");
const update_product_input_1 = require("../../../test/fixtures/kasabe/product/update.product.input");
jest.setTimeout(90000);
class ProductServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('product.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let productService;
    let productRepository;
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
                order_repository_1.OrderRepository,
                order_service_1.OrderService,
                product_category_repository_1.ProductCategoryRepository,
                product_category_service_1.ProductCategoryService,
                tag_repository_1.TagRepository,
                tag_service_1.TagService,
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        await app.listen(3000);
        testUtils = module.get(test_utils_1.TestUtils);
        productService = app.get(product_service_1.ProductService);
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
        it('[1] build()', async (done) => {
            const qInput = create_product_inputs_1.CreateProductInputs[0];
            const query = `
        mutation {
            build(product: ${fixInput(qInput)}){
              product_id
              sku
              supplier_sku
              #category {}
              #product_category_id
              product_name
              msrp
              price
              price_currency
              currency_symbole
              unit_title
              unit_weight
              unit_weight_title
              is_discount
              discount
              ranking
              reorder_level
              is_active
              #tags {
              #}
              #order_details {
              #}
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
                console.log('<c1> res.body:', res.body);
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const product = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.build;
                expect(product.product_id).toBe(1);
                expect(product.product_name).toBe(qInput.product_name);
                done();
            });
        }, 20000);
    });
    describe('[d] fetchById', () => {
        it('[1] should get Product by id()', async (done) => {
            const cInput = create_product_inputs_1.CreateProductInputs[0];
            const gProduct = await productRepository.build(cInput);
            const query = `
        query {
            fetchById(product_id: ${1}){
              product_id
              sku
              supplier_sku
              #category {}
              #product_category_id
              product_name
              msrp
              price
              price_currency
              currency_symbole
              unit_title
              unit_weight
              unit_weight_title
              is_discount
              discount
              ranking
              reorder_level
              is_active
              #tags {
              #}
              #order_details {
              #}
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
                console.log('<c1> res.body:', res.body);
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const product = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.fetchById;
                expect(product.product_id).toBe(1);
                expect(product.product_name).toBe(cInput.product_name);
                done();
            });
        }, 20000);
    });
    describe('[e] rebuild', () => {
        it('[1] should update Product()', async (done) => {
            const cInput = create_product_inputs_1.CreateProductInputs[0];
            const gProduct = await productRepository.build(cInput);
            const qInput = update_product_input_1.UpdateProductInputs[0];
            const query = `
        mutation {
            rebuild(product: ${fixInput(qInput)}){
              product_id
              sku
              supplier_sku
              #category {}
              #product_category_id
              product_name
              msrp
              price
              price_currency
              currency_symbole
              unit_title
              unit_weight
              unit_weight_title
              is_discount
              discount
              ranking
              reorder_level
              is_active
              #tags {
              #}
              #order_details {
              #}
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
                console.log('<c1> res.body:', res.body);
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const product = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.rebuild;
                expect(product.product_id).toBe(1);
                expect(product.product_name).toBe(qInput.product_name);
                done();
            });
        }, 20000);
    });
});
//# sourceMappingURL=product.e2e.spe.js.map