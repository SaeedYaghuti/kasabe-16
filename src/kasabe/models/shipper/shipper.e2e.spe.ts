import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';


import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { ShipperService } from './shipper.service';
import { ShipperRepository } from './shipper.repository';
import { ShipperResolver } from './shipper.resolver';
import { UpdateShipperInput } from './dto/update_shipper.input';
import { CreateShipperInputs } from '../../../test/fixtures/kasabe/shipper/build.shipper.inputs';
import { Shipper } from './shipper.entity';

jest.setTimeout(90000);

//#region  Fake Class

class ShipperServiceFake {
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

describe('shipper.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let shipperService: ShipperService;
  let shipperRepository: ShipperRepository;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        ShipperRepository, 
        ShipperService,
        
        PersonRepository, 
        PersonService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    shipperService = app.get<ShipperService>(ShipperService);
    // shipperRepository = testUtils.databaseService.connection.getRepository(Shipper); // return Repository
    shipperRepository = testUtils.databaseService.connection.getCustomRepository(ShipperRepository);
    
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

    // it('[1] shipperService should be defined', async (done) => {
      
    //   expect(shipperService).toBeDefined();
    //   expect(shipperService).toBeInstanceOf(ShipperService);

    //   done();

    // }, 20000);
     
    // it('[3] shipperRepository should be defined', async (done) => {
      
    //   expect(shipperRepository).toBeDefined();
    //   expect(shipperRepository).toBeInstanceOf(ShipperRepository);

    //   done();

    // }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] shipperTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         shipperTestQuery(message: "Salam"){
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
    
    //         const shipper = res.body?.data?.shipperTestQuery;
            
    //         expect(shipper.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] shipperTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         shipperTestMutation(message: "Salam"){
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
    
    //         const shipper = res.body?.data?.shipperTestMutation;
            
    //         expect(shipper.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1]

    // it('[1] build()', async (done) => {  

    //     const qInput: CreateShipperInput = {
    //         shipper_name: "Gift Galery",
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
    //         build(shipper: ${fixInput(qInput)}){
    //             shipper_id
    //             shipper_name
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
    
    //         const shipper = res.body?.data?.build;
            
    //         expect(shipper.shipper_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(shipper.person_id).toBe(1); 
    //         expect(shipper.person.person_name).toBe(qInput.shipper_name); // ❓
    //         expect(shipper.shipper_name).toBe(qInput.shipper_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion

    //#region  [2]

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateShipperInput = {
    //         shipper_name: "Gift Galery",
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
    //         build(shipper: ${fixInput(qInput)}){
                
                
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
    
    //         const shipper = res.body?.data?.build;
            
    //         // expect(shipper.shipper_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(shipper.person_id).toBe(1); 
    //         expect(shipper.person.person_name).toBe(qInput.shipper_name); // ❓
    //         // expect(shipper.shipper_name).toBe(qInput.shipper_name);
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

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
        
    //     expect(gShipper.shipper_id).toEqual(1);


    //     const uInput: UpdateShipperInput = {
    //       shipper_id: gShipper.shipper_id,
    //       shipper_name: "new name",
    //       contact_name: gShipper.contact_name,
    //       contact_title: gShipper.contact_title,
    //       logo: gShipper.logo,
    //       note: gShipper.note,
    //       our_id: gShipper.our_id,
    //       url: gShipper.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(shipper: ${fixInput(uInput)}){
    //         shipper_id
    //         shipper_name
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
    
    //         const shipper = body?.data?.rebuild;
            
    //         expect(shipper).toBeDefined();
    //         expect(shipper.shipper_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(shipper.person_id).toBe(1); 
    //         expect(shipper.person.person_name).toBe(sampleInput.shipper_name); // ❓
    //         expect(shipper.shipper_name).toBe(uInput.shipper_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
    
    //#region  [2]

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
        
    //     expect(gShipper.shipper_id).toEqual(1);


    //     const uInput: UpdateShipperInput = {
    //       ...gShipper, // 🚩 include person {} that is not defined in UpdateShipperInput
    //       shipper_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(shipper: ${fixInput(uInput)}){
    //         shipper_id
    //         shipper_name
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

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
        
    //     expect(gShipper.shipper_id).toEqual(1);

    //     const uInput: UpdateShipperInput = {
    //       shipper_id: gShipper.shipper_id,
    //       shipper_name: "new name",
    //       contact_name: gShipper.contact_name,
    //       contact_title: gShipper.contact_title,
    //       logo: gShipper.logo,
    //       note: gShipper.note,
    //       our_id: gShipper.our_id,
    //       url: gShipper.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(shipper: ${fixInput(uInput)}){
    //         extrafield
    //         shipper_id
    //         shipper_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Shipper".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4]

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
        
    //     expect(gShipper.shipper_id).toEqual(1);

    //     const uInput: UpdateShipperInput = {
    //       shipper_id: gShipper.shipper_id,
    //       shipper_name: "new name",
    //       contact_name: gShipper.contact_name,
    //       contact_title: gShipper.contact_title,
    //       logo: gShipper.logo,
    //       note: gShipper.note,
    //       our_id: gShipper.our_id,
    //       url: gShipper.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(shipper: ${fixInput(uInput)}){
    //         shipper_id
    //         shipper_name
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

    // it('[5] no shipper hence should throw error while updating', async (done) => {  

    //     // const sampleInput = ShipperSampleInputs[0];
    //     // const gShipper = await shipperRepository.build(sampleInput);
        
    //     // expect(gShipper.shipper_id).toEqual(1);

    //     const uInput: UpdateShipperInput = {
    //       shipper_id: 1,
    //       shipper_name: "new name",
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
    //       rebuild(shipper: ${fixInput(uInput)}){
    //         shipper_id
    //         shipper_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Shipper" matching: 1');
        
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

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
    //     expect(gShipper.shipper_id).toEqual(1);

    //     // const uInput: UpdateShipperInput = {
    //     //   shipper_id: 1,
    //     //   shipper_name: "new name",
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
    //       fetchById(shipper_id: 1){
    //         shipper_id
    //         shipper_name
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
        
    //         const shipper: Shipper = body.data.fetchById;
    //         console.log('<e1| shipper>', shipper);
    //         expect(shipper.shipper_id).toEqual(1);
    //         expect(shipper.shipper_name).toEqual(sampleInput.shipper_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    

    //#region  [2]

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = ShipperSampleInputs[0];
    //     const gShipper = await shipperRepository.build(sampleInput);
    //     expect(gShipper.shipper_id).toEqual(1);

    //     // const uInput: UpdateShipperInput = {
    //     //   shipper_id: 1,
    //     //   shipper_name: "new name",
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
    //       fetchById(shipper_id: "1"){
    //         shipper_id
    //         shipper_name
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
        
    //         // const shipper: Shipper = body.data.fetchById;
    //         // console.log('<e1|shipper>', shipper);
    //         // expect(shipper.shipper_id).toEqual(1);
    //         // expect(shipper.shipper_name).toEqual(sampleInput.shipper_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3]

//     it('[3] shipper_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = ShipperSampleInputs[0];
//       // const gShipper = await shipperRepository.build(sampleInput);
//       // expect(gShipper.shipper_id).toEqual(1);

//       // const uInput: UpdateShipperInput = {
//       //   shipper_id: 1,
//       //   shipper_name: "new name",
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
//         fetchById(shipper_id: 1){
//           shipper_id
//           shipper_name
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
//           expect(body.errors[0].message).toEqual('There is no shipper with id 1');
      
//           // const shipper: Shipper = body.data.fetchById;
//           // expect(shipper).toBeNull();

//           // console.log('<e1| shipper>', shipper);
//           // expect(shipper.shipper_id).toEqual(1);
//           // expect(shipper.shipper_name).toEqual(sampleInput.shipper_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion

});





