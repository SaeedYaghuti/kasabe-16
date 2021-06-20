import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import request from 'supertest';

import { SupplierService } from './supplier.service';
import { SupplierRepository } from './supplier.repository';
import { SupplierResolver } from './supplier.resolver';

import { PersonRepository } from '../person/person.repository';
import { PersonService } from '../person/person.service';
import { SupplierSampleInputs } from '../../../test/fixtures/kasabe/supplier/supplier.sample.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { KasabeTestFakeModule, SupplierServiceFake, SupplierResolverFake } from '../../kasabe_test_fake.module';
import { Supplier } from './supplier.entity';
import { PersonRole } from '../person/person_role.enum';
import { Person } from '../person/person.entity';

jest.setTimeout(90000);

//#region  Fake Class

// class SupplierServiceFake {
//   public async testQuery(): Promise<void> {}
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }

//#endregion

//#region  modifing third item
const fixInput = input => JSON.stringify(input).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);
//#endregion

describe('supplier.e2f.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let supplierService: SupplierService;
  let supplierResolver: SupplierResolver;
  let supplierRepository: SupplierRepository;
  let http;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
          KasabeTestFakeModule
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
    supplierResolver = app.get<SupplierResolver>(SupplierResolver);
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
      console.log('<<m.r.s>> cleanAllSamples error: ', error);
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

    // it('[2] supplierService should be defined', async (done) => {
      
    //   expect(supplierService).toBeDefined();
    //   expect(supplierService).toBeInstanceOf(SupplierServiceFake);

    //   done();

    // }, 20000);
     
    // it('[3] supplierRepository should be defined', async (done) => {
      
    //   expect(supplierRepository).toBeDefined();
    //   expect(supplierRepository).toBeInstanceOf(SupplierRepository);

    //   done();

    // }, 20000);
    
    // it('[4] supplierResolver should be defined', async (done) => {
      
    //   expect(supplierResolver).toBeDefined();
    //   expect(supplierResolver).toBeInstanceOf(SupplierResolverFake);

    //   done();

    // }, 20000);

  });
  
  //#endregion
  

  //#region d

  describe('[d] rebuild', () => {

    //#region  [6] ❌ Failed

  //   it('[6] should spu resolver successfully', async (done) => {  

      

  //     const sInput = SupplierSampleInputs[0];

  //     const uInput: UpdateSupplierInput = {
  //       supplier_id: 1,
  //       ...sInput,
  //     }

  //     const nSupplier = Supplier.of(sInput);

  //     const nPerson = Person.of({
  //       person_name: "saeid",
  //       person_role: PersonRole.CUSTOMER,
  //     });

  //     const supplier = { 
  //       supplier_id: 1,
  //       person_id: 1,
  //       person: {
  //         person_id: 1, 
  //         person_name: "p name",
  //         person_role: PersonRole.SUPPLIER,
  //         checkDataValidation: nPerson.checkDataValidation,
  //         hasId: nPerson.hasId,
  //         save: nPerson.save,
  //         remove: nPerson.remove,
  //         reload: nPerson.reload,
  //         of: () => nPerson,
  //       },
  //       supplier_name: "Gift Galery",
  //       contact_name: "Davood",
  //       contact_title: "Aqa",
  //       logo: "galery.jpg",
  //       note: "trusted",
  //       our_id: "supp01",
  //       url: "giftgallery.com",
  //       checkDataValidation: nSupplier.checkDataValidation,
  //       hasId: nSupplier.hasId,
  //       save: nSupplier.save,
  //       remove: nSupplier.remove,
  //       reload: nSupplier.reload,
  //       of: () => nSupplier,
  //     };

  //     // const supplier = Supplier.of(s);

  //     // 🕵️‍♀️
  //     const supplierResolver_rebuild_Spy = jest.spyOn(supplierResolver, 'rebuild')
  //     // .mockRejectedValue(supplier); // 🚩 not have supplier_id field
  //     .mockResolvedValue(supplier); // 🚩 not have supplier_id field
      
      
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

  //         console.log('<<c10>> e:', e);
  //         // console.log('<<c10>> e.message:', e.message);

  //         console.log('<<c10>> error:', error);
  //         console.log('<<c11>> error.message:', error.message);
  //         console.log('<<c12>> error.text:', error.text);
  //         console.log('<<c13>> error.status:', error.status);

  //         console.log('<<c14>> body:', body);

  //         console.log('<<c15>> body.errors:', body?.errors);
  //         console.log('<<c16>> JSON:body.errors:', JSON.stringify(body?.errors));
  //         console.log('<<c17>> body.data:', body?.data);
  //         console.log('<<c18>> body.data.rebuild:', body?.data?.rebuild);

  //         expect(supplierResolver_rebuild_Spy).toBeCalledTimes(1);
  //         expect(supplierResolver_rebuild_Spy).toBeCalledWith(uInput);

  //         // expect(e.message).toEqual('expected 200 "OK", got 400 "Bad Request"');
  //         expect(e).toBeNull();
          
  //         // expect(error.message).toEqual('cannot POST /graphql (400)');
  //         expect(error).toEqual(false);
          
  //         expect(body.errors).toBeInstanceOf(Array);
  //         expect(body.errors.length).toEqual(1);
  //         expect(body.errors[0].message).toContain('Unexpected error value');
      
  //         expect(body.data).toBeNull();
  //         done();
  
  //     });
  
  // }, 20000); 
  
  //#endregion

  
  });
  
  //#endregion
  
  
  //#region e

  describe('[e] fetchById', () => {

    // it('[1] should get a supplier', async (done) => {  

    //   //🚧 create new supplier 🚧
    //   const supplierInput: CreateSupplierInput = {
    //     supplier_title: "Emotion e1",
    //     supplier_description: "Good and Bad Feeling e1"
    //   }
    //   const gSupplier = await supplierRepository.build(supplierInput);

    //   //🚧 fetch supplier by gql 🚧
    //   const query = 
    //   `
    //   query {
    //     fetchById(supplier_id: ${gSupplier.supplier_id}){
    //         supplier_id
    //         supplier_title
    //         supplier_description
    //       }
    //     }
    //   `;

    //   request(app.getHttpServer())
    //   .post('/graphql')
    //   .send({
    //       operationName: null,
    //       query: query
    //   })
    //   .set('Accept', 'application/json')
    //   .expect(200)
    //   .end((err, res) => {

    //     // console.log('<<e111>> err:', err);

    //     if(err) return done(err);

    //     // console.log('<<e12>> res.body:', res.body);
      
    //     expect(res.body).toBeInstanceOf(Object);

    //     const supplier = res.body?.data?.fetchById;
        
    //     expect(supplier.supplier_title).toBe(supplierInput.supplier_title);
    //     expect(supplier.supplier_description).toBe(supplierInput.supplier_description);

    //     done();

    //   });

    // }, 20000);
  
    });
  
  //#endregion

});




