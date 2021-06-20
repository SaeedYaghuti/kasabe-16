import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';


import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { of } from 'rxjs';
import { CreatePersonInputs } from '../../../test/fixtures/kasabe/person/create.person.inputs';
import { Person } from '../person/person.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { PersonRole } from '../person/person_role.enum';
import { CreateOrderDetailsInputs } from '../../../test/fixtures/kasabe/order_details/create.order_details.inputs';
import { UpdateOrderDetailsInputs } from '../../../test/fixtures/kasabe/order_details/update.order_details.input';
import { OrderDetailsService } from '../order_details/order_details.service';
import { OrderDetailsRepository } from '../order_details/order_details.repository';
import { CreateOrderInput } from './dto/create_order.input';
import { Order } from './order.entity';
import { CustomerRepository } from '../customer/customer.repository';
import { ShipperRepository } from '../shipper/shipper.repository';
import { ProductRepository } from '../product/product.repository';
import { CreateCustomerInputs } from '../../../test/fixtures/kasabe/customer/build.customer.inputs';
import { CreateShipperInputs } from '../../../test/fixtures/kasabe/shipper/build.shipper.inputs';
import { CreateProductInputs } from '../../../test/fixtures/kasabe/product/create.product.inputs';
import { OrderStatus } from './order_status.enum';
import { UpdateOrderInput } from './dto/update_order.input';
import { CreateOrderInputs } from '../../../test/fixtures/kasabe/order/create.orders.inputs';
import { UpdateOrderInputs } from '../../../test/fixtures/kasabe/order/update.orders.inputs';

jest.setTimeout(90000);

//#region  Fake Class

class OrderDetailsServiceFake {
  public async testQuery(): Promise<void> {}
  public async buildDetails(): Promise<void> {}
  public async rebuildDetails(): Promise<void> {}
  public async getOrderDetailsById(): Promise<void> {}
}

//#endregion

//#region  modifing third item
const fixInput = input => {

  console.log('<fixInput| input>', input);

  const fixed = JSON.stringify(input).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  console.log('<fixInput| fixed>', fixed);

  return fixed;
}
//#endregion

