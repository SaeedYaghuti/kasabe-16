import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';


import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { Customer } from './customer.entity';
import { of } from 'rxjs';
import { CreatePersonInputs } from '../../../test/fixtures/kasabe/person/create.person.inputs';
import { Person } from '../person/person.entity';
import { OrderRepository } from '../order/order.repository';
import { OrderService } from '../order/order.service';
import { CreateCustomerInputs } from '../../../test/fixtures/kasabe/customer/build.customer.inputs';
import { CreateCustomerInput } from './dto/create_customer.input';
import { PersonRole } from '../person/person_role.enum';
import { UpdateCustomerInput } from './dto/update_customer.input';
import { UpdateCustomerInputs } from '../../../test/fixtures/kasabe/customer/rebuild.customer.input';

jest.setTimeout(90000);

//#region  Fake Class

class CustomerServiceFake {
  public async testQuery(): Promise<void> {}
  public async build(): Promise<void> {}
  public async rebuild(): Promise<void> {}
  public async fetchById(): Promise<void> {}
}

//#endregion

//#region  modifing third item
const fixInput = input => JSON.stringify(input).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
//#endregion

describe('customer.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let customerService: CustomerService;
  let customerRepository: CustomerRepository;

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

        CustomerRepository, 
        CustomerService,
        
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
    customerService = app.get<CustomerService>(CustomerService);
    // customerRepository = testUtils.databaseService.connection.getRepository(Customer); // return Repository
    customerRepository = testUtils.databaseService.connection.getCustomRepository(CustomerRepository);
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

    // it('[1] customerService should be defined', async (done) => {
      
    //   expect(customerService).toBeDefined();
    //   expect(customerService).toBeInstanceOf(CustomerService);

    //   done();

    // }, 20000);
     
    // it('[3] customerRepository should be defined', async (done) => {
      
    //   expect(customerRepository).toBeDefined();
    //   expect(customerRepository).toBeInstanceOf(CustomerRepository);

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

    
    // it('[1] customerTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         customerTestQuery(message: "Salam"){
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
    
    //         const customer = res.body?.data?.customerTestQuery;
            
    //         expect(customer.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] customerTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         customerTestMutation(message: "Salam"){
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
    
    //         const customer = res.body?.data?.customerTestMutation;
            
    //         expect(customer.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1] ✅

    // it('[1] build()', async (done) => {  

    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = personRepository.build(pInput);

    //     // 🚧 create order 
    //     // 🎯 ToDo

    //     const qInput: CreateCustomerInput = CreateCustomerInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         build(customer: ${fixInput(qInput)}){
    //             customer_id,
    //             customer_name
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
    
    //         const customer: Customer = res.body?.data?.build;
            
    //         expect(customer.customer_id).toBe(1); 
    //         expect(customer.person_id).toBe(1); 
    //         // expect(customer.person.person_name).toBe(pInput.person_name); 
    //         expect(customer.customer_name).toBe(qInput.customer_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    // #endregion

    //#region  [2] ❌

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateCustomerInput = {
    //         customer_name: "Gift Galery",
    //         contact_name: "Davood",
    //         contact_title: "Aqa",
    //         logo: "galery.jpg",
    //         note: "trusted",
    //         our_id: "supp01",
    //         url: "giftgallery.com"
    //     }

    //     const query = 
    //     `
    //     mutation {
    //         build(customer: ${fixInput(qInput)}){
                
                
    //             contact_name
    //             contact_title
    //             logo
    //             note
    //             our_id
    //             url
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
    
    //         const customer = res.body?.data?.build;
            
    //         // expect(customer.customer_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(customer.person_id).toBe(1); 
    //         expect(customer.person.person_name).toBe(qInput.customer_name); // ❓
    //         // expect(customer.customer_name).toBe(qInput.customer_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
  
  });
  
  //#endregion
  

  //#region e

  describe('[d] fetchById', () => {

    //#region  [1] ✅

    it('[1] should get Customer by id()', async (done) => { 
        
        // 🚧 create person
        // const pInput = CreatePersonInputs[0];
        // const gPerson = await personRepository.build(pInput);
        
        // 🚧 create customer
        const cInput = CreateCustomerInputs[0];
        const gCustomer = await customerRepository.build(cInput);

        const query = 
        `
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
    
        request(app.getHttpServer())
        .post('/graphql')
        .send({
            operationName: null,
            query: query
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
    
            // console.log('<e111> err:', err);
            console.log('<c1> res.body:', res.body);
    
            if(err) return done(err);
        
            expect(res.body).toBeInstanceOf(Object);
    
            const customer: Customer = res.body?.data?.fetchById;
            
            expect(customer.customer_id).toBe(1); 
            expect(customer.person_id).toBe(1); 
            expect(customer.person.person_role).toBe(PersonRole.CUSTOMER); 
            expect(customer.customer_name).toBe(cInput.customer_name);
            done();
    
        });
    
    }, 20000);

    
    //#endregion
    

    //#region  [2] ❌

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = CustomerSampleInputs[0];
    //     const gCustomer = await customerRepository.build(sampleInput);
    //     expect(gCustomer.customer_id).toEqual(1);

    //     // const uInput: UpdateCustomerInput = {
    //     //   customer_id: 1,
    //     //   customer_name: "new name",
    //     //   contact_name: "davood",
    //     //   contact_title: "Mohandes",
    //     //   logo: 'logo.jpg',
    //     //   note: 'be careful',
    //     //   our_id: "saeid",
    //     //   url: "gift.gall",
    //     // }
        
    //     const query = 
    //     `
    //     query {
    //       fetchById(customer_id: "1"){
    //         customer_id
    //         customer_name
    //         contact_name
    //         contact_title
    //         logo
    //         note
    //         our_id
    //         url
    //         person_id
    //         person {
    //           person_id
    //           person_role
    //           person_name
    //         }
    //       }
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
    //     .end((e, {body, error}) => {

    //         console.log('<c10> e:', e);
    //         // console.log('<c10> e.message:', e.message);

    //         console.log('<c10> error:', error);
    //         console.log('<c11> error.message:', error.message);
    //         console.log('<c12> error.text:', error.text);
    //         console.log('<c13> error.status:', error.status);

    //         console.log('<c14> body:', body);

    //         console.log('<c15> body.errors:', body?.errors);
    //         console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         console.log('<c17> body.data:', body?.data);
    //         console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
    //         // expect(e).toBeNull();
            
    //         expect(error.message).toEqual('cannot POST /graphql (400)');
    //         // expect(error).toEqual(false);
            
    //         expect(body.data).toBeUndefined();

    //         expect(body.errors).toBeInstanceOf(Array);
    //         expect(body.errors.length).toEqual(1);
    //         expect(body.errors[0].message).toEqual('Expected type Float!, found "1".');
        
    //         // const customer: Customer = body.data.fetchById;
    //         // console.log('<e1|customer>', customer);
    //         // expect(customer.customer_id).toEqual(1);
    //         // expect(customer.customer_name).toEqual(sampleInput.customer_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3] ❌

//     it('[3] customer_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = CustomerSampleInputs[0];
//       // const gCustomer = await customerRepository.build(sampleInput);
//       // expect(gCustomer.customer_id).toEqual(1);

//       // const uInput: UpdateCustomerInput = {
//       //   customer_id: 1,
//       //   customer_name: "new name",
//       //   contact_name: "davood",
//       //   contact_title: "Mohandes",
//       //   logo: 'logo.jpg',
//       //   note: 'be careful',
//       //   our_id: "saeid",
//       //   url: "gift.gall",
//       // }
      
//       const query = 
//       `
//       query {
//         fetchById(customer_id: 1){
//           customer_id
//           customer_name
//           contact_name
//           contact_title
//           logo
//           note
//           our_id
//           url
//           person_id
//           person {
//             person_id
//             person_role
//             person_name
//           }
//         }
//       }
//       `;
  
//       request(app.getHttpServer())
//       .post('/graphql')
//       .send({
//           operationName: null,
//           query: query
//       })
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((e, {body, error}) => {

//           // console.log('<c10| e>', e);
//           // console.log('<c10> e.message:', e.message);

//           // console.log('<c10| error>', error);
//           // console.log('<c11| error.message>', error.message);
//           // console.log('<c12| error.text>', error.text);
//           // console.log('<c13| error.status>', error.status);

//           // console.log('<c14| body>', body);

//           // console.log('<c15| body.errors>', body?.errors);
//           // console.log('<c16| body.errors>', JSON.stringify(body?.errors));
//           // console.log('<c17| body.data>', body?.data);
//           // console.log('<c18| body.data.rebuild>', body?.data?.rebuild);

//           // expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
//           expect(e).toBeNull();
          
//           // expect(error.message).toEqual('cannot POST /graphql (400)');
//           expect(error).toEqual(false);
          
//           expect(body.data).toBeNull();

//           expect(body.errors).toBeInstanceOf(Array);
//           expect(body.errors.length).toEqual(1);
//           expect(body.errors[0].message).toEqual('There is no customer with id 1');
      
//           // const customer: Customer = body.data.fetchById;
//           // expect(customer).toBeNull();

//           // console.log('<e1| customer>', customer);
//           // expect(customer.customer_id).toEqual(1);
//           // expect(customer.customer_name).toEqual(sampleInput.customer_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion



  //#region e

  describe('[e] rebuild', () => {

    //#region  [1] ✅
    
    it('[1] should update Customer()', async (done) => { 
        
        // 🚧 create person
        // const pInput = CreatePersonInputs[0];
        // const gPerson = await personRepository.build(pInput);
        
        // 🚧 create customer
        const cInput = CreateCustomerInputs[0];
        const gCustomer = await customerRepository.build(cInput);

        // 🚧 updating customer
        const qInput: UpdateCustomerInput = UpdateCustomerInputs[0];

        const query = 
        `
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
    
        request(app.getHttpServer())
        .post('/graphql')
        .send({
            operationName: null,
            query: query
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
    
            // console.log('<e111> err:', err);
            console.log('<c1> res.body:', res.body);
    
            if(err) return done(err);
        
            expect(res.body).toBeInstanceOf(Object);
    
            const customer: Customer = res.body?.data?.rebuild;
            
            expect(customer.customer_id).toBe(1); 
            expect(customer.person_id).toBe(1); 
            expect(customer.person.person_role).toBe(PersonRole.CUSTOMER); 
            expect(customer.customer_name).toBe(qInput.customer_name);
            done();
    
        });
    
    }, 20000);

    //#endregion
    
    //#region  [2] ❌

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = CustomerSampleInputs[0];
    //     const gCustomer = await customerRepository.build(sampleInput);
        
    //     expect(gCustomer.customer_id).toEqual(1);


    //     const uInput: UpdateCustomerInput = {
    //       ...gCustomer, // 🚩 include person {} that is not defined in UpdateCustomerInput
    //       customer_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(customer: ${fixInput(uInput)}){
    //         customer_id
    //         customer_name
    //         contact_name
    //         contact_title
    //         logo
    //         note
    //         our_id
    //         url
    //         person_id
    //         person {
    //           person_id
    //           person_role
    //           person_name
    //         }
    //       }
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
    //     .end((err, {body, error}) => {

    //         console.log('<c10> err:', err);
    //         console.log('<c10> err.message:', err.message);

    //         console.log('<c10> error:', error);
    //         console.log('<c11> error.message:', error.message);
    //         console.log('<c12> error.text:', error.text);
    //         console.log('<c13> error.status:', error.status);

    //         console.log('<c14> body:', body);

    //         console.log('<c15> body.errors:', body?.errors);
    //         console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         console.log('<c17> body.data:', body?.data);
    //         console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         expect(err.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
            
    //         expect(error.message).toEqual('cannot POST /graphql (400)');
            
    //         expect(body.errors).toBeInstanceOf(Array);
    //         expect(body.errors.length).toEqual(2);
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [3] ❌

    // it('[3] extra field in query hence cannot POST graphql', async (done) => {  

    //     const sampleInput = CustomerSampleInputs[0];
    //     const gCustomer = await customerRepository.build(sampleInput);
        
    //     expect(gCustomer.customer_id).toEqual(1);

    //     const uInput: UpdateCustomerInput = {
    //       customer_id: gCustomer.customer_id,
    //       customer_name: "new name",
    //       contact_name: gCustomer.contact_name,
    //       contact_title: gCustomer.contact_title,
    //       logo: gCustomer.logo,
    //       note: gCustomer.note,
    //       our_id: gCustomer.our_id,
    //       url: gCustomer.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(customer: ${fixInput(uInput)}){
    //         extrafield
    //         customer_id
    //         customer_name
    //         contact_name
    //         contact_title
    //         logo
    //         note
    //         our_id
    //         url
    //         person_id
    //         person {
    //           person_id
    //           person_role
    //           person_name
    //         }
    //       }
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
    //     .end((e, {body, error}) => {

    //         // console.log('<c10> e:', e);
    //         // console.log('<c10> e.message:', e.message);

    //         // console.log('<c10> error:', error);
    //         // console.log('<c11> error.message:', error.message);
    //         // console.log('<c12> error.text:', error.text);
    //         // console.log('<c13> error.status:', error.status);

    //         // console.log('<c14> body:', body);

    //         // console.log('<c15> body.errors:', body?.errors);
    //         // console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         // console.log('<c17> body.data:', body?.data);
    //         // console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
            
    //         expect(error.message).toEqual('cannot POST /graphql (400)');
            
    //         expect(body.errors).toBeInstanceOf(Array);
    //         expect(body.errors.length).toEqual(1);
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Customer".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4] ❌

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = CustomerSampleInputs[0];
    //     const gCustomer = await customerRepository.build(sampleInput);
        
    //     expect(gCustomer.customer_id).toEqual(1);

    //     const uInput: UpdateCustomerInput = {
    //       customer_id: gCustomer.customer_id,
    //       customer_name: "new name",
    //       contact_name: gCustomer.contact_name,
    //       contact_title: gCustomer.contact_title,
    //       logo: gCustomer.logo,
    //       note: gCustomer.note,
    //       our_id: gCustomer.our_id,
    //       url: gCustomer.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(customer: ${fixInput(uInput)}){
    //         customer_id
    //         customer_name
    //         contact_name
    //         contact_title
    //         logo
    //         note
    //         our_id
    //         url
    //         person_id
    //         person {
    //           person_id
    //           person_role
    //           person_name
    //         }
    //       }
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
    //     .end((e, {body, error}) => {

    //         // console.log('<c10> e:', e);
    //         // console.log('<c10> e.message:', e.message);

    //         // console.log('<c10> error:', error);
    //         // console.log('<c11> error.message:', error.message);
    //         // console.log('<c12> error.text:', error.text);
    //         // console.log('<c13> error.status:', error.status);

    //         // console.log('<c14> body:', body);

    //         // console.log('<c15> body.errors:', body?.errors);
    //         // console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         // console.log('<c17> body.data:', body?.data);
    //         // console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
            
    //         expect(error.message).toEqual('cannot POST /graphql (400)');
            
    //         expect(body.errors).toBeInstanceOf(Array);
    //         expect(body.errors.length).toEqual(1);
    //         expect(body.errors[0].message).toContain("Cannot query field \"updateShip\" on type \"Mutation\".");
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [5] ❌

    // it('[5] no customer hence should throw error while updating', async (done) => {  

    //     // const sampleInput = CustomerSampleInputs[0];
    //     // const gCustomer = await customerRepository.build(sampleInput);
        
    //     // expect(gCustomer.customer_id).toEqual(1);

    //     const uInput: UpdateCustomerInput = {
    //       customer_id: 1,
    //       customer_name: "new name",
    //       contact_name: "davood",
    //       contact_title: "Mohandes",
    //       logo: 'logo.jpg',
    //       note: 'be careful',
    //       our_id: "saeid",
    //       url: "gift.gall",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(customer: ${fixInput(uInput)}){
    //         customer_id
    //         customer_name
    //         contact_name
    //         contact_title
    //         logo
    //         note
    //         our_id
    //         url
    //         person_id
    //         person {
    //           person_id
    //           person_role
    //           person_name
    //         }
    //       }
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
    //     .end((e, {body, error}) => {

    //         console.log('<c10> e:', e);
    //         // console.log('<c10> e.message:', e.message);

    //         console.log('<c10> error:', error);
    //         console.log('<c11> error.message:', error.message);
    //         console.log('<c12> error.text:', error.text);
    //         console.log('<c13> error.status:', error.status);

    //         console.log('<c14> body:', body);

    //         console.log('<c15> body.errors:', body?.errors);
    //         console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         console.log('<c17> body.data:', body?.data);
    //         console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         // expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
    //         expect(e).toBeNull();
            
    //         // expect(error.message).toEqual('cannot POST /graphql (400)');
    //         expect(error).toEqual(false);
            
    //         expect(body.errors).toBeInstanceOf(Array);
    //         expect(body.errors.length).toEqual(1);
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Customer" matching: 1');
        
    //         expect(body.data).toBeNull();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion

  
  });
  
  //#endregion
  
  
  
});





