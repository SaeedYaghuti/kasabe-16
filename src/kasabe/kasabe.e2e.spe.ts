import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import request from 'supertest';
import { KasabeModule } from './kasabe.module';
import { DatabaseModule } from '../database/database.module';
import { KasabeService } from './kasabe.service';
import { KasabeResolver } from './kasabe.resolver';

describe('kasabe.e2e.spec.ts', () => {

  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // here we don't need entity and repository so we didn't import DatabaseModule
          GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
          }),
      ],
      providers: [
        KasabeService,
        KasabeResolver,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const modifyInput = (input) => JSON.stringify(input).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('[1] kasabeTestQuery', () => {
      const kasabeTestQuery = 
      `
        query {
          kasabeTestQuery(message: "Hello Query"){
            message
          }
        }
      `;

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: kasabeTestQuery
      })
      .expect(({ body }) => {

        console.log('<<[1]>> body:', body);
        
        const message = body.data?.kasabeTestQuery.message;

        // expect(data.message).toBe("Hello Query");
        expect(body.data).toBeDefined();
        expect(message).toBe("HardCoded Hello");
      })
      .expect(200);
  })
  
  it('[2] kasabeTestMutation', () => {
      const kasabeTestMutation = 
      `
        mutation {
            kasabeTestMutation(message: "Hello Mutation"){
              message
            }
        }
      `;

      return request(app.getHttpServer())
      .post('/graphql')
      .send({
          operationName: null,
          query: kasabeTestMutation
      })
      .expect(({ body }) => {

        console.log('<<[2]>> body:', body);
        
        const message = body.data?.kasabeTestMutation?.message;

        // expect(data.message).toBe("Hello Query");
        expect(body.data).toBeDefined();
        expect(message).toBe("Hello Mutation");
      })
      .expect(200);
  })

  it('[3] hello', () => {

    return request(app.getHttpServer())
    .post('/graphql')
    .send({
        operationName: null,
        query: '{ hello }'
    })
    .expect(({ body }) => {

      console.log('[3] body:', body);

      const hello = body.data.hello;

      expect(hello).toBe('hello');
    })
    .expect(200);

  });

});
