import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';


import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { MerchantService } from './merchant.service';
import { MerchantRepository } from './merchant.repository';
import { MerchantResolver } from './merchant.resolver';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { BuildMerchantInputs } from '../../../test/fixtures/kasabe/merchant/build.merchant.inputs';
import { Merchant } from './merchant.entity';

jest.setTimeout(90000);

//#region  Fake Class

class MerchantServiceFake {
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

describe('merchant.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let merchantService: MerchantService;
  let merchantRepository: MerchantRepository;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        MerchantRepository, 
        MerchantService,
        
        PersonRepository, 
        PersonService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    merchantService = app.get<MerchantService>(MerchantService);
    // merchantRepository = testUtils.databaseService.connection.getRepository(Merchant); // return Repository
    merchantRepository = testUtils.databaseService.connection.getCustomRepository(MerchantRepository);
    
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

    it('[1] testUtils should be defined', async (done) => {
      
        expect(testUtils).toBeDefined();
  
        done();
  
    }, 20000);

    it('[1] merchantService should be defined', async (done) => {
      
      expect(merchantService).toBeDefined();
      expect(merchantService).toBeInstanceOf(MerchantService);

      done();

    }, 20000);
     
    it('[3] merchantRepository should be defined', async (done) => {
      
      expect(merchantRepository).toBeDefined();
      expect(merchantRepository).toBeInstanceOf(MerchantRepository);

      done();

    }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] merchantTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         merchantTestQuery(message: "Salam"){
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
    
    //         const merchant = res.body?.data?.merchantTestQuery;
            
    //         expect(merchant.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] merchantTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         merchantTestMutation(message: "Salam"){
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
    
    //         const merchant = res.body?.data?.merchantTestMutation;
            
    //         expect(merchant.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1]

    // it('[1] build()', async (done) => {  

    //     const qInput: BuildMerchantInput = {
    //         merchant_name: "Gift Galery",
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
    //         build(merchant: ${fixInput(qInput)}){
    //             merchant_id
    //             merchant_name
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
    
    //         const merchant = res.body?.data?.build;
            
    //         expect(merchant.merchant_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(merchant.person_id).toBe(1); 
    //         expect(merchant.person.person_name).toBe(qInput.merchant_name); // ❓
    //         expect(merchant.merchant_name).toBe(qInput.merchant_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion

    //#region  [2]

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: BuildMerchantInput = {
    //         merchant_name: "Gift Galery",
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
    //         build(merchant: ${fixInput(qInput)}){
                
                
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
    
    //         const merchant = res.body?.data?.build;
            
    //         // expect(merchant.merchant_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(merchant.person_id).toBe(1); 
    //         expect(merchant.person.person_name).toBe(qInput.merchant_name); // ❓
    //         // expect(merchant.merchant_name).toBe(qInput.merchant_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
  
  });
  
  //#endregion
  
  //#region d

  describe('[d] rebuild', () => {

    //#region  [1]
    
    // it('[1] should update succesfully', async (done) => {  

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
        
    //     expect(gMerchant.merchant_id).toEqual(1);


    //     const uInput: UpdateMerchantInput = {
    //       merchant_id: gMerchant.merchant_id,
    //       merchant_name: "new name",
    //       contact_name: gMerchant.contact_name,
    //       contact_title: gMerchant.contact_title,
    //       logo: gMerchant.logo,
    //       note: gMerchant.note,
    //       our_id: gMerchant.our_id,
    //       url: gMerchant.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(merchant: ${fixInput(uInput)}){
    //         merchant_id
    //         merchant_name
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
    
    //         const merchant = body?.data?.rebuild;
            
    //         expect(merchant).toBeDefined();
    //         expect(merchant.merchant_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(merchant.person_id).toBe(1); 
    //         expect(merchant.person.person_name).toBe(sampleInput.merchant_name); // ❓
    //         expect(merchant.merchant_name).toBe(uInput.merchant_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
    
    //#region  [2]

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
        
    //     expect(gMerchant.merchant_id).toEqual(1);


    //     const uInput: UpdateMerchantInput = {
    //       ...gMerchant, // 🚩 include person {} that is not defined in UpdateMerchantInput
    //       merchant_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(merchant: ${fixInput(uInput)}){
    //         merchant_id
    //         merchant_name
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

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
        
    //     expect(gMerchant.merchant_id).toEqual(1);

    //     const uInput: UpdateMerchantInput = {
    //       merchant_id: gMerchant.merchant_id,
    //       merchant_name: "new name",
    //       contact_name: gMerchant.contact_name,
    //       contact_title: gMerchant.contact_title,
    //       logo: gMerchant.logo,
    //       note: gMerchant.note,
    //       our_id: gMerchant.our_id,
    //       url: gMerchant.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(merchant: ${fixInput(uInput)}){
    //         extrafield
    //         merchant_id
    //         merchant_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Merchant".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4]

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
        
    //     expect(gMerchant.merchant_id).toEqual(1);

    //     const uInput: UpdateMerchantInput = {
    //       merchant_id: gMerchant.merchant_id,
    //       merchant_name: "new name",
    //       contact_name: gMerchant.contact_name,
    //       contact_title: gMerchant.contact_title,
    //       logo: gMerchant.logo,
    //       note: gMerchant.note,
    //       our_id: gMerchant.our_id,
    //       url: gMerchant.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(merchant: ${fixInput(uInput)}){
    //         merchant_id
    //         merchant_name
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
    
    //#region  [5]

    // it('[5] no merchant hence should throw error while updating', async (done) => {  

    //     // const sampleInput = MerchantSampleInputs[0];
    //     // const gMerchant = await merchantRepository.build(sampleInput);
        
    //     // expect(gMerchant.merchant_id).toEqual(1);

    //     const uInput: UpdateMerchantInput = {
    //       merchant_id: 1,
    //       merchant_name: "new name",
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
    //       rebuild(merchant: ${fixInput(uInput)}){
    //         merchant_id
    //         merchant_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Merchant" matching: 1');
        
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

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
    //     expect(gMerchant.merchant_id).toEqual(1);

    //     // const uInput: UpdateMerchantInput = {
    //     //   merchant_id: 1,
    //     //   merchant_name: "new name",
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
    //       fetchById(merchant_id: 1){
    //         merchant_id
    //         merchant_name
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
        
    //         const merchant: Merchant = body.data.fetchById;
    //         console.log('<e1| merchant>', merchant);
    //         expect(merchant.merchant_id).toEqual(1);
    //         expect(merchant.merchant_name).toEqual(sampleInput.merchant_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    

    //#region  [2]

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = MerchantSampleInputs[0];
    //     const gMerchant = await merchantRepository.build(sampleInput);
    //     expect(gMerchant.merchant_id).toEqual(1);

    //     // const uInput: UpdateMerchantInput = {
    //     //   merchant_id: 1,
    //     //   merchant_name: "new name",
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
    //       fetchById(merchant_id: "1"){
    //         merchant_id
    //         merchant_name
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
        
    //         // const merchant: Merchant = body.data.fetchById;
    //         // console.log('<e1|merchant>', merchant);
    //         // expect(merchant.merchant_id).toEqual(1);
    //         // expect(merchant.merchant_name).toEqual(sampleInput.merchant_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3]

//     it('[3] merchant_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = MerchantSampleInputs[0];
//       // const gMerchant = await merchantRepository.build(sampleInput);
//       // expect(gMerchant.merchant_id).toEqual(1);

//       // const uInput: UpdateMerchantInput = {
//       //   merchant_id: 1,
//       //   merchant_name: "new name",
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
//         fetchById(merchant_id: 1){
//           merchant_id
//           merchant_name
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
//           expect(body.errors[0].message).toEqual('There is no merchant with id 1');
      
//           // const merchant: Merchant = body.data.fetchById;
//           // expect(merchant).toBeNull();

//           // console.log('<e1| merchant>', merchant);
//           // expect(merchant.merchant_id).toEqual(1);
//           // expect(merchant.merchant_name).toEqual(sampleInput.merchant_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion

});





