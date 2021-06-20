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
import { OrderRepository } from '../order/order.repository';
import { OrderService } from '../order/order.service';
import { PersonRole } from '../person/person_role.enum';
import { OrderDetailsService } from './order_details.service';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetails } from './order_details.entity';
import { OrderDetailsRepository } from './order_details.repository';
import { CreateOrderDetailsInputs } from '../../../test/fixtures/kasabe/order_details/create.order_details.inputs';
import { UpdateOrderDetailsInputs } from '../../../test/fixtures/kasabe/order_details/update.order_details.input';
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
const fixInput = input => JSON.stringify(input).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
//#endregion

describe('orderDetails.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let orderDetailsService: OrderDetailsService;
  let orderDetailsRepository: OrderDetailsRepository;

  let personRepository: PersonRepository;
  
  let orderRepository: OrderRepository;
  

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
    // orderDetailsRepository = testUtils.databaseService.connection.getRepository(OrderDetails); // return Repository
    orderDetailsRepository = testUtils.databaseService.connection.getCustomRepository(OrderDetailsRepository);
    personRepository = testUtils.databaseService.connection.getCustomRepository(PersonRepository);
    orderRepository = testUtils.databaseService.connection.getCustomRepository(OrderRepository);
    
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

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] orderDetailsTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         orderDetailsTestQuery(message: "Salam"){
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
    
    //         const orderDetails = res.body?.data?.orderDetailsTestQuery;
            
    //         expect(orderDetails.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] orderDetailsTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         orderDetailsTestMutation(message: "Salam"){
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
    
    //         const orderDetails = res.body?.data?.orderDetailsTestMutation;
            
    //         expect(orderDetails.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] buildDetails', () => {

    //#region  [1] ✅

    // it('[1] buildDetails()', async (done) => {  

    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = personRepository.build(pInput);

    //     // 🚧 create order 
    //     // 🎯 ToDo

    //     const qInput: CreateOrderDetailsInput = CreateOrderDetailsInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         buildDetails(orderDetails: ${fixInput(qInput)}){
    //             orderDetails_id,
    //             orderDetails_name
    //             password
    //             order {
    //                 order_id
    //                 order_number
    //             }
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
    
    //         const orderDetails: OrderDetails = res.body?.data?.buildDetails;
            
    //         expect(orderDetails.orderDetails_id).toBe(1); 
    //         expect(orderDetails.person_id).toBe(1); 
    //         // expect(orderDetails.person.person_name).toBe(pInput.person_name); 
    //         expect(orderDetails.orderDetails_name).toBe(qInput.orderDetails_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    // #endregion

  });
  
  //#endregion
  

  //#region e

  describe('[d] getOrderDetailsById', () => {

    //#region  [1] ✅

    // it('[1] should get OrderDetails by id()', async (done) => { 
        
    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create orderDetails
    //     const cInput = CreateOrderDetailsInputs[0];
    //     const gOrderDetails = await orderDetailsRepository.buildDetails(cInput);

    //     const query = 
    //     `
    //     query {
    //         getOrderDetailsById(orderDetails_id: ${1}){
    //             orderDetails_id,
    //             orderDetails_name
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
    
    //         const orderDetails: OrderDetails = res.body?.data?.getOrderDetailsById;
            
    //         expect(orderDetails.orderDetails_id).toBe(1); 
    //         expect(orderDetails.person_id).toBe(1); 
    //         expect(orderDetails.person.person_role).toBe(PersonRole.CUSTOMER); 
    //         expect(orderDetails.orderDetails_name).toBe(cInput.orderDetails_name);
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
        
    //     // 🚧 create orderDetails
    //     const cInput = CreateOrderDetailsInputs[0];
    //     const gOrderDetails = await orderDetailsRepository.buildDetails(cInput);

    //     // 🚧 updating orderDetails
    //     const qInput: UpdateOrderDetailsInput = UpdateOrderDetailsInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         rebuildDetails(orderDetails: ${fixInput(qInput)}){
    //           orderDetails_id
    //           orderDetails_name
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
    
    //         const orderDetails: OrderDetails = res.body?.data?.rebuildDetails;
            
    //         expect(orderDetails.order_details_id).toBe(1);  
    //         expect(orderDetails.quantity).toBe(qInput.quantity);
    //         done();
    
    //     });
    
    // }, 20000);

    //#endregion
  
  });
  
  //#endregion
  
  
  
});





