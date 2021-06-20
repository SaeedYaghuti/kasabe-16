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
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryRepository } from './product_category.repository';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { CreateProductCategoryInputs } from '../../../test/fixtures/kasabe/product_category/create.product_category.inputs';
import { CreateProductCategoryInput } from './dto/create_product_category.input';
import { ProductCategory } from './product_category.entity';
import { UpdateProductCategoryInput } from './dto/update_product_category.input';
import { UpdateProductCategoryInputs } from '../../../test/fixtures/kasabe/product_category/update.product_category.input';

jest.setTimeout(90000);

//#region  Fake Class

class ProductCategoryServiceFake {
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

describe('productCategory.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let productCategoryService: ProductCategoryService;
  let productRepository: ProductRepository;
  let productCategoryRepository: ProductCategoryRepository;

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

        ProductRepository, 
        ProductService,
        
        ProductCategoryRepository, 
        ProductCategoryService,
        
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
    productCategoryService = app.get<ProductCategoryService>(ProductCategoryService);
    // productCategoryRepository = testUtils.databaseService.connection.getRepository(ProductCategory); // return Repository
    productCategoryRepository = testUtils.databaseService.connection.getCustomRepository(ProductCategoryRepository);
    productRepository = testUtils.databaseService.connection.getCustomRepository(ProductRepository);
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
     
    // it('[2] productRepository should be defined', async (done) => {
      
    //   expect(productRepository).toBeDefined();
    //   expect(productRepository).toBeInstanceOf(ProductRepository);

    //   done();

    // }, 20000);

    // it('[3] productCategoryService should be defined', async (done) => {
      
    //   expect(productCategoryService).toBeDefined();
    //   expect(productCategoryService).toBeInstanceOf(ProductCategoryService);

    //   done();

    // }, 20000);
     
    // it('[4] productCategoryRepository should be defined', async (done) => {
      
    //   expect(productCategoryRepository).toBeDefined();
    //   expect(productCategoryRepository).toBeInstanceOf(ProductCategoryRepository);

    //   done();

    // }, 20000);
    
    // it('[5] orderRepository should be defined', async (done) => {
      
    //   expect(orderRepository).toBeDefined();
    //   expect(orderRepository).toBeInstanceOf(OrderRepository);

    //   done();

    // }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] productCategoryTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         productCategoryTestQuery(message: "Salam"){
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
    
    //         const productCategory = res.body?.data?.productCategoryTestQuery;
            
    //         expect(productCategory.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] productCategoryTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         productCategoryTestMutation(message: "Salam"){
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
    
    //         const productCategory = res.body?.data?.productCategoryTestMutation;
            
    //         expect(productCategory.message).toBe("Salam");
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

    //     const qInput: CreateProductCategoryInput = CreateProductCategoryInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         build(productCategory: ${fixInput(qInput)}){
    //             id
    //             category_name
    //             category_description
    //             children {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parent {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parentId
    //             flag_product_id
    //             flag_product {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
    //             }
    //             picture_url
    //             isActive
    //             products {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
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
    
    //         const productCategory: ProductCategory = res.body?.data?.build;
            
    //         expect(productCategory.id).toBe(1); 
    //         // expect(productCategory.person_id).toBe(1); 
    //         // expect(productCategory.person.person_name).toBe(pInput.person_name); 
    //         expect(productCategory.category_name).toBe(qInput.category_name);
    //         done();
    
    //     });
    
    // }, 20000);
    
    // #endregion

    //#region  [2] ❌

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateProductCategoryInput = {
    //         productCategory_name: "Gift Galery",
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
    //         build(productCategory: ${fixInput(qInput)}){
                
                
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
    
    //         const productCategory = res.body?.data?.build;
            
    //         // expect(productCategory.productCategory_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(productCategory.person_id).toBe(1); 
    //         expect(productCategory.person.person_name).toBe(qInput.productCategory_name); // ❓
    //         // expect(productCategory.productCategory_name).toBe(qInput.productCategory_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
  
  });
  
  //#endregion
  

  //#region e

  describe('[d] fetchById', () => {

    //#region  [1] ✅

    // it('[1] should get ProductCategory by id()', async (done) => { 
        
    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create productCategory
    //     const pcInput = CreateProductCategoryInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(pcInput);

    //     const query = 
    //     `
    //     query {
    //         fetchById(productCategory_id: ${1}){
    //             id
    //             category_name
    //             category_description
    //             children {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parent {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parentId
    //             flag_product_id
    //             flag_product {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
    //             }
    //             picture_url
    //             isActive
    //             products {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
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
    
    //         const productCategory: ProductCategory = res.body?.data?.fetchById;
            
    //         expect(productCategory.id).toBe(1); 
    //         expect(productCategory.category_name).toBe(pcInput.category_name); 
    //         done();
    
    //     });
    
    // }, 20000);

    
    //#endregion
    

    //#region  [2] ❌

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = ProductCategorySampleInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(sampleInput);
    //     expect(gProductCategory.productCategory_id).toEqual(1);

    //     // const uInput: UpdateProductCategoryInput = {
    //     //   productCategory_id: 1,
    //     //   productCategory_name: "new name",
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
    //       fetchById(productCategory_id: "1"){
    //         productCategory_id
    //         productCategory_name
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
        
    //         // const productCategory: ProductCategory = body.data.fetchById;
    //         // console.log('<e1|productCategory>', productCategory);
    //         // expect(productCategory.productCategory_id).toEqual(1);
    //         // expect(productCategory.productCategory_name).toEqual(sampleInput.productCategory_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3] ❌

//     it('[3] productCategory_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = ProductCategorySampleInputs[0];
//       // const gProductCategory = await productCategoryRepository.build(sampleInput);
//       // expect(gProductCategory.productCategory_id).toEqual(1);

//       // const uInput: UpdateProductCategoryInput = {
//       //   productCategory_id: 1,
//       //   productCategory_name: "new name",
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
//         fetchById(productCategory_id: 1){
//           productCategory_id
//           productCategory_name
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
//           expect(body.errors[0].message).toEqual('There is no productCategory with id 1');
      
//           // const productCategory: ProductCategory = body.data.fetchById;
//           // expect(productCategory).toBeNull();

//           // console.log('<e1| productCategory>', productCategory);
//           // expect(productCategory.productCategory_id).toEqual(1);
//           // expect(productCategory.productCategory_name).toEqual(sampleInput.productCategory_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion



  //#region e

  describe('[e] rebuild', () => {

    //#region  [1] ✅
    
    // it('[1] should update ProductCategory()', async (done) => { 
        
    //     // 🚧 create person
    //     // const pInput = CreatePersonInputs[0];
    //     // const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create productCategory
    //     const cInput = CreateProductCategoryInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(cInput);

    //     // 🚧 updating productCategory
    //     const qInput: UpdateProductCategoryInput = UpdateProductCategoryInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         rebuild(productCategory: ${fixInput(qInput)}){
    //             id
    //             category_name
    //             category_description
    //             children {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parent {
    //                 id
    //                 category_name
    //                 category_description
    //             }
    //             parentId
    //             flag_product_id
    //             flag_product {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
    //             }
    //             picture_url
    //             isActive
    //             products {
    //                 product_id
    //                 sku
    //                 supplier_sku
    //                 #category
    //                 #product_category_id
    //                 product_name
    //                 msrp
    //                 price
    //                 price_currency
    //                 currency_symbole
    //                 unit_title
    //                 unit_weight
    //                 unit_weight_title
    //                 is_discount
    //                 discount
    //                 ranking
    //                 reorder_level
    //                 is_active
    //                 #tags {
    //                 #}
    //                 #order_details {
    //                 #}
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
    
    //         const productCategory: ProductCategory = res.body?.data?.rebuild;
            
    //         expect(productCategory.id).toBe(1); 
    //         expect(productCategory.id).toBe(1); 
    //         expect(productCategory.category_name).toBe(qInput.category_name); 
    //         done();
    
    //     });
    
    // }, 20000);

    //#endregion
    
    //#region  [2] ❌

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = ProductCategorySampleInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(sampleInput);
        
    //     expect(gProductCategory.productCategory_id).toEqual(1);


    //     const uInput: UpdateProductCategoryInput = {
    //       ...gProductCategory, // 🚩 include person {} that is not defined in UpdateProductCategoryInput
    //       productCategory_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(productCategory: ${fixInput(uInput)}){
    //         productCategory_id
    //         productCategory_name
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

    //     const sampleInput = ProductCategorySampleInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(sampleInput);
        
    //     expect(gProductCategory.productCategory_id).toEqual(1);

    //     const uInput: UpdateProductCategoryInput = {
    //       productCategory_id: gProductCategory.productCategory_id,
    //       productCategory_name: "new name",
    //       contact_name: gProductCategory.contact_name,
    //       contact_title: gProductCategory.contact_title,
    //       logo: gProductCategory.logo,
    //       note: gProductCategory.note,
    //       our_id: gProductCategory.our_id,
    //       url: gProductCategory.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(productCategory: ${fixInput(uInput)}){
    //         extrafield
    //         productCategory_id
    //         productCategory_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "ProductCategory".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4] ❌

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = ProductCategorySampleInputs[0];
    //     const gProductCategory = await productCategoryRepository.build(sampleInput);
        
    //     expect(gProductCategory.productCategory_id).toEqual(1);

    //     const uInput: UpdateProductCategoryInput = {
    //       productCategory_id: gProductCategory.productCategory_id,
    //       productCategory_name: "new name",
    //       contact_name: gProductCategory.contact_name,
    //       contact_title: gProductCategory.contact_title,
    //       logo: gProductCategory.logo,
    //       note: gProductCategory.note,
    //       our_id: gProductCategory.our_id,
    //       url: gProductCategory.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(productCategory: ${fixInput(uInput)}){
    //         productCategory_id
    //         productCategory_name
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

    // it('[5] no productCategory hence should throw error while updating', async (done) => {  

    //     // const sampleInput = ProductCategorySampleInputs[0];
    //     // const gProductCategory = await productCategoryRepository.build(sampleInput);
        
    //     // expect(gProductCategory.productCategory_id).toEqual(1);

    //     const uInput: UpdateProductCategoryInput = {
    //       productCategory_id: 1,
    //       productCategory_name: "new name",
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
    //       rebuild(productCategory: ${fixInput(uInput)}){
    //         productCategory_id
    //         productCategory_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "ProductCategory" matching: 1');
        
    //         expect(body.data).toBeNull();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion

  
  });
  
  //#endregion
  
  
  
});





