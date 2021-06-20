import { Connection, Repository } from 'typeorm';
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { EntitiesSeed } from '../../../test/fixtures/_entities';
import { RoomRepository } from '../room/room.repository';
import { BadRequestException } from "@nestjs/common";
import { ClientUpdateDto } from "./dto/client_update.dto";
import { ClientService } from './client.service';
import { TestingModule } from '../../../test/testing.module';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { RoomClientRepository } from '../room/room_client.repository';
import { MessageRepository } from '../message/message.repository';
import { SampleClientDtos } from '../../../test/fixtures/sample_client';

jest.setTimeout(90000);

class ClientServiceFake {
    public async create(): Promise<void> {}
    public async clientGetById(): Promise<void> {}
    public async findAll(): Promise<void> {}
    public async update(): Promise<void> {}
} 

const clientServiceFake = new ClientServiceFake();

describe("client.service.spec.ts", () => {
  let testUtils: TestUtils;
  let clientService: ClientService;
  let clientRepository: ClientRepository;

  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        DatabaseService, 
        TestUtils, 
        ClientRepository, 
        RoomRepository,
        RoomClientRepository,
        MessageRepository,
        ClientService,
      ]
    }).compile();
    
    // const module = await Test.createTestingModule({
    //   imports: [DatabaseModule],
    //   providers: [
    //     ClientService,
    //     {
    //         provide: getRepositoryToken(Client),
    //         useClass: ClientRepository,
    //     },
    //     DatabaseService, 
    //     TestUtils, 
    //   ]
    // }).compile();

    testUtils = module.get<TestUtils>(TestUtils);
    clientService = module.get<ClientService>(ClientService);
    // clientRepository = testUtils.databaseService.connection.getRepository(Client);
    // clientRepository = testUtils.databaseService.connection.getCustomRepository(ClientRepository);
    clientRepository = module.getCustomRepository(ClientRepository);

    done();
  });

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
  
  afterAll(async done => {
    await testUtils.cleanAllSamples();
    await testUtils.closeDbConnection();
    done();
  });
  
  
  describe("[a] variables", () => {
      //#region  passed
      it("[1] testUtils should be defined", async done => {
      expect(testUtils).toBeDefined();

      done();

      }, 20000);

      it("[2] clientService should be defined", async done => {
      expect(clientService).toBeDefined();
      expect(clientService).toBeInstanceOf(ClientService);
      expect(clientRepository).toBeDefined();

      done();
      }, 20000);
      
      it("[3] clientRepository should be defined", async done => {
      expect(clientRepository).toBeDefined();
      expect(clientRepository).toBeInstanceOf(ClientRepository);

      done();
      }, 20000);
  });
    
    describe("[b] create", () => {
        it("[1] clientCreate() should create new Client", async done => {

            // const clientDto = EntitiesSeed[0].items[0];
            const clientDto = SampleClientDtos[0];

            const fClient = await clientService.clientCreate(clientDto);
            
            expect(fClient).toBeDefined();
            // expect(fClient.client_id).toEqual(1);
            expect(fClient.client_fname).toEqual('saeid');
            done();
        }, 20000);

    // //#endregion

    //     it("[2] client_fname is empty hence should throw error", async done => { 
    //     const clientDto = {
    //         client_fname: "",
    //         client_lname: "yaghouti",
    //         password: "12345678",
    //         phone: "09194846922",
    //         client_mname: "poker face",
    //         email: "saeid@yahouti.com",
    //     };
    //     let gClient;
    //     try {
    //         gClient = await clientRepository.clientCreate(clientDto)
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual('Validation failed!');
    //     }
    //     expect(gClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
    //     it("[3] client_lname is empty hence should throw error", async done => { 
    //     const clientDto = {
    //         client_fname: "saeid",
    //         client_lname: "",
    //         password: "12345678",
    //         phone: "09194846922",
    //         client_mname: "poker face",
    //         email: "saeid@yahouti.com",
    //     };

    //     let gClient;
    //     try {
    //         gClient = await clientRepository.clientCreate(clientDto)
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual('Validation failed!');
    //     }
    //     expect(gClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
        
    //     it("[4] email is empty hence should throw error", async done => { 
    //     const clientDto = {
    //         client_fname: "saeid",
    //         client_lname: "yahouti",
    //         password: "12345678",
    //         phone: "09194846922",
    //         client_mname: "poker face",
    //         email: "",
    //     };

    //     let gClient;
    //     try {
    //         gClient = await clientRepository.clientCreate(clientDto)
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual('Validation failed!');
    //     }
    //     expect(gClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
    //     it("[5] email is invalid hence should throw error", async done => { 
    //     const clientDto = {
    //         client_fname: "saeid",
    //         client_lname: "yahouti",
    //         password: "12345678",
    //         phone: "09194846922",
    //         client_mname: "poker face",
    //         email: "saeid@gmailcom",
    //     };

    //     let gClient;
    //     try {
    //         gClient = await clientRepository.clientCreate(clientDto)
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual('Validation failed!');
    //     }
    //     expect(gClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
    //     it("[6] 🎯 TODO phone should validate", async done => { 
    //     const clientDto = {
    //         client_fname: "saeid",
    //         client_lname: "yahouti",
    //         password: "12345678",
    //         phone: "",
    //         client_mname: "poker face",
    //         email: "saeid@yaghouti.com",
    //     };

    //     done();
    //     }, 20000);
        
    });

    // describe("[c] clientGetById()", () => {

    //     it("[1] CR.clientGetById(1) should return data", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('2|cgbi error: ', error);
    //         expect(error).toBeUndefined();
    //     }
        

    //     const fClient = await clientRepository.clientGetById(1);
    //     expect(fClient).toBeDefined();
    //     expect(fClient.client_fname).toEqual('saeid');
    //     done();
    //     }, 20000);

    //     it("[2] CR.clientGetById(10) should return undefined", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('3|cgbi error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const fClient = await clientRepository.clientGetById(10);
    //     expect(fClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
    // });
  
    // describe("[d] clientUpdate()", () => {

    //     it("[1] should update", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('1|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const toUpdateClient: ClientUpdateDto = {
    //         client_id: 1,
    //         client_fname: "updated saeid",
    //     };
        
    //     let uClient;
    //     try {
    //         uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     } catch (error) {
    //         console.log('1|su Error: ', error);
    //         expect(error).toBeUndefined();
    //     }
        
    //     expect(uClient).toBeDefined();
    //     expect(uClient.client_fname).toEqual('updated saeid');
    //     done();
    //     }, 20000);
        
    //     it("[2] client_id is invalid hence should throw error", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('2|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const toUpdateClient: ClientUpdateDto = {
    //         client_id: 10,
    //         client_fname: "update saeid",
    //     };
        
    //     let uClient;
    //     try {
    //         uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         // 🎯  TODO: import EntityNotFoundError
    //         expect(error).toBeInstanceOf(EntityNotFoundError);
    //         expect(error.message).toEqual(`Could not find any entity of type "Client" matching: ${toUpdateClient.client_id}`);
    //     }
        
    //     expect(uClient).toBeUndefined();

    //     done();
    //     }, 20000);
        
    //     it("[3] client_fname is invalid hence should throw error", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('3|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const toUpdateClient: ClientUpdateDto = {
    //         client_id: 1,
    //         client_fname: "",
    //     };
        
    //     let uClient;
    //     try {
    //         uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual(`Validation failed!`);
    //     }
        
    //     expect(uClient).toBeUndefined();
    //     done();
    //     }, 20000);
        
    //     it("[4] client_mname is invalid hence should throw error", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('3|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const toUpdateClient: ClientUpdateDto = {
    //         client_id: 1,
    //         client_mname: "",
    //     };
        
    //     let uClient;
    //     try {
    //         uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual(`Validation failed!`);
    //     }
        
    //     expect(uClient).toBeUndefined();
    //     done();
    //     }, 20000);
        
    //     it("[5] 🎯 phone is invalid hence should throw error", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('3|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     // const toUpdateClient: ClientUpdateDto = {
    //     //   client_id: 1,
    //     //   client_mname: "",
    //     // };
        
    //     // let uClient;
    //     // try {
    //     //   uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     // } catch (error) {
    //     //   expect(error).toBeDefined();
    //     //   expect(error).toBeInstanceOf(BadRequestException);
    //     //   expect(error.message).toEqual(`Validation failed!`);
    //     // }
        
    //     // expect(uClient).toBeUndefined();
    //     done();
    //     }, 20000);

    //     it("[6] email is invalid hence should throw error", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('3|cu error: ', error);
    //         expect(error).toBeUndefined();
    //     }

    //     const toUpdateClient: ClientUpdateDto = {
    //         client_id: 1,
    //         email: "saeid@gmailcom",
    //     };
        
    //     let uClient;
    //     try {
    //         uClient = await clientRepository.clientUpdate(toUpdateClient);
    //     } catch (error) {
    //         expect(error).toBeDefined();
    //         expect(error).toBeInstanceOf(BadRequestException);
    //         expect(error.message).toEqual(`Validation failed!`);
    //     }
        
    //     expect(uClient).toBeUndefined();
    //     done();
    //     }, 20000);
        
    // });

    // describe("[e] clientGetByRoomId()", () => {

    //     it("[1] CR.clientsGetByRoomId(1) should return []", async done => {

    //     try {
    //         // await testUtils.reloadAllSamples();
    //         await testUtils.cleanAndLoadAllSamples();
    //     } catch (error) {
    //         console.log('2|cgbi error: ', error.message);
    //         expect(error).toBeUndefined();
    //     }
        
    //     const fClients = await clientRepository.clientsGetByRoomId(1);
    //     expect(fClients).toBeDefined();
    //     expect(fClients.length).toEqual(3);
    //     expect(fClients[0].client_fname).toEqual("saeid");
    //     expect(fClients[1].client_fname).toEqual("hamid");
    //     expect(fClients[2].client_fname).toEqual("asity");

        
    //     done();
    //     }, 20000);
        
    //     it("[2] CR.clientsGetByRoomId(1) should return []", async done => {
        
    //     const fClients = await clientRepository.clientsGetByRoomId(1);
    //     expect(fClients).toEqual([]);
        
    //     done();
    //     }, 20000);
        
    // });



});