describe('order.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let orderRepository: OrderRepository;
  let orderService: OrderService;

  let orderDetailsService: OrderDetailsService;
  let orderDetailsRepository: OrderDetailsRepository;

  let personRepository: PersonRepository;
  let customerRepository: CustomerRepository;
  let shipperRepository: ShipperRepository;
  let productRepository: ProductRepository;
  
  
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        OrderDetailsRepository, 
        OrderDetailsService,
        
        OrderRepository, 
        OrderService,
        
        PersonRepository, 
        PersonService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    orderDetailsService = app.get<OrderDetailsService>(OrderDetailsService);
    orderService = app.get<OrderService>(OrderService);
    // orderDetailsRepository = testUtils.databaseService.connection.getRepository(OrderDetails); // return Repository
    orderDetailsRepository = testUtils.databaseService.connection.getCustomRepository(OrderDetailsRepository);
    personRepository = testUtils.databaseService.connection.getCustomRepository(PersonRepository);
    orderRepository = testUtils.databaseService.connection.getCustomRepository(OrderRepository);
    customerRepository = testUtils.databaseService.connection.getCustomRepository(CustomerRepository);
    shipperRepository = testUtils.databaseService.connection.getCustomRepository(ShipperRepository);
    productRepository = testUtils.databaseService.connection.getCustomRepository(ProductRepository);
    
  });

  afterAll(async done => {
    app?.close();
    done();
  })

  beforeEach(async done => {
    try {
      // await testUtils.reloadAllSamples();
      await testUtils.cleanAllSamples();
      // await testUtils.reloadAllSamples();
    } catch (error) {
      console.log('<m.r.s> cleanAllSamples error: ', error);
    }
    done();
  });
 
  afterAll(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  

  //#region a

  describe('[a] variables', () => {

    // it('[1] testUtils should be defined', async (done) => {
      
    //     expect(testUtils).toBeDefined();
  
    //     done();
  
    // }, 20000);

    // it('[1] orderDetailsService should be defined', async (done) => {
      
    //   expect(orderDetailsService).toBeDefined();
    //   expect(orderDetailsService).toBeInstanceOf(OrderDetailsService);

    //   done();

    // }, 20000);
     
    // it('[3] orderDetailsRepository should be defined', async (done) => {
      
    //   expect(orderDetailsRepository).toBeDefined();
    //   expect(orderDetailsRepository).toBeInstanceOf(OrderDetailsRepository);

    //   done();

    // }, 20000);
    
    // it('[4] orderRepository should be defined', async (done) => {
      
    //   expect(orderRepository).toBeDefined();
    //   expect(orderRepository).toBeInstanceOf(OrderRepository);

    //   done();

    // }, 20000);
    
    // it('[5] orderService should be defined', async (done) => {
      
    //   expect(orderService).toBeDefined();
    //   expect(orderService).toBeInstanceOf(OrderService);

    //   done();

    // }, 20000);

    // it('[6] orderRepository should be defined', async (done) => {
      
    //   expect(customerRepository).toBeDefined();
    //   expect(customerRepository).toBeInstanceOf(CustomerRepository);

    //   done();

    // }, 20000);

    // it('[7] shipperRepository should be defined', async (done) => {
      
    //   expect(shipperRepository).toBeDefined();
    //   expect(shipperRepository).toBeInstanceOf(ShipperRepository);

    //   done();

    // }, 20000);

    // it('[8] productRepository should be defined', async (done) => {
      
    //   expect(productRepository).toBeDefined();
    //   expect(productRepository).toBeInstanceOf(ProductRepository);

    //   done();

    // }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] orderTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         orderTestQuery(message: "Salam"){
    //             message
    //         }
    //     }
    //     `;
    
    //     request(app.getHttpServer())
    //     .post('/graphql')
    //     .send({
    //         operationName: null,
    //         query: query
    //     })
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end((err, res) => {
    
    //         // console.log('<e111> err:', err);
    
    //         if(err) return done(err);
    
    //         // console.log('<e12> res.body:', res.body);
        
    //         expect(res.body).toBeInstanceOf(Object);
    
    //         const order = res.body?.data?.orderTestQuery;
            
    //         expect(order.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] orderTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         orderTestMutation(message: "Salam"){
    //             message
    //         }
    //     }
    //     `;
    
    //     request(app.getHttpServer())
    //     .post('/graphql')
    //     .send({
    //         operationName: null,
    //         query: query
    //     })
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end((err, res) => {
    
    //         // console.log('<e111> err:', err);
    //         // console.log('<e12> res.body:', res.body);
    
    //         if(err) return done(err);
        
    //         expect(res.body).toBeInstanceOf(Object);
    
    //         const order = res.body?.data?.orderTestMutation;
            
    //         expect(order.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1] ✅

    // it('[1] build()', async (done) => {  

    //     // 🚧 create customer-id 1
    //     const customerInput = CreateCustomerInputs[0];
    //     const gCustomer = await customerRepository.build(customerInput);
        
    //     // 🚧 create shipper-id 1, 2 
    //     const shipperInput1 = CreateShipperInputs[0];
    //     const gShipper1 = await shipperRepository.build(shipperInput1);
        
    //     const shipperInput2 = CreateShipperInputs[1];
    //     const gShipper2 = await shipperRepository.build(shipperInput2);
        
    //     // 🚧 create product-id 1, 2 
    //     const productInput1 = CreateProductInputs[0];
    //     const gProduct1 = await productRepository.build(productInput1);
        
    //     const productInput2 = CreateProductInputs[1];
    //     const gProduct2 = await productRepository.build(productInput2);
        

    //     const qInput: CreateOrderInput = CreateOrderInputs[0];

    //     console.log('<qInput>',qInput);

    //     const query = 
    //     `
    //     mutation {
    //         build(order: ${ fixInput( qInput ) }){
    //             order_id,
    //             order_number
    //             customer_id
    //             customer {
    //                 customer_id,
    //                 customer_name
    //                 password
    //                 #order {
    //                 #    order_id
    //                 #    order_number
    //                 #}
    //                 #person_id
    //                 #person {
    //                 #    person_id
    //                 #    person_role
    //                 #    person_name
    //                 #}
    //             }
    //             shipper_id
    //             shipper {
    //                 shipper_id
    //                 shipper_name
    //                 contact_name
    //                 contact_title
    //                 logo
    //                 note
    //                 our_id
    //                 url
    //                 #person_id
    //                 #person {
    //                 #    person_id
    //                 #    person_role
    //                 #    person_name
    //                 #}
    //             }
    //             order_date
    //             required_date
    //             ship_date
    //             freight
    //             #status
    //             order_details {
    //                 order_details_id
    //                 order_id
    //                 #order {}
    //                 product_id
    //                 #product {}
    //                 msrp
    //                 discount
    //                 quantity
    //                 price
    //                 shipper_id
    //                 #shipper {}
    //                 required_date
    //                 ship_date
    //                 freight
    //                 #status
    //             }
    //         }
    //     }
    //     `;
    
    //     request(app.getHttpServer())
    //     .post('/graphql')
    //     .send({
    //         operationName: null,
    //         query: query
    //     })
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end((err, res) => {
    
    //         console.log('<c1| err>', err);
    //         console.log('<c1| res.body.errors>', JSON.stringify(res.body.errors));
            
    //         console.log('<c1| res.body>', res.body);
    //         console.log('<c1| res.body.data.build.customer>', res.body.data.build.customer);
    //         console.log('<c1| res.body.data.build.shipper>', res.body.data.build.shipper);
    //         console.log('<c1| res.body.data.build.order_details>', res.body.data.build.order_details);
    
    //         if(err) return done(err);
        
    //         expect(res.body).toBeInstanceOf(Object);
    
    //         const order: Order = res.body?.data?.build;
            
    //         expect(order.order_id).toBe(1); 
    //         expect(order.order_number).toBe(qInput.order_number);

    //         expect(order.customer.customer_id).toBe(1);
    //         expect(order.customer.customer_name).toBe(gCustomer.customer_name);
            
    //         expect(order.shipper.shipper_id).toBe(1);
    //         expect(order.shipper.shipper_name).toBe(gShipper1.shipper_name);
            
    //         expect(order.order_details).toBeInstanceOf(Array);
    //         expect(order.order_details.length).toEqual(2);

    //         expect(order.order_details[0].order_details_id).toBe(1);
    //         expect(order.order_details[0].price).toBe(2500);
            
    //         expect(order.order_details[1].order_details_id).toBe(2);
    //         expect(order.order_details[1].price).toBe(25000);

          
    //         `console.log src/ecommerce/models/order/order.e2e.spec.ts:419
    //         <c1| res.body.data.build.customer> { customer_id: 1, customer_name: 'Davood', password: '123456789' }

    //       console.log src/ecommerce/models/order/order.e2e.spec.ts:420
    //         <c1| res.body.data.build.shipper> {
    //           shipper_id: 1,
    //           shipper_name: 'Bustan',
    //           contact_name: 'bustan',
    //           contact_title: 'Aqa',
    //           logo: 'galery.jpg',
    //           note: 'trusted',
    //           our_id: 'supp01',
    //           url: 'giftgallery.com'
    //         }

    //       console.log src/ecommerce/models/order/order.e2e.spec.ts:421
    //         <c1| res.body.data.build.order_details> [
    //           {
    //             order_details_id: 1,
    //             order_id: 1,
    //             product_id: 1,
    //             msrp: 2100,
    //             discount: 0.1,
    //             quantity: 1,
    //             price: 2500,
    //             shipper_id: 1,
    //             required_date: 1602779049914,
    //             ship_date: 1602779049914,
    //             freight: null
    //           },
    //           {
    //             order_details_id: 2,
    //             order_id: 1,
    //             product_id: 2,
    //             msrp: 22000,
    //             discount: 0.1,
    //             quantity: 2,
    //             price: 25000,
    //             shipper_id: 2,
    //             required_date: 1602779049914,
    //             ship_date: 1602779049914,
    //             freight: null
    //           }
    //         ]`;

    //         done();
    
    //     });
    
    // }, 20000);  
    
    // #endregion

  });
  
  //#endregion
  
  //#region  d

  //#region  [1] ✅

//   it('[1] fetchById()', async (done) => {  

//     // 🚧 create customer-id 1
//     const customerInput = CreateCustomerInputs[0];
//     const gCustomer = await customerRepository.build(customerInput);
    
//     // 🚧 create shipper-id 1, 2 
//     const shipperInput1 = CreateShipperInputs[0];
//     const gShipper1 = await shipperRepository.build(shipperInput1);
    
//     const shipperInput2 = CreateShipperInputs[1];
//     const gShipper2 = await shipperRepository.build(shipperInput2);
    
//     // 🚧 create product-id 1, 2 
//     const productInput1 = CreateProductInputs[0];
//     const gProduct1 = await productRepository.build(productInput1);
    
//     const productInput2 = CreateProductInputs[1];
//     const gProduct2 = await productRepository.build(productInput2);
    

//     const cInput: CreateOrderInput = CreateOrderInputs[0];
//     const gOrder = await orderRepository.build(cInput);

//     console.log('<gOrder>',gOrder);

//     const query = 
//     `
//     query {
//       rebuild(order_id: 1){
//             order_id,
//             order_number
//             customer_id
//             customer {
//                 customer_id,
//                 customer_name
//                 password
//                 #order {
//                 #    order_id
//                 #    order_number
//                 #}
//                 #person_id
//                 #person {
//                 #    person_id
//                 #    person_role
//                 #    person_name
//                 #}
//             }
//             shipper_id
//             shipper {
//                 shipper_id
//                 shipper_name
//                 contact_name
//                 contact_title
//                 logo
//                 note
//                 our_id
//                 url
//                 #person_id
//                 #person {
//                 #    person_id
//                 #    person_role
//                 #    person_name
//                 #}
//             }
//             order_date
//             required_date
//             ship_date
//             freight
//             #status
//             order_details {
//                 order_details_id
//                 order_id
//                 #order {}
//                 product_id
//                 #product {}
//                 msrp
//                 discount
//                 quantity
//                 price
//                 shipper_id
//                 #shipper {}
//                 required_date
//                 ship_date
//                 freight
//                 #status
//             }
//         }
//     }
//     `;

//     request(app.getHttpServer())
//     .post('/graphql')
//     .send({
//         operationName: null,
//         query: query
//     })
//     .set('Accept', 'application/json')
//     .expect(200)
//     .end((err, res) => {

//         console.log('<c1| err>', err);
//         console.log('<c1| res.body.errors>', JSON.stringify(res.body.errors));
        
//         console.log('<c1| res.body>', res.body);
//         console.log('<c1| res.body.data.rebuild.customer>', res.body.data.rebuild.customer);
//         console.log('<c1| res.body.data.rebuild.shipper>', res.body.data.rebuild.shipper);
//         console.log('<c1| res.body.data.rebuild.order_details>', res.body.data.rebuild.order_details);

//         if(err) return done(err);
    
//         expect(res.body).toBeInstanceOf(Object);

//         const order: Order = res.body?.data?.rebuild;
        
//         expect(order.order_id).toBe(1); 
//         expect(order.order_number).toBe(cInput.order_number);

//         expect(order.customer.customer_id).toBe(1);
//         expect(order.customer.customer_name).toBe(gCustomer.customer_name);
        
//         expect(order.shipper.shipper_id).toBe(1);
//         expect(order.shipper.shipper_name).toBe(gShipper1.shipper_name);
        
//         expect(order.order_details).toBeInstanceOf(Array);
//         expect(order.order_details.length).toEqual(2);

//         expect(order.order_details[0].order_details_id).toBe(1);
//         expect(order.order_details[0].price).toBe(2500);
        
//         expect(order.order_details[1].order_details_id).toBe(2);
//         expect(order.order_details[1].price).toBe(2500);

      
//         `console.log src/ecommerce/models/order/order.e2e.spec.ts:419
//         <c1| res.body.data.build.customer> { customer_id: 1, customer_name: 'Davood', password: '123456789' }

//       console.log src/ecommerce/models/order/order.e2e.spec.ts:420
//         <c1| res.body.data.build.shipper> {
//           shipper_id: 1,
//           shipper_name: 'Bustan',
//           contact_name: 'bustan',
//           contact_title: 'Aqa',
//           logo: 'galery.jpg',
//           note: 'trusted',
//           our_id: 'supp01',
//           url: 'giftgallery.com'
//         }

//       console.log src/ecommerce/models/order/order.e2e.spec.ts:421
//         <c1| res.body.data.build.order_details> [
//           {
//             order_details_id: 1,
//             order_id: 1,
//             product_id: 1,
//             msrp: 2100,
//             discount: 0.1,
//             quantity: 1,
//             price: 2500,
//             shipper_id: 1,
//             required_date: 1602779049914,
//             ship_date: 1602779049914,
//             freight: null
//           },
//           {
//             order_details_id: 2,
//             order_id: 1,
//             product_id: 2,
//             msrp: 22000,
//             discount: 0.1,
//             quantity: 2,
//             price: 25000,
//             shipper_id: 2,
//             required_date: 1602779049914,
//             ship_date: 1602779049914,
//             freight: null
//           }
//         ]`;

//         done();

//     });

// }, 20000);  

// #endregion

//#endregion
  
  //#region  e

  //#region  [1] ✅

  it('[1] rebuild()', async (done) => {  

    // 🚧 create customer-id 1
    const customerInput = CreateCustomerInputs[0];
    const gCustomer = await customerRepository.build(customerInput);
    
    // 🚧 create shipper-id 1, 2 
    const shipperInput1 = CreateShipperInputs[0];
    const gShipper1 = await shipperRepository.build(shipperInput1);
    
    const shipperInput2 = CreateShipperInputs[1];
    const gShipper2 = await shipperRepository.build(shipperInput2);
    
    // 🚧 create product-id 1, 2 
    const productInput1 = CreateProductInputs[0];
    const gProduct1 = await productRepository.build(productInput1);
    
    const productInput2 = CreateProductInputs[1];
    const gProduct2 = await productRepository.build(productInput2);
    

    //  🚧  generate order
    const cInput: CreateOrderInput = CreateOrderInputs[0];
    const gOrder = await orderRepository.build(cInput);

    //  🚧  fetch update input
    const qInput: UpdateOrderInput = UpdateOrderInputs[0];

    // console.log('<gOrder>',gOrder);

    const query = 
    `
    mutation {
      rebuild(order: ${ fixInput(qInput)}){
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

    request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: query
    })
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {

        // console.log('<c1| err>', err);
        // console.log('<c1| res.body.errors>', JSON.stringify(res.body.errors));
        
        // console.log('<c1| res.body>', res.body);
        // console.log('<c1| res.body.data.rebuild.customer>', res.body.data.rebuild.customer);
        // console.log('<c1| res.body.data.rebuild.shipper>', res.body.data.rebuild.shipper);
        // console.log('<c1| res.body.data.rebuild.order_details>', res.body.data.rebuild.order_details);

        if(err) return done(err);
    
        expect(res.body).toBeInstanceOf(Object);

        const order: Order = res.body?.data?.rebuild;
        
        expect(order.order_id).toBe(1); 
        expect(order.order_number).toBe(gOrder.order_number);
        expect(order.status).toBe(qInput.status);
        expect(order.freight).toBe(qInput.freight);

        // expect(order.customer.customer_id).toBe(1);
        // expect(order.customer.customer_name).toBe(gCustomer.customer_name);
        
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

// #endregion

  //#endregion

  //#region f

  describe('[f] getOrderDetailsById', () => {

    //#region  [1] ✅

    // it('[1] should get OrderDetails by id()', async (done) => { 
        
    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create order
    //     const cInput = CreateOrderDetailsInputs[0];
    //     const gOrderDetails = await orderRepository.buildDetails(cInput);

    //     const query = 
    //     `
    //     query {
    //         getOrderDetailsById(order_id: ${1}){
    //             order_id,
    //             order_name
    //             password

    //             #order {
    //                 #order_id
    //                 #order_number
    //             #}

    //             person_id
    //             person {
    //                 person_id
    //                 person_role
    //                 person_name
    //             }
    //         }
    //     }
    //     `;
    
    //     request(app.getHttpServer())
    //     .post('/graphql')
    //     .send({
    //         operationName: null,
    //         query: query
    //     })
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end((err, res) => {
    
    //         // console.log('<e111> err:', err);
    //         console.log('<c1> res.body:', res.body);
    
    //         if(err) return done(err);
        
    //         expect(res.body).toBeInstanceOf(Object);
    
    //         const order: OrderDetails = res.body?.data?.getOrderDetailsById;
            
    //         expect(order.order_id).toBe(1); 
    //         expect(order.person_id).toBe(1); 
    //         expect(order.person.person_role).toBe(PersonRole.CUSTOMER); 
    //         expect(order.order_name).toBe(cInput.order_name);
    //         done();
    
    //     });
    
    // }, 20000);

    
    //#endregion

    });
  
  //#endregion

  //#region e

  describe('[e] rebuildDetails', () => {

    //#region  [1] ✅
    
    // it('[1] should update OrderDetails()', async (done) => { 
        
    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create order
    //     const cInput = CreateOrderDetailsInputs[0];
    //     const gOrderDetails = await orderRepository.buildDetails(cInput);

    //     // 🚧 updating order
    //     const qInput: UpdateOrderDetailsInput = UpdateOrderDetailsInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         rebuildDetails(order: ${fixInput(qInput)}){
    //           order_id
    //           order_name
    //           password

    //           #order {
    //               #order_id
    //               #order_number
    //           #}

    //           person_id
    //           person {
    //               person_id
    //               person_role
    //               person_name
    //           }
    //         }
    //     }
    //     `;
    
    //     request(app.getHttpServer())
    //     .post('/graphql')
    //     .send({
    //         operationName: null,
    //         query: query
    //     })
    //     .set('Accept', 'application/json')
    //     .expect(200)
    //     .end((err, res) => {
    
    //         // console.log('<e111> err:', err);
    //         console.log('<c1> res.body:', res.body);
    
    //         if(err) return done(err);
        
    //         expect(res.body).toBeInstanceOf(Object);
    
    //         const order: OrderDetails = res.body?.data?.rebuildDetails;
            
    //         expect(order.order_details_id).toBe(1);  
    //         expect(order.quantity).toBe(qInput.quantity);
    //         done();
    
    //     });
    
    // }, 20000);

    //#endregion
  
  });
  
  //#endregion
  

});





