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
const order_repository_1 = require("./order.repository");
const order_service_1 = require("./order.service");
const order_details_service_1 = require("../order_details/order_details.service");
const order_details_repository_1 = require("../order_details/order_details.repository");
const customer_repository_1 = require("../customer/customer.repository");
const shipper_repository_1 = require("../shipper/shipper.repository");
const product_repository_1 = require("../product/product.repository");
const build_customer_inputs_1 = require("../../../test/fixtures/kasabe/customer/build.customer.inputs");
const build_shipper_inputs_1 = require("../../../test/fixtures/kasabe/shipper/build.shipper.inputs");
const create_product_inputs_1 = require("../../../test/fixtures/kasabe/product/create.product.inputs");
const create_orders_inputs_1 = require("../../../test/fixtures/kasabe/order/create.orders.inputs");
const update_orders_inputs_1 = require("../../../test/fixtures/kasabe/order/update.orders.inputs");
jest.setTimeout(90000);
class OrderDetailsServiceFake {
    async testQuery() { }
    async buildDetails() { }
    async rebuildDetails() { }
    async getOrderDetailsById() { }
}
const fixInput = input => {
    console.log('<fixInput| input>', input);
    const fixed = JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
    console.log('<fixInput| fixed>', fixed);
    return fixed;
};
describe('order.e2e.spec.ts', () => {
    let app;
    let testUtils;
    let orderRepository;
    let orderService;
    let orderDetailsService;
    let orderDetailsRepository;
    let personRepository;
    let customerRepository;
    let shipperRepository;
    let productRepository;
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
        orderService = app.get(order_service_1.OrderService);
        orderDetailsRepository = testUtils.databaseService.connection.getCustomRepository(order_details_repository_1.OrderDetailsRepository);
        personRepository = testUtils.databaseService.connection.getCustomRepository(person_repository_1.PersonRepository);
        orderRepository = testUtils.databaseService.connection.getCustomRepository(order_repository_1.OrderRepository);
        customerRepository = testUtils.databaseService.connection.getCustomRepository(customer_repository_1.CustomerRepository);
        shipperRepository = testUtils.databaseService.connection.getCustomRepository(shipper_repository_1.ShipperRepository);
        productRepository = testUtils.databaseService.connection.getCustomRepository(product_repository_1.ProductRepository);
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
    it('[1] rebuild()', async (done) => {
        const customerInput = build_customer_inputs_1.CreateCustomerInputs[0];
        const gCustomer = await customerRepository.build(customerInput);
        const shipperInput1 = build_shipper_inputs_1.CreateShipperInputs[0];
        const gShipper1 = await shipperRepository.build(shipperInput1);
        const shipperInput2 = build_shipper_inputs_1.CreateShipperInputs[1];
        const gShipper2 = await shipperRepository.build(shipperInput2);
        const productInput1 = create_product_inputs_1.CreateProductInputs[0];
        const gProduct1 = await productRepository.build(productInput1);
        const productInput2 = create_product_inputs_1.CreateProductInputs[1];
        const gProduct2 = await productRepository.build(productInput2);
        const cInput = create_orders_inputs_1.CreateOrderInputs[0];
        const gOrder = await orderRepository.build(cInput);
        const qInput = update_orders_inputs_1.UpdateOrderInputs[0];
        const query = `
    mutation {
      rebuild(order: ${fixInput(qInput)}){
            order_id,
            order_number
            customer_id
            customer {
                customer_id,
                customer_name
                password
                #order {
                #    order_id
                #    order_number
                #}
                #person_id
                #person {
                #    person_id
                #    person_role
                #    person_name
                #}
            }
            shipper_id
            shipper {
                shipper_id
                shipper_name
                contact_name
                contact_title
                logo
                note
                our_id
                url
                #person_id
                #person {
                #    person_id
                #    person_role
                #    person_name
                #}
            }
            order_date
            required_date
            ship_date
            freight
            status
            order_details {
                order_details_id
                order_id
                #order {}
                product_id
                #product {}
                msrp
                discount
                quantity
                price
                shipper_id
                #shipper {}
                required_date
                ship_date
                freight
                status
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
            if (err)
                return done(err);
            expect(res.body).toBeInstanceOf(Object);
            const order = (_b = (_a = res.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.rebuild;
            expect(order.order_id).toBe(1);
            expect(order.order_number).toBe(gOrder.order_number);
            expect(order.status).toBe(qInput.status);
            expect(order.freight).toBe(qInput.freight);
            expect(order.shipper.shipper_id).toBe(2);
            expect(order.shipper.shipper_name).toBe(gShipper2.shipper_name);
            expect(order.order_details).toBeInstanceOf(Array);
            expect(order.order_details.length).toEqual(2);
            expect(order.order_details[0].order_details_id).toBe(1);
            expect(order.order_details[0].quantity).toBe(qInput.order_details[0].quantity);
            expect(order.order_details[0].status).toBe(qInput.order_details[0].status);
            expect(order.order_details[0].shipper_id).toBe(qInput.order_details[0].shipper_id);
            expect(order.order_details[1].order_details_id).toBe(2);
            expect(order.order_details[1].quantity).toBe(qInput.order_details[1].quantity);
            expect(order.order_details[1].status).toBe(qInput.order_details[1].status);
            expect(order.order_details[1].shipper_id).toBe(qInput.order_details[1].shipper_id);
            done();
        });
    }, 20000);
    describe('[f] getOrderDetailsById', () => {
    });
    describe('[e] rebuildDetails', () => {
    });
});
//# sourceMappingURL=order.e2e.spe.js.map