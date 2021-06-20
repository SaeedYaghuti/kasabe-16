import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';


import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { Address } from './address.entity';
import { CreateAddressInput } from './dto/create_address.input';
import { CreateAddressInputs } from '../../../test/fixtures/kasabe/address/create.address.inputs';
import { of } from 'rxjs';
import { CreatePersonInputs } from '../../../test/fixtures/kasabe/person/create.person.inputs';
import { Person } from '../person/person.entity';
import { UpdateAddressInput } from './dto/update_address.input';
import { UpdateAddressInputs } from '../../../test/fixtures/kasabe/address/update.address.inputs';

jest.setTimeout(90000);

//#region  Fake Class

class AddressServiceFake {
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

describe('address.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let addressService: AddressService;
  let addressRepository: AddressRepository;
  let personRepository: PersonRepository;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        AddressRepository, 
        AddressService,
        
        PersonRepository, 
        PersonService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    addressService = app.get<AddressService>(AddressService);
    // addressRepository = testUtils.databaseService.connection.getRepository(Address); // return Repository
    addressRepository = testUtils.databaseService.connection.getCustomRepository(AddressRepository);
    personRepository = testUtils.databaseService.connection.getCustomRepository(PersonRepository);
    
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

    it('[1] addressService should be defined', async (done) => {
      
      expect(addressService).toBeDefined();
      expect(addressService).toBeInstanceOf(AddressService);

      done();

    }, 20000);
     
    it('[3] addressRepository should be defined', async (done) => {
      
      expect(addressRepository).toBeDefined();
      expect(addressRepository).toBeInstanceOf(AddressRepository);

      done();

    }, 20000);

  });
  
  //#endregion
 
  //#region b

  describe('[b] test queries', () => {

    
    // it('[1] addressTestQuery()', async (done) => {  

    //     const query = 
    //     `
    //     query {
    //         addressTestQuery(message: "Salam"){
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
    
    //         const address = res.body?.data?.addressTestQuery;
            
    //         expect(address.message).toBe("Salam");
    //         done();
    
    //     });
    
    // }, 20000);  
    
    
    // it('[2] addressTestMutation()', async (done) => {  

    //     const query = 
    //     `
    //     mutation {
    //         addressTestMutation(message: "Salam"){
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
    
    //         const address = res.body?.data?.addressTestMutation;
            
    //         expect(address.message).toBe("Salam");
    //         done();
    
    //     });
    
    //     }, 20000);  
    
    
  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    //#region  [1] ✅

    // it('[1] build()', async (done) => {  

    //     const pInput = CreatePersonInputs[0];
    //     const nPerson = Person.of(pInput);
    //     const gPerson = Person.save(nPerson);

    //     const qInput: CreateAddressInput = CreateAddressInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         build(address: ${fixInput(qInput)}){
    //             person_id,
    //             address_id,
    //             address_title
    //             address_line1
    //             address_line2
    //             location
    //             postal_code
    //             city
    //             state
    //             country
    //             email
    //             phone
    //             fax
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
    
    //         const address: Address = res.body?.data?.build;
            
    //         expect(address.address_id).toBe(1); 
    //         expect(address.person_id).toBe(1); 
    //         expect(address.person.person_name).toBe(pInput.person_name); 
    //         expect(address.address_title).toBe(qInput.address_title);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion

    //#region  [2] ❌

    // it('[2] freely choose witch parameter you want', async (done) => {  

    //     const qInput: CreateAddressInput = {
    //         address_name: "Gift Galery",
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
    //         build(address: ${fixInput(qInput)}){
                
                
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
    
    //         const address = res.body?.data?.build;
            
    //         // expect(address.address_id).toBe(1); // 🚩Int => number | ID => String
    //         expect(address.person_id).toBe(1); 
    //         expect(address.person.person_name).toBe(qInput.address_name); // ❓
    //         // expect(address.address_name).toBe(qInput.address_name);
    //         done();
    
    //     });
    
    // }, 20000);  
    
    //#endregion
  
  });
  
  //#endregion
  
  //#region d

  describe('[d] rebuild', () => {

    //#region  [1] ✅
    
    // it('[1] should update Address()', async (done) => { 
        
    //     // 🚧 create person
    //     const pInput = CreatePersonInputs[0];
    //     const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create address
    //     const aInput = CreateAddressInputs[0];
    //     const gAddress = await addressRepository.build(aInput);

    //     // 🚧 updating address
    //     const qInput: UpdateAddressInput = UpdateAddressInputs[0];

    //     const query = 
    //     `
    //     mutation {
    //         rebuild(address: ${fixInput(qInput)}){
    //             address_id
    //             address_title
    //             address_line1
    //             address_line2
    //             location
    //             postal_code
    //             city
    //             state
    //             country
    //             email
    //             phone
    //             fax
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
    
    //         const address: Address = res.body?.data?.rebuild;
            
    //         expect(address.address_id).toBe(1); 
    //         expect(address.person_id).toBe(1); 
    //         expect(address.person.person_name).toBe(pInput.person_name); 
    //         expect(address.address_title).toBe(qInput.address_title);
    //         done();
    
    //     });
    
    // }, 20000);

    //#endregion
    
    //#region  [2] ❌

    // it('[2] send extra data hence we must have err and error', async (done) => {  

    //     const sampleInput = AddressSampleInputs[0];
    //     const gAddress = await addressRepository.build(sampleInput);
        
    //     expect(gAddress.address_id).toEqual(1);


    //     const uInput: UpdateAddressInput = {
    //       ...gAddress, // 🚩 include person {} that is not defined in UpdateAddressInput
    //       address_name: "new name",
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(address: ${fixInput(uInput)}){
    //         address_id
    //         address_name
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

    //     const sampleInput = AddressSampleInputs[0];
    //     const gAddress = await addressRepository.build(sampleInput);
        
    //     expect(gAddress.address_id).toEqual(1);

    //     const uInput: UpdateAddressInput = {
    //       address_id: gAddress.address_id,
    //       address_name: "new name",
    //       contact_name: gAddress.contact_name,
    //       contact_title: gAddress.contact_title,
    //       logo: gAddress.logo,
    //       note: gAddress.note,
    //       our_id: gAddress.our_id,
    //       url: gAddress.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       rebuild(address: ${fixInput(uInput)}){
    //         extrafield
    //         address_id
    //         address_name
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
    //         expect(body.errors[0].message).toEqual('Cannot query field "extrafield" on type "Address".');
        
    //         expect(body.data).toBeUndefined();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion
    
    //#region  [4] ❌

    // it('[4] type in method-name hence cannot POST graphql', async (done) => {  

    //     const sampleInput = AddressSampleInputs[0];
    //     const gAddress = await addressRepository.build(sampleInput);
        
    //     expect(gAddress.address_id).toEqual(1);

    //     const uInput: UpdateAddressInput = {
    //       address_id: gAddress.address_id,
    //       address_name: "new name",
    //       contact_name: gAddress.contact_name,
    //       contact_title: gAddress.contact_title,
    //       logo: gAddress.logo,
    //       note: gAddress.note,
    //       our_id: gAddress.our_id,
    //       url: gAddress.url,
    //     }
        
    //     const query = 
    //     `
    //     mutation {
    //       updateShip(address: ${fixInput(uInput)}){
    //         address_id
    //         address_name
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

    // it('[5] no address hence should throw error while updating', async (done) => {  

    //     // const sampleInput = AddressSampleInputs[0];
    //     // const gAddress = await addressRepository.build(sampleInput);
        
    //     // expect(gAddress.address_id).toEqual(1);

    //     const uInput: UpdateAddressInput = {
    //       address_id: 1,
    //       address_name: "new name",
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
    //       rebuild(address: ${fixInput(uInput)}){
    //         address_id
    //         address_name
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
    //         expect(body.errors[0].message).toEqual('Could not find any entity of type "Address" matching: 1');
        
    //         expect(body.data).toBeNull();
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion

  
  });
  
  //#endregion
  
  
  //#region e

  describe('[e] fetchById', () => {

    //#region  [1] ✅

    // it('[1] should get Address by id()', async (done) => { 
        
    //     // 🚧 create person
    //     const pInput = CreatePersonInputs[0];
    //     const gPerson = await personRepository.build(pInput);
        
    //     // 🚧 create address
    //     const aInput = CreateAddressInputs[0];
    //     const gAddress = await addressRepository.build(aInput);

    //     const query = 
    //     `
    //     query {
    //         fetchById(address_id: ${1}){
    //             address_id
    //             address_title
    //             address_line1
    //             address_line2
    //             location
    //             postal_code
    //             city
    //             state
    //             country
    //             email
    //             phone
    //             fax
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
    
    //         const address: Address = res.body?.data?.fetchById;
            
    //         expect(address.address_id).toBe(1); 
    //         expect(address.person_id).toBe(1); 
    //         expect(address.person.person_name).toBe(pInput.person_name); 
    //         expect(address.address_title).toBe(aInput.address_title);
    //         done();
    
    //     });
    
    // }, 20000);

    
    //#endregion
    

    //#region  [2] ❌

    // it('[2] provided id is string though it must be number hence cannot POST graphql ', async (done) => {  

    //     const sampleInput = AddressSampleInputs[0];
    //     const gAddress = await addressRepository.build(sampleInput);
    //     expect(gAddress.address_id).toEqual(1);

    //     // const uInput: UpdateAddressInput = {
    //     //   address_id: 1,
    //     //   address_name: "new name",
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
    //       fetchById(address_id: "1"){
    //         address_id
    //         address_name
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
        
    //         // const address: Address = body.data.fetchById;
    //         // console.log('<e1|address>', address);
    //         // expect(address.address_id).toEqual(1);
    //         // expect(address.address_name).toEqual(sampleInput.address_name);
    //         done();
    
    //     });
    
    // }, 20000); 
    
    //#endregion


    //#region  [3] ❌

//     it('[3] address_id unavailable hence body.data should be null and have body.errors ', async (done) => {  

//       // const sampleInput = AddressSampleInputs[0];
//       // const gAddress = await addressRepository.build(sampleInput);
//       // expect(gAddress.address_id).toEqual(1);

//       // const uInput: UpdateAddressInput = {
//       //   address_id: 1,
//       //   address_name: "new name",
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
//         fetchById(address_id: 1){
//           address_id
//           address_name
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
//           expect(body.errors[0].message).toEqual('There is no address with id 1');
      
//           // const address: Address = body.data.fetchById;
//           // expect(address).toBeNull();

//           // console.log('<e1| address>', address);
//           // expect(address.address_id).toEqual(1);
//           // expect(address.address_name).toEqual(sampleInput.address_name);
//           done();
  
//       });
  
//   }, 20000); 
  
  //#endregion
  

    });
  
  //#endregion

});





