import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';

import { TestUtils } from '../../../test/test.utils';
import { DatabaseService } from '../../../database/database.service';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { TagRepository } from './tag.repository';
import { KasabeTestModule } from '../../kasabe_test.module';
import request from 'supertest';
import { BuildTagInput } from './dto/create_tag.input';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { response } from 'express';

jest.setTimeout(90000);

// modifing third item
const fixInput = input => JSON.stringify(input).replace(
  /\"([^(\")"]+)\":/g,
  '$1:',
);

describe('tag.e2e.spec.ts', () => {

  let app: INestApplication;
  let testUtils: TestUtils;

  let tagService: TagService;
  let tagResolver: TagResolver;
  let tagRepository: TagRepository;
  let http;
  

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ 
        KasabeTestModule
      ],
      providers: [
        DatabaseService,
        TestUtils,

        TagRepository, 
        TagService,
        
        ProductRepository, 
        ProductService,
      ]

    })
    .compile();

    app = module.createNestApplication();

    await app.init();

    await app.listen(3000);

    testUtils = module.get<TestUtils>(TestUtils);
    tagService = app.get<TagService>(TagService);
    // tagRepository = testUtils.databaseService.connection.getRepository(Tag); // return Repository
    tagRepository = testUtils.databaseService.connection.getCustomRepository(TagRepository);
    
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

    it('[1] tagService should be defined', async (done) => {
      
      expect(tagService).toBeDefined();
      expect(tagService).toBeInstanceOf(TagService);

      done();

    }, 20000);
    
    it('[2] testUtils should be defined', async (done) => {
      
      expect(testUtils).toBeDefined();

      done();

    }, 20000);
    
    it('[3] tagRepository should be defined', async (done) => {
      
      expect(tagRepository).toBeDefined();
      expect(tagRepository).toBeInstanceOf(TagRepository);

      done();

    }, 20000);

  });
  
  //#endregion
 
 
  //#region b

  describe('[b] test queries', () => {

    it('[1] tagTestQuery', async () => {  // ❌ done
      
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: `{ 
            tagTestQuery(message: "salam") {
              message
          }
        }`
      })
      .expect(({ body }) => {

        console.assert(body.data?.tagTestQuery, JSON.stringify(body));

        const message = body.data?.tagTestQuery?.message;

        expect(message).toBe("salam");

      })
      .expect(200);

    }, 20000);
    
    it('[2] tagTestMutation', async () => {  // ❌ done
      
      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: `mutation { 
            tagTestMutation (message: "salam") {
              message
            }
        }`
      })
      .expect(({ body }) => {

        console.assert(body.data?.tagTestMutation, JSON.stringify(body));

        const message = body.data?.tagTestMutation?.message;

        expect(message).toBe("salam");

      })
      .expect(200);

    }, 20000);

  });
  
  //#endregion
  
  //#region c

  describe('[c] build', () => {

    it('[1] should create new tag', async () => {  // ❌ done
      
      // db must be clean
      expect(await tagRepository.find()).toEqual([]);


      const tagInput: BuildTagInput = {
        tag_title: "Emotion",
      }

      const build = 
      `
        mutation {
          build(tag: ${fixInput(tagInput)}){
            tag_id
            tag_title
          }
        }
      `;

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: build
      })
      .expect(async ({ body }) => {

        console.assert(body.data?.build, JSON.stringify(body));

        const tag = body.data?.build;
        expect(tag).toBeDefined();

        expect(tag.tag_title).toBe(tagInput.tag_title);

        // db should contain one tag
        expect( (await tagRepository.find()).length ).toEqual(1);
      })
      .expect(200);

    }, 20000);
  
  });
  
  //#endregion
  
  //#region d

  describe('[d] rebuild', () => {

    it('[1] should update tag', async () => {  

      // create new tag
      const tagInput: BuildTagInput = {
        tag_title: "Emotion",
      }

      await tagRepository.build(tagInput);

      const qInput: UpdateTagInput = {
        tag_id: 1,
        tag_title: "update Emotion",
      }

      const query = 
      `
        mutation {
          rebuild(tag: ${fixInput(qInput)}){
            tag_id
            tag_title
          }
        }
      `;

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: query
      })
      .expect(async ({ body }) => {

        console.assert(body.data?.rebuild, JSON.stringify(body));

        const tag = body.data?.rebuild;
        expect(tag).toBeDefined();
        
        expect(tag.tag_title).toBe(qInput.tag_title);
      })
      .expect(200);

    }, 20000);
  
  });
  
  //#endregion
  
  
  //#region e

  describe('[e] fetchById', () => {

    it('[1] should get a tag', async (done) => {  

      //🚧 create new tag 🚧
      const tagInput: BuildTagInput = {
        tag_title: "Emotion e1",
      }
      const gTag = await tagRepository.build(tagInput);

      //🚧 fetch tag by gql 🚧
      const query = 
      `
      query {
        fetchById(tag_id: ${gTag.tag_id}){
            tag_id
            tag_title
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

        // console.log('<<e111>> err:', err);

        if(err) return done(err);

        // console.log('<<e12>> res.body:', res.body);
      
        expect(res.body).toBeInstanceOf(Object);

        const tag = res.body?.data?.fetchById;
        
        expect(tag.tag_title).toBe(tagInput.tag_title);

        done();

      });

    }, 20000);
  });
  
  //#endregion

});




