import { Connection, QueryFailedError } from "typeorm";

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { Client } from "./client.entity";
import { BadRequestException } from "@nestjs/common";
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { ClientCreateInput } from './dto/client_create.input';

jest.setTimeout(90000);

describe("client.entity.spec.ts", () => {
  let clientRepository;
  let testUtils: TestUtils;

  // beforeEach(async done => {
  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);
    
    // clientRepository = testUtils.databaseService.connection.getCustomRepository(ClientRepository);
    clientRepository = testUtils.databaseService.connection.getRepository(Client);

    done();
  });

  // afterEach(async done => {
  beforeEach(async done => {
    try {
      // await testUtils.reloadAllSamples();
      await testUtils.cleanAllSamples();
      // await testUtils.reloadAllSamples();
    } catch (error) {
      console.log('<<c.s.s>> cleanAllSamples error: ', error);
    }

    done();
  });

  // afterEach(async done => {
  afterAll(async done => {
    await testUtils.cleanAllSamples();
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] Create", () => {
    it("[1] variables", async done => {  
      expect(clientRepository).toBeDefined();
      const nClient = new Client();
      expect(nClient).toBeDefined();
      done();
    }, 20000);

    it("[2] should throw error bcs sample data is not complete", async done => {

      const sClient: ClientCreateInput = SampleClientDtos[0];
      const nClient = new Client();
      Object.assign(nClient, sClient);

      try {
        const cClient = await clientRepository.save(nClient);
      } catch (error) {
        expect(error).toBeDefined();
        // expect(error).toBeInstanceOf(QueryFailedError);
        expect(error).toBeInstanceOf(BadRequestException);
      }

      done();
    }, 20000);
    
    it("[3] should create a sample client", async done => { 
        const sClient: ClientCreateInput = SampleClientDtos[0];
        const nClient = await Client.of(sClient);
        
        let cClient;
        try {
          cClient = await clientRepository.save(nClient);
        } catch (error) {
          expect(error).toBeUndefined();
        }
        
        expect(cClient).toBeDefined();
        expect(cClient.client_fname).toEqual("saeid");

        done();
    }, 20000);
    
    it("[4] should create 4 sample client", async done => { 
      const cClients: Client[] = [];
      for (const sClientDto of SampleClientDtos) {
        
        let nClient;
        try {
          nClient = await Client.of(sClientDto);
        } catch (error) {
          expect(error).toBeUndefined();
        }
        expect(nClient).toBeDefined();

        let cClient;
        try {
          cClient = await clientRepository.save(nClient);
        } catch (error) {
          expect(error).toBeUndefined();
        }

        cClients.push(cClient);
      }
      
      expect(cClients.length).toEqual(4);
      done();
    }, 20000);
    
    it("[5] client_fname is empty hence should throw error", async done => { 
      const clientDto = {
        client_fname: "",
        client_lname: "yaghouti",
        password: "12345678",
        phone: "09194846922",
        client_mname: "poker face",
        email: "saeid@yahouti.com",
      };
      let nClient;
      let gClient;
      try {
        nClient = Client.of(clientDto);
        gClient = await clientRepository.save(nClient);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Validation failed!');
      }
      expect(nClient).toBeDefined();
      expect(gClient).toBeUndefined();

      done();
    }, 20000);
    
    it("[6] client_lname is empty hence should throw error", async done => { 
      const clientDto = {
        client_fname: "saeid",
        client_lname: "",
        password: "12345678",
        phone: "09194846922",
        client_mname: "poker face",
        email: "saeid@yahouti.com",
      };
      let nClient;
      let gClient;
      try {
        nClient = Client.of(clientDto);
        gClient = await clientRepository.save(nClient);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Validation failed!');
      }
      expect(nClient).toBeDefined();
      expect(gClient).toBeUndefined();

      done();
    }, 20000);
    
    it("[7] email is empty hence should throw error", async done => { 
      const clientDto = {
        client_fname: "saeid",
        client_lname: "yahouti",
        password: "12345678",
        phone: "09194846922",
        client_mname: "poker face",
        email: "",
      };
      let nClient;
      let gClient;
      try {
        nClient = Client.of(clientDto);
        gClient = await clientRepository.save(nClient);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('Validation failed!');
      }
      expect(nClient).toBeDefined();
      expect(gClient).toBeUndefined();

      done();
    }, 20000);
    
    it("[8] 🎯 TODO phone should validate", async done => { 
      const clientDto = {
        client_fname: "saeid",
        client_lname: "yahouti",
        password: "12345678",
        phone: "",
        client_mname: "poker face",
        email: "saeid@yaghouti.com",
      };
      // let nClient;
      // try {
      //   nClient = await Client.of(clientDto);
      // } catch (error) {
      //   expect(error).toBeDefined();
      //   expect(error).toBeInstanceOf(BadRequestException);
      //   expect(error.message).toEqual('Validation failed!');
      // }
      // expect(nClient).toBeUndefined();

      done();
    }, 20000);

  })
})
