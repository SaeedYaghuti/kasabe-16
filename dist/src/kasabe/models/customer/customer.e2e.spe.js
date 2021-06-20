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
const person_service_1 = require("../person/person.service");
const customer_service_1 = require("./customer.service");
const customer_repository_1 = require("./customer.repository");
const order_repository_1 = require("../order/order.repository");
const order_service_1 = require("../order/order.service");
const build_customer_inputs_1 = require("../../../test/fixtures/kasabe/customer/build.customer.inputs");
const person_role_enum_1 = require("../person/person_role.enum");
const rebuild_customer_input_1 = require("../../../test/fixtures/kasabe/customer/rebuild.customer.input");
jest.setTimeout(90000);
class CustomerServiceFake {
    async testQuery() { }
    async build() { }
    async rebuild() { }
    async fetchById() { }
}
const fixInput = input => JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
describe('customer.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let customerService;
    let customerRepository;
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
                customer_repository_1.CustomerRepository,
                customer_service_1.CustomerService,
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
        customerService = app.get(customer_service_1.CustomerService);
        customerRepository = testUtils.databaseService.connection.getCustomRepository(customer_repository_1.CustomerRepository);
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
        it('[1] should get Customer by id()', async (done) => {
            const cInput = build_customer_inputs_1.CreateCustomerInputs[0];
            const gCustomer = await customerRepository.build(cInput);
            const query = `
        query {
            fetchById(customer_id: ${1}){
                customer_id,
                customer_name
                password

                #order {
                    #order_id
                    #order_number
                #}

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
                .end((err, res) => {
                var _a, _b;
                console.log('<c1> res.body:', res.body);
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const customer = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.fetchById;
                expect(customer.customer_id).toBe(1);
                expect(customer.person_id).toBe(1);
                expect(customer.person.person_role).toBe(person_role_enum_1.PersonRole.CUSTOMER);
                expect(customer.customer_name).toBe(cInput.customer_name);
                done();
            });
        }, 20000);
    });
    describe('[e] rebuild', () => {
        it('[1] should update Customer()', async (done) => {
            const cInput = build_customer_inputs_1.CreateCustomerInputs[0];
            const gCustomer = await customerRepository.build(cInput);
            const qInput = rebuild_customer_input_1.UpdateCustomerInputs[0];
            const query = `
        mutation {
            rebuild(customer: ${fixInput(qInput)}){
                customer_id,
                customer_name
                password

                #order {
                    #order_id
                    #order_number
                #}

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
                .end((err, res) => {
                var _a, _b;
                console.log('<c1> res.body:', res.body);
                if (err)
                    return done(err);
                expect(res.body).toBeInstanceOf(Object);
                const customer = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.rebuild;
                expect(customer.customer_id).toBe(1);
                expect(customer.person_id).toBe(1);
                expect(customer.person.person_role).toBe(person_role_enum_1.PersonRole.CUSTOMER);
                expect(customer.customer_name).toBe(qInput.customer_name);
                done();
            });
        }, 20000);
    });
});
//# sourceMappingURL=customer.e2e.spe.js.map