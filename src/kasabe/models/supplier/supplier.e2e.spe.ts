import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';

import { SupplierService } from './supplier.service';
import { SupplierRepository } from './supplier.repository';
import { SupplierResolver } from './supplier.resolver';

import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { SupplierSampleInputs } from '../../../test/fixtures/kasabe/supplier/supplier.sample.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { Length } from 'class-validator';
import { Supplier } from './supplier.entity';

jest.setTimeout(90000);

//#region  Fake Class

class SupplierServiceFake {
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

describe('supplier.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let supplierService: SupplierService;
  let supplierResolver: SupplierResolver;
  let supplierRepository: SupplierRepository;
  let http;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        SupplierRepository, 
        SupplierService,
        
        PersonRepository, 
        PersonService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    supplierService = app.get<SupplierService>(SupplierService);
    // supplierRepository = testUtils.databaseService.connection.getRepository(Supplier); // return Repository
    supplierRepository = testUtils.databaseService.connection.getCustomRepository(SupplierRepository);
    
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

    // it('[1] supplierService should be defined', async (done) => {
      
    //   expect(supplierService).toBeDefined();
    //   expect(supplierService).toBeInstanceOf(SupplierService);

    //   done();

    // }, 20000);
     
    // it('[3] supplierRepository should be defined', async (done) => {
      
    //   expect(supplierRepository).toBeDefined();
    //   expect(supplierRepository).toBeInstanceOf(SupplierRepository);

    //   done();

    // }, 20000);

  });
  
  //#endregion
 
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] supplierTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         supplierTestQuery(message: "Salam"){
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
    
    //         const supplier = res.body?.data?.supplierTestQuery;
            
    //         expect(supplier.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
    // it('[2] supplierTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         supplierTestMutation(message: "Salam"){
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
    
    //         const supplier = res.body?.data?.supplierTestMutation;
            
    //         expect(supplier.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    // it('[1] build()', async (done) => {  

    //     const qInput: CreateSupplierInput = {
    //         supplier_name: "Gift Galery",
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
    //         build(supplier: ${fixInput(qInput)}){
    //             supplier_id
    //             supplier_name
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
    
    //         const supplier = res.body?.data?.build;
            
    //         expect(supplier.supplier_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(supplier.person_id).toBe(1); 
    //         expect(supplier.person.person_name).toBe(qInput.supplier_name); // ❓
    //         expect(supplier.supplier_name).toBe(qInput.supplier_name);
    //         done();
    
    //     });
    
    // }, 20000);  


    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateSupplierInput = {
    //         supplier_name: "Gift Galery",
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
    //         build(supplier: ${fixInput(qInput)}){
                
                
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
    
    //         const supplier = res.body?.data?.build;
            
    //         // expect(supplier.supplier_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(supplier.person_id).toBe(1); 
    //         expect(supplier.person.person_name).toBe(qInput.supplier_name); // ❓
    //         // expect(supplier.supplier_name).toBe(qInput.supplier_name);
    //         done();
    
    //     });
    
    //     }, 20000);  
    
  
  });
  
  //#endregion
  
  //#region d

  describe('[d] rebuild', () => {

    //#region  [1]
    
    // it('[1] should update succesfully', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
        
    //     expect(gSupplier.supplier_id).toEqual(1);


    //     const uInput: UpdateSupplierInput = {
    //       supplier_id: gSupplier.supplier_id,
    //       supplier_name: "new name",
    //       contact_name: gSupplier.contact_name,
    //       contact_title: gSupplier.contact_title,
    //       logo: gSupplier.logo,
    //       note: gSupplier.note,
    //       our_id: gSupplier.our_id,
    //       url: gSupplier.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(supplier: ${fixInput(uInput)}){
    //         supplier_id
    //         supplier_name
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
    //         console.log('<c10> error:', error);
    //         console.log('<c11> error.message:', error.message);
    //         console.log('<c12> error.text:', error.text);
    //         console.log('<c13> error.status:', error.status);
    //         console.log('<c14> body:', body);
    //         console.log('<c15> body.errors:', body?.errors);
    //         console.log('<c16> JSON:body.errors:', JSON.stringify(body?.errors));
    //         console.log('<c17> body.data:', body?.data);
    //         console.log('<c18> body.data.rebuild:', body?.data?.rebuild);

    //         expect(err).toBeNull();
    //         expect(error).toEqual(false);
    //         expect(body.errors).toBeUndefined();
    
    //         // if(err.keys.lenhth > ) return done(JSON.stringify(err));
        
    //         expect(body).toBeInstanceOf(Object);
    
    //         const supplier = body?.data?.rebuild;
            
    //         expect(supplier).toBeDefined();
    //         expect(supplier.supplier_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(supplier.person_id).toBe(1); 
    //         expect(supplier.person.person_name).toBe(sampleInput.supplier_name); // ❓
    //         expect(supplier.supplier_name).toBe(uInput.supplier_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
    
    //#region  [2]

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
        
    //     expect(gSupplier.supplier_id).toEqual(1);


    //     const uInput: UpdateSupplierInput = {
    //       ...gSupplier, // 🚩 include person {} that is not defined in UpdateSupplierInput
    //       supplier_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(supplier: ${fixInput(uInput)}){
    //         supplier_id
    //         supplier_name
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
    
    
    //#region  [3]

    // it('[3] extra field in query hence cannot POST graphql', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
        
    //     expect(gSupplier.supplier_id).toEqual(1);

    //     const uInput: UpdateSupplierInput = {
    //       supplier_id: gSupplier.supplier_id,
    //       supplier_name: "new name",
    //       contact_name: gSupplier.contact_name,
    //       contact_title: gSupplier.contact_title,
    //       logo: gSupplier.logo,
    //       note: gSupplier.note,
    //       our_id: gSupplier.our_id,
    //       url: gSupplier.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(supplier: ${fixInput(uInput)}){
    //         extrafield
    //         supplier_id
    //         supplier_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Supplier".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4]

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
        
    //     expect(gSupplier.supplier_id).toEqual(1);

    //     const uInput: UpdateSupplierInput = {
    //       supplier_id: gSupplier.supplier_id,
    //       supplier_name: "new name",
    //       contact_name: gSupplier.contact_name,
    //       contact_title: gSupplier.contact_title,
    //       logo: gSupplier.logo,
    //       note: gSupplier.note,
    //       our_id: gSupplier.our_id,
    //       url: gSupplier.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateSupply(supplier: ${fixInput(uInput)}){
    //         supplier_id
    //         supplier_name
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
    //         expect(body.errors[0].message).toEqual("Cannot query field \"updateSupply\" on type \"Mutation\". Did you mean \"rebuild\", \"rebuild\", \"rebuild\", \"rebuild\", or \"build\"?");
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [5]

    // it('[5] no supplier hence should throw error while updating', async (done) => {  

    //     // const sampleInput = SupplierSampleInputs[0];
    //     // const gSupplier = await supplierRepository.build(sampleInput);
        
    //     // expect(gSupplier.supplier_id).toEqual(1);

    //     const uInput: UpdateSupplierInput = {
    //       supplier_id: 1,
    //       supplier_name: "new name",
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
    //       rebuild(supplier: ${fixInput(uInput)}){
    //         supplier_id
    //         supplier_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Supplier" matching: 1');
        
    //         expect(body.data).toBeNull();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion

  
  });
  
  //#endregion
  
  
  //#region e

  describe('[e] fetchById', () => {

    //#region  [1]

    // it('[1] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
    //     expect(gSupplier.supplier_id).toEqual(1);

    //     // const uInput: UpdateSupplierInput = {
    //     //   supplier_id: 1,
    //     //   supplier_name: "new name",
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
    //       fetchById(supplier_id: 1){
    //         supplier_id
    //         supplier_name
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

    //         console.log('<c10| e>', e);
    //         // console.log('<c10> e.message:', e.message);

    //         console.log('<c10| error>', error);
    //         console.log('<c11| error.message>', error.message);
    //         console.log('<c12| error.text>', error.text);
    //         console.log('<c13| error.status>', error.status);

    //         console.log('<c14| body>', body);

    //         console.log('<c15| body.errors>', body?.errors);
    //         console.log('<c16| body.errors>', JSON.stringify(body?.errors));
    //         console.log('<c17| body.data>', body?.data);
    //         console.log('<c18| body.data.rebuild>', body?.data?.rebuild);

    //         // expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
    //         expect(e).toBeNull();
            
    //         // expect(error.message).toEqual('cannot POST /graphql (400)');
    //         expect(error).toEqual(false);
            
    //         expect(body.data).toBeDefined();

    //         // expect(body.errors).toBeInstanceOf(Array);
    //         // expect(body.errors.length).toEqual(1);
    //         // expect(body.errors[0].message).toEqual('Expected type Float!, found "1".');
        
    //         const supplier: Supplier = body.data.fetchById;
    //         console.log('<e1| supplier>', supplier);
    //         expect(supplier.supplier_id).toEqual(1);
    //         expect(supplier.supplier_name).toEqual(sampleInput.supplier_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    

    //#region  [2]

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = SupplierSampleInputs[0];
    //     const gSupplier = await supplierRepository.build(sampleInput);
    //     expect(gSupplier.supplier_id).toEqual(1);

    //     // const uInput: UpdateSupplierInput = {
    //     //   supplier_id: 1,
    //     //   supplier_name: "new name",
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
    //       fetchById(supplier_id: "1"){
    //         supplier_id
    //         supplier_name
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
        
    //         // const supplier: Supplier = body.data.fetchById;
    //         // console.log('<e1|supplier>', supplier);
    //         // expect(supplier.supplier_id).toEqual(1);
    //         // expect(supplier.supplier_name).toEqual(sampleInput.supplier_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3]

    it('[3] supplier_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

      // const sampleInput = SupplierSampleInputs[0];
      // const gSupplier = await supplierRepository.build(sampleInput);
      // expect(gSupplier.supplier_id).toEqual(1);

      // const uInput: UpdateSupplierInput = {
      //   supplier_id: 1,
      //   supplier_name: "new name",
      //   contact_name: "davood",
      //   contact_title: "Mohandes",
      //   logo: 'logo.jpg',
      //   note: 'be careful',
      //   our_id: "saeid",
      //   url: "gift.gall",
      // }
      
      const query = 
      `
      query {
        fetchById(supplier_id: 1){
          supplier_id
          supplier_name
          contact_name
          contact_title
          logo
          note
          our_id
          url
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
      .end((e, {body, error}) => {

          // console.log('<c10| e>', e);
          // console.log('<c10> e.message:', e.message);

          // console.log('<c10| error>', error);
          // console.log('<c11| error.message>', error.message);
          // console.log('<c12| error.text>', error.text);
          // console.log('<c13| error.status>', error.status);

          // console.log('<c14| body>', body);

          // console.log('<c15| body.errors>', body?.errors);
          // console.log('<c16| body.errors>', JSON.stringify(body?.errors));
          // console.log('<c17| body.data>', body?.data);
          // console.log('<c18| body.data.rebuild>', body?.data?.rebuild);

          // expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
          expect(e).toBeNull();
          
          // expect(error.message).toEqual('cannot POST /graphql (400)');
          expect(error).toEqual(false);
          
          expect(body.data).toBeNull();

          expect(body.errors).toBeInstanceOf(Array);
          expect(body.errors.length).toEqual(1);
          expect(body.errors[0].message).toEqual('There is no supplier with id 1');
      
          // const supplier: Supplier = body.data.fetchById;
          // expect(supplier).toBeNull();

          // console.log('<e1| supplier>', supplier);
          // expect(supplier.supplier_id).toEqual(1);
          // expect(supplier.supplier_name).toEqual(sampleInput.supplier_name);
          done();
  
      });
  
  }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion

});




