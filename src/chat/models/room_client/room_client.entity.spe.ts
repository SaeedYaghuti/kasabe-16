import { Connection, QueryFailedError, AdvancedConsoleLogger, DeleteResult } from 'typeorm';

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { RoomClient } from './room_client.entity';
import { RoomClientCreateDto } from './dto/room_client_create.dto';
import { SampleRoomClientDtos } from '../../../test/fixtures/chat/sample_room_client.dto';
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';
import { SampleRoomDtos } from '../../../test/fixtures/chat/sample_room.dto';
import { BadRequestException } from "@nestjs/common";
import { ClientRole } from "../client/client_role.enum";
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { RoomCreateDto } from '../room/dto/room_create.dto';
import { ClientCreateInput } from '../client/dto/client_create.input';

jest.setTimeout(90000);

describe("room_client.entity.spec.ts", () => { 
  let clientRepository;
  let roomRepository;
  let roomClientRepository;
  let testUtils: TestUtils;

  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);

    // Client
    // await testUtils.cleanTable("client", "client");
    clientRepository = testUtils.databaseService.connection.getRepository(Client);

    // Room
    // await testUtils.cleanTable("room", "room");
    roomRepository = testUtils.databaseService.connection.getRepository(Room);

    // Room_Client
    // await testUtils.cleanTable("room_client", "room_client");
    roomClientRepository = testUtils.databaseService.connection.getRepository(RoomClient);

    done();
  })

  beforeEach(async done => {
    try {
      // await testUtils.reloadAllSamples();
      await testUtils.cleanAllSamples();
      // await testUtils.reloadAllSamples();
    } catch (error) {
      console.log('<<rc.e.s>> cleanAllSamples error: ', error);
    }

    done();
  });
  
  afterAll(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] variables", () => {
    it("[1] clientRepository", async done => {  

      expect(clientRepository).toBeDefined();
      const nClient = new Client();
      expect(nClient).toBeDefined();

      done();
    }, 20000);

    it("[2]  roomRepository", async done => {  
      
      expect(roomRepository).toBeDefined();
      const nRoom = new Room();
      expect(nRoom).toBeDefined();

      done();
    }, 20000);

    it("[3] roomClientRepository", async done => {  
      
      expect(roomClientRepository).toBeDefined();
      const nRoomClient = new RoomClient();
      expect(nRoomClient).toBeDefined();

      done();
    }, 20000);
   
  });

  describe("[b] create", () => {

    it("[1] should insert CASCADE", async done => {
      // sample Client
      const sClient: ClientCreateInput = SampleClientDtos[0];
      const nClient = Client.of(sClient);

      // Sample Room
      const roomSampleDto: RoomCreateDto = SampleRoomDtos[0] ;
      const nRoom = Room.of(roomSampleDto);

      // create sample room_client
      const nRoomClient = new RoomClient();
      nRoomClient.room = nRoom;
      nRoomClient.client = nClient;
      nRoomClient.client_role = ClientRole.ADMIN;

      const gRoomClient = await roomClientRepository.save(nRoomClient);

      expect(gRoomClient).toBeDefined();
      expect(gRoomClient.client).toBeDefined();
      expect(gRoomClient.room).toBeDefined();

      expect(gRoomClient.room_client_id).toEqual(1);
      expect(gRoomClient.room.room_id).toEqual(1);
      expect(gRoomClient.client.client_id).toEqual(1);

      expect(gRoomClient.client_role).toEqual(ClientRole.ADMIN);
      expect(gRoomClient.client.client_fname).toEqual("saeid");
      expect(gRoomClient.room.title).toEqual("All Hassan");

      done();
    }, 2000000);
    
    it("[2] should create a sample roomClient seperately", async done => {
      const checkEmptiness = await Client.find();
      expect(checkEmptiness).toEqual([]);

      // create Client
      let gClients: Client[] = [];
      for (const sClientDto of SampleClientDtos) {
        const nClient = Client.of(sClientDto);

        try {
          const gClient = await clientRepository.save(nClient);
          gClients.push(gClient);
        } catch (error) {
          console.error("<<b|1|client>> error: ", error);
          expect(error).toBeUndefined();
        }
      }
      expect(gClients.length).toEqual(SampleClientDtos.length);

      // create Room
      const gRooms: Room[] = [];
      for (const sRoomDto of SampleRoomDtos) {
        const nRoom = Room.of(sRoomDto);

        try {
          const gRoom = await roomRepository.save(nRoom);
          gRooms.push(gRoom);
        } catch (error) {
          console.error("<<b|1|room>> error: ", error);
          expect(error).toBeUndefined();
        }

      }
      expect(gRooms.length).toEqual(SampleRoomDtos.length);

      // create sample room_client
      let nRoomClients: RoomClient[] = [];
      for (const sRoomClientDto of SampleRoomClientDtos) {

        const nRC = RoomClient.of(sRoomClientDto);
        nRoomClients.push(nRC);
      }

      console.assert(nRoomClients.length === 6, '<<b|1|nrc>> nRoomClients: ', nRoomClients);
      expect(nRoomClients.length).toEqual(6);

      const gRoomClients: RoomClient[] = [];
      for (const nRC of nRoomClients) {

        try {
          const gRC = await roomClientRepository.save(nRC);
          gRoomClients.push(gRC);
        } catch (error) {
          console.error("<<b|1|room-client>> error: ", error);
          expect(error).toBeUndefined();
        }

      }

      // count of roomClient in roomClientSampleDtos
      let roomClientCount = 0;
      SampleRoomClientDtos.forEach(dto => roomClientCount++);

      console.assert(gRoomClients.length === roomClientCount ,"<<b|1|grc>> gRoomClients: ", gRoomClients);
      expect(gRoomClients.length).toEqual(roomClientCount);

      done();
    }, 200000);
    
    it("[3] client_role is empty hence should throw error ", async done => {
      const nRoomClient = new RoomClient();
      nRoomClient.room_id = 1;
      nRoomClient.client_id = 1;
      // nRoomClient.client_role = ClientRole.ADMIN;

      let gRoomClient;
      let error;
      try {

        gRoomClient = await roomClientRepository.save(nRoomClient);
      } catch (err) {
        // console.log('<<b|3>> err: ', err);
        error = err;
      }
      expect(gRoomClient).toBeUndefined();
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('Validation failed!');
      
      done();
    }, 200000);

    it("[4] room and client are not defind hence should throw error", async done => {
      // create sample room_client
      const nRoomClient = new RoomClient();
      nRoomClient.room_id = 1;
      nRoomClient.client_id = 1;
      nRoomClient.client_role = ClientRole.ADMIN;

      let gRoomClient;
      let error;
      try {

        gRoomClient = await roomClientRepository.save(nRoomClient);
      } catch (err) {
        // console.log('<<b|3>> err: ', err);
        error = err;
      }
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(QueryFailedError);
      expect(error.message).toContain('insert or update on table "room_client" violates foreign key constraint');
      expect(gRoomClient).toBeUndefined();

      done();
    }, 2000000);

    it("[5] UQ_CLIENT_ROOM hence should throw error", async done => {
      
      await testUtils.reloadAllSamples();

      // we should have first one
      // const fRoomClient = await roomClientRepository.find(1);
      const fRoomClient = await roomClientRepository.findOne({ room_client_id: 1});
      console.assert( fRoomClient ,'<<b5>> fRoomClient: ', fRoomClient);
      // console.log( '<<b5>> fRoomClient: ', fRoomClient);
      expect(fRoomClient).toBeDefined();
      expect(fRoomClient.room_id).toEqual(1);
      expect(fRoomClient.client_id).toEqual(1);
      expect(fRoomClient.client_role).toEqual(ClientRole.ADMIN);

      // make duplicate RoomClient

      const nRoomClient = new RoomClient();
      nRoomClient.room_id = 1;
      nRoomClient.client_id = 1;
      nRoomClient.client_role = ClientRole.ADMIN;

      let gRoomClient;
      let error;
      try {

        gRoomClient = await roomClientRepository.save(nRoomClient);
      } catch (err) {
        // console.log('<<b|3>> err: ', err);
        error = err;
      }
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(QueryFailedError);
      expect(error.message).toContain('duplicate key value violates unique constraint \"UQ_CLIENT_ROOM\"');
      expect(gRoomClient).toBeUndefined();

      done();

    }, 200000);
    
  });
  
  describe("[c] update", () => {
    
    it("[1] should update a room_client", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient;
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
      } catch (error) {
        console.error("<<b|5>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      expect(fRoomClient.client_role).toEqual(ClientRole.ADMIN );

      // update
      fRoomClient.client_role = ClientRole.EDITOR;
      let uRoomClient: RoomClient;
      let errURoomClient;
      try {
        uRoomClient = await roomClientRepository.save(fRoomClient);
      } catch (error) {
        console.error("<<b|5>> error: ", error);
        errURoomClient = error;
      }
      
      expect(errURoomClient).toBeUndefined();
      expect(uRoomClient).toBeDefined();
      expect(uRoomClient.client_role).toEqual(ClientRole.EDITOR);

      done();
    }, 2000000);
    
  });
  
  describe("[d] read", () => {
    
    it("[1] find(): return []", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient[];
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.find();
        // console.log("<<d1>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<d1>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.length).toEqual(6);

      done();
    }, 2000000);
    
    it("[2] find(1): return [];❌ 1 has no effect ", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient[];
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.find(1);
        // console.log("<<d2>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<d2>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.length).toEqual(6);

      done();
    }, 2000000);
    
    it("[3] find({ room_client_id: 1}): return [ {} ];", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient[];
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.find({ room_client_id: 1});
        // console.log("<<d3>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<d3>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.length).toEqual(1);
      expect(fRoomClient[0].room_client_id).toEqual(1);

      done();
    }, 2000000);
    
    it("[4] findOne({ room_client_id: 1}): return {} ;", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient;
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.findOne({ room_client_id: 1});
        // console.log("<<d4>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<d4>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      // expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.room_client_id).toEqual(1);

      done();
    }, 2000000);
    
    it("[5] findOne(): return {} ;", async done => {

      await testUtils.reloadAllSamples();

      // ##### RoomClient

      let fRoomClient: RoomClient;
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.findOne();
        // console.log("<<d5>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<d5>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      // expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.room_client_id).toEqual(1);

      done();
    }, 2000000);
    
  });
  
  describe("[e] delete", () => {
    
    it("[1] delete()", async done => {

      await testUtils.reloadAllSamples();

      // find
      let fRoomClient: RoomClient;
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.findOne({ room_client_id: 1});
        // console.log("<<d4>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<e1>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      // expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.room_client_id).toEqual(1);


      // delete
      let deleteRes: DeleteResult;
      let errDeleteRoomClient;
      try {
        deleteRes = await roomClientRepository.delete(fRoomClient);
        // console.log("<<e1>> deleteRes: ", deleteRes);
      } catch (error) {
        console.error("<<e1>> error: ", error);
        errDeleteRoomClient = error;
      }
      
      expect(errDeleteRoomClient).toBeUndefined();
      expect(deleteRes).toBeDefined();
      // expect(deleteRes).toBeInstanceOf(Array);
      expect(deleteRes.affected).toEqual(1);

      //[3] checking delete
      let fRoomClient3: RoomClient;
      let err3;
      try {
        fRoomClient3 = await roomClientRepository.findOne({ room_client_id: 1});
        // console.log("<<e1>> fRoomClient3: ", fRoomClient3);
      } catch (error) {
        console.error("<<e1>> error: ", error);
        err3 = error;
      }
      
      expect(err3).toBeUndefined();
      expect(fRoomClient3).toBeUndefined();
      // expect(fRoomClient3).toBeInstanceOf(Array);
      // expect(fRoomClient3.room_client_id).toEqual(1);
      done();
    }, 2000000);
    
    it("[2] remove(): return RoomClient", async done => {

      await testUtils.reloadAllSamples();

      // find
      let fRoomClient: RoomClient;
      let errRoomClient;
      try {
        fRoomClient = await roomClientRepository.findOne({ room_client_id: 1});
        // console.log("<<e2>> fRoomClient: ", fRoomClient);
      } catch (error) {
        console.error("<<e2>> error: ", error);
        errRoomClient = error;
      }
      
      expect(errRoomClient).toBeUndefined();
      expect(fRoomClient).toBeDefined();
      // expect(fRoomClient).toBeInstanceOf(Array);
      expect(fRoomClient.room_client_id).toEqual(1);


      // delete
      let removeRes: RoomClient;
      let errDeleteRoomClient;
      try {
        removeRes = await roomClientRepository.remove(fRoomClient);
        // console.log("<<e2>> removeRes: ", removeRes);
      } catch (error) {
        console.error("<<e2>> error: ", error);
        errDeleteRoomClient = error;
      }
      
      expect(errDeleteRoomClient).toBeUndefined();
      expect(removeRes).toBeDefined();
      expect(removeRes).toBeInstanceOf(RoomClient);
      expect(removeRes.room_client_id).toEqual(undefined);
      expect(removeRes.room_id).toEqual(1);
      expect(removeRes.client_id).toEqual(1);

      //[3] checking delete
      let fRoomClient3: RoomClient;
      let err3;
      try {
        fRoomClient3 = await roomClientRepository.findOne({ room_client_id: 1});
        // console.log("<<e2>> fRoomClient3: ", fRoomClient3);
      } catch (error) {
        console.error("<<e2>> error: ", error);
        err3 = error;
      }
      
      expect(err3).toBeUndefined();
      expect(fRoomClient3).toBeUndefined();
      // expect(fRoomClient3).toBeInstanceOf(Array);
      // expect(fRoomClient3.room_client_id).toEqual(1);
      done();
    }, 2000000);
    
  });


});