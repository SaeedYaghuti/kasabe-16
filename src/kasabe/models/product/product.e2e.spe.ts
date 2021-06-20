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
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { TagRepository } from '../tag/tag.repository';
import { TagService } from '../tag/tag.service';
import { ProductCategoryRepository } from '../product_category/product_category.repository';
import { ProductCategoryService } from '../product_category/product_category.service';
import { CreateProductInput } from './dto/create_product.input';
import { Product } from './product.entity';
import { CreateProductInputs } from '../../../test/fixtures/kasabe/product/create.product.inputs';
import { UpdateProductInput } from './dto/update_product.input';
import { UpdateProductInputs } from '../../../test/fixtures/kasabe/product/update.product.input';

jest.setTimeout(90000);

//#region  Fake Class

class ProductServiceFake {
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

describe('product.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let productService: ProductService;
  let productRepository: ProductRepository;

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
        
        OrderRepository, 
        OrderService,
        
        ProductCategoryRepository, 
        ProductCategoryService,
        
        TagRepository, 
        TagService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    productService = app.get<ProductService>(ProductService);
    // productRepository = testUtils.databaseService.connection.getRepository(Product); // return Repository
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

    // it('[1] productService should be defined', async (done) => {
      
    //   expect(productService).toBeDefined();
    //   expect(productService).toBeInstanceOf(ProductService);

    //   done();

    // }, 20000);
     
    // it('[3] productRepository should be defined', async (done) => {
      
    //   expect(productRepository).toBeDefined();
    //   expect(productRepository).toBeInstanceOf(ProductRepository);

    //   done();

    // }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] productTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         productTestQuery(message: "Salam"){
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
    
    //         const product = res.body?.data?.productTestQuery;
            
    //         expect(product.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] productTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         productTestMutation(message: "Salam"){
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
    
    //         const product = res.body?.data?.productTestMutation;
            
    //         expect(product.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1] ✅

    it('[1] build()', async (done) => {  

        const qInput: CreateProductInput = CreateProductInputs[0];

        const query = 
        `
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
    
            const product: Product = res.body?.data?.build;
            
            expect(product.product_id).toBe(1); 
            expect(product.product_name).toBe(qInput.product_name);
            done();
    
        });
    
    }, 20000);  
    
    // #endregion

    //#region  [2] ❌

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateProductInput = {
    //         product_name: "Gift Galery",
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
    //         build(product: ${fixInput(qInput)}){
                
                
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
    
    //         const product = res.body?.data?.build;
            
    //         // expect(product.product_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(product.person_id).toBe(1); 
    //         expect(product.person.person_name).toBe(qInput.product_name); // ❓
    //         // expect(product.product_name).toBe(qInput.product_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
  
  });
  
  //#endregion
  

  //#region e

  describe('[d] fetchById', () => {

    //#region  [1] ✅

    it('[1] should get Product by id()', async (done) => { 
        
        // 🚧 create product
        const cInput = CreateProductInputs[0];
        const gProduct = await productRepository.build(cInput);

        const query = 
        `
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
    
            const product: Product = res.body?.data?.fetchById;
            
            expect(product.product_id).toBe(1); 
            expect(product.product_name).toBe(cInput.product_name);
            done();
    
        });
    
    }, 20000);

    
    //#endregion
    

    //#region  [2] ❌

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = ProductSampleInputs[0];
    //     const gProduct = await productRepository.build(sampleInput);
    //     expect(gProduct.product_id).toEqual(1);

    //     // const uInput: UpdateProductInput = {
    //     //   product_id: 1,
    //     //   product_name: "new name",
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
    //       fetchById(product_id: "1"){
    //         product_id
    //         product_name
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
        
    //         // const product: Product = body.data.fetchById;
    //         // console.log('<e1|product>', product);
    //         // expect(product.product_id).toEqual(1);
    //         // expect(product.product_name).toEqual(sampleInput.product_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3] ❌

//     it('[3] product_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = ProductSampleInputs[0];
//       // const gProduct = await productRepository.build(sampleInput);
//       // expect(gProduct.product_id).toEqual(1);

//       // const uInput: UpdateProductInput = {
//       //   product_id: 1,
//       //   product_name: "new name",
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
//         fetchById(product_id: 1){
//           product_id
//           product_name
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
//           expect(body.errors[0].message).toEqual('There is no product with id 1');
      
//           // const product: Product = body.data.fetchById;
//           // expect(product).toBeNull();

//           // console.log('<e1| product>', product);
//           // expect(product.product_id).toEqual(1);
//           // expect(product.product_name).toEqual(sampleInput.product_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion



  //#region e

  describe('[e] rebuild', () => {

    //#region  [1] ✅
    
    it('[1] should update Product()', async (done) => { 
        
        // 🚧 create person
        // const pInput = CreatePersonInputs[0];
        // const gPerson = await personRepository.build(pInput);
        
        // 🚧 create product
        const cInput = CreateProductInputs[0];
        const gProduct = await productRepository.build(cInput);

        // 🚧 updating product
        const qInput: UpdateProductInput = UpdateProductInputs[0];

        const query = 
        `
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
    
            const product: Product = res.body?.data?.rebuild;
            
            expect(product.product_id).toBe(1); 
            expect(product.product_name).toBe(qInput.product_name);
            done();
    
        });
    
    }, 20000);

    //#endregion
    
    //#region  [2] ❌

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = ProductSampleInputs[0];
    //     const gProduct = await productRepository.build(sampleInput);
        
    //     expect(gProduct.product_id).toEqual(1);


    //     const uInput: UpdateProductInput = {
    //       ...gProduct, // 🚩 include person {} that is not defined in UpdateProductInput
    //       product_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(product: ${fixInput(uInput)}){
    //         product_id
    //         product_name
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

    //     const sampleInput = ProductSampleInputs[0];
    //     const gProduct = await productRepository.build(sampleInput);
        
    //     expect(gProduct.product_id).toEqual(1);

    //     const uInput: UpdateProductInput = {
    //       product_id: gProduct.product_id,
    //       product_name: "new name",
    //       contact_name: gProduct.contact_name,
    //       contact_title: gProduct.contact_title,
    //       logo: gProduct.logo,
    //       note: gProduct.note,
    //       our_id: gProduct.our_id,
    //       url: gProduct.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(product: ${fixInput(uInput)}){
    //         extrafield
    //         product_id
    //         product_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Product".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4] ❌

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = ProductSampleInputs[0];
    //     const gProduct = await productRepository.build(sampleInput);
        
    //     expect(gProduct.product_id).toEqual(1);

    //     const uInput: UpdateProductInput = {
    //       product_id: gProduct.product_id,
    //       product_name: "new name",
    //       contact_name: gProduct.contact_name,
    //       contact_title: gProduct.contact_title,
    //       logo: gProduct.logo,
    //       note: gProduct.note,
    //       our_id: gProduct.our_id,
    //       url: gProduct.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(product: ${fixInput(uInput)}){
    //         product_id
    //         product_name
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

    // it('[5] no product hence should throw error while updating', async (done) => {  

    //     // const sampleInput = ProductSampleInputs[0];
    //     // const gProduct = await productRepository.build(sampleInput);
        
    //     // expect(gProduct.product_id).toEqual(1);

    //     const uInput: UpdateProductInput = {
    //       product_id: 1,
    //       product_name: "new name",
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
    //       rebuild(product: ${fixInput(uInput)}){
    //         product_id
    //         product_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Product" matching: 1');
        
    //         expect(body.data).toBeNull();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion

  
  });
  
  //#endregion
  
  
  
});





