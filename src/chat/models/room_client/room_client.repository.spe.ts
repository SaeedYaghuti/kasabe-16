import { Connection, QueryFailedError, AdvancedConsoleLogger, DeleteResult, Repository } from 'typeorm';

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { RoomClient } from './room_client.entity';
import { RoomClientCreateDto, RoomClientCascadeDto } from './dto/room_client_create.dto';
import { SampleRoomClientDtos } from '../../../test/fixtures/chat/sample_room_client.dto';
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';
import { SampleRoomDtos } from '../../../test/fixtures/chat/sample_room.dto';
import { BadRequestException } from "@nestjs/common";
import { ClientRole } from "../client/client_role.enum";
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { RoomCreateDto } from '../room/dto/room_create.dto';
import { RoomClientRepository } from './room_client.repository';
import { MessageRepository } from '../message/message.repository';
import { RoomRepository } from '../room/room.repository';
import { ClientRepository } from '../client/client.repository';
import { RoomClientUpdateDto } from './dto/room_client_update.dto';
import { Length } from 'class-validator';

jest.setTimeout(90000);

describe("room_client.entity.spec.ts", () => { 
  let clientRepository: Repository<Client>;
  let roomRepository: Repository<Room>;
  let roomClientRepository: RoomClientRepository;
  let testUtils: TestUtils;

  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        DatabaseService, 
        TestUtils, 
        // MessageRepository, 
        // RoomRepository,
        // RoomClientRepository,
        // ClientRepository,
      ]
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
    // roomClientRepository = testUtils.databaseService.connection.getRepository(RoomClient);
    roomClientRepository = testUtils.databaseService.connection.getCustomRepository(RoomClientRepository);

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
      expect(clientRepository).toBeInstanceOf(Repository);
      const nClient = new Client();
      expect(nClient).toBeDefined();

      done();
    }, 20000);

    it("[2] roomRepository", async done => {  
      
      expect(roomRepository).toBeDefined();
      expect(roomRepository).toBeInstanceOf(Repository);
      const nRoom = new Room();
      expect(nRoom).toBeDefined();

      done();
    }, 20000);

    it("[3] roomClientRepository", async done => {  
      
      expect(roomClientRepository).toBeDefined();
      expect(roomClientRepository).toBeInstanceOf(RoomClientRepository);
      const nRoomClient = new RoomClient();
      expect(nRoomClient).toBeDefined();

      done();
    }, 20000);
   
  });



  describe("[b] room_clientCreate()", () => {
    
    it("[1] create a room_client seperately", async done => {
      
      // create Client
      const nClient = Client.of(SampleClientDtos[0]);

      let gClient;
      try {

        gClient = await clientRepository.save(nClient);
        
      } catch (error) {
        console.error("<<b|1|client>> error: ", error);
        expect(error).toBeUndefined();
      }
      expect(gClient).toBeInstanceOf(Client);
 
       // create Room
      const nRoom = Room.of(SampleRoomDtos[0]);

      let gRoom;
      try {

        gRoom = await roomRepository.save(nRoom);

      } catch (error) {
        console.error("<<b|1|room>> error: ", error);
        expect(error).toBeUndefined();
      }
      expect(gRoom).toBeInstanceOf(Room);

      // create sample room_client
      const roomClientDto: RoomClientCreateDto = {
        room_id: gRoom.room_id,
        client_id: gClient.client_id,
        client_role: ClientRole.ADMIN,
      }

      let gRoomClient;
      let saveError;
      try {
        gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        saveError = error;
      }
      
      
      expect(saveError).toBeUndefined();

      expect(gRoomClient).toBeDefined();

      // expect(gRoomClient.client).toBeDefined();
      // expect(gRoomClient.room).toBeDefined();

      expect(gRoomClient.room_client_id).toEqual(1);
      expect(gRoomClient.room_id).toEqual(gRoom.room_id);
      expect(gRoomClient.client_id).toEqual(gClient.client_id);
      // expect(gRoomClient.room.room_id).toEqual(1);
      // expect(gRoomClient.client.client_id).toEqual(1);

      expect(gRoomClient.client_role).toEqual(ClientRole.ADMIN);
      // expect(gRoomClient.client.client_fname).toEqual("saeid");
      // expect(gRoomClient.room.title).toEqual("All Hassan");

      done();
    }, 2000000);

    it("[2] client_id is invalid hence should throw error", async done => {

      // const nClient = Client.of(SampleClientDtos[0]);
      // const gClient = this.clientRepository.save(nClient);
      
      const nRoom = Room.of(SampleRoomDtos[0]);

      let gRoom;
      let roomError;
      try {
        // gRoom = this.roomRepository.save(nRoom);
        gRoom = await nRoom.save();

      } catch (error) {
        // console.log('gRoom error:', error);
        roomError = error;
      }

      expect(roomError).toBeUndefined();
      expect(gRoom).toBeInstanceOf(Room);

      // const nRoom = Room.of(SampleRoomDtos[0]);

      // create sample room_client
      const roomClientDto: RoomClientCreateDto = {
        room_id: gRoom.room_id,
        client_id: 1,
        client_role: ClientRole.ADMIN,
      }
      
      let gRoomClient;
      let saveError;
      try {
        // gRoomClient = await roomClientRepository.room_clientCreate(nRoomClient);
        gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        // console.log('<<b2>> error: ', error);
        saveError = error;
      }
      
      
      expect(saveError).toBeDefined();
      expect(saveError).toBeInstanceOf(QueryFailedError);
      expect(saveError.message).toContain('insert or update on table \"room_client\" violates foreign key constraint');

      done();
    }, 2000000);
    
    it("[3] room_id is invalid hence hence should throw error", async done => {
      
      const nClient = Client.of(SampleClientDtos[0]);

      let gClient;
      let clientError;
      try {
        // gClient = this.clientRepository.save(nClient);
        gClient = await nClient.save();

      } catch (error) {
        console.log('gClient error:', error);
        clientError = error;
      }

      expect(clientError).toBeUndefined();
      expect(gClient).toBeInstanceOf(Client);


      // create sample room_client
      const roomClientDto: RoomClientCreateDto = {
        room_id: 1,
        client_id: gClient.client_id,
        client_role: ClientRole.ADMIN,
      }
      
      let gRoomClient;
      let saveError;
      try {
        // gRoomClient = await roomClientRepository.room_clientCreate(nRoomClient);
        gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        // console.log('<<b2>> error: ', error);
        saveError = error;
      }
      
      expect(saveError).toBeDefined();
      expect(saveError).toBeInstanceOf(QueryFailedError);
      expect(saveError.message).toContain('insert or update on table \"room_client\" violates foreign key constraint');

      done();
    }, 2000000);
    
  });


  
  describe("[c] roomClientCreateCascade()", () => {
    
    it("[1] create a room_client by entity", async done => {

      const nClient = Client.of(SampleClientDtos[0]);

      const nRoom = Room.of(SampleRoomDtos[0]);

      // create sample room_client
      const roomClientDto: RoomClientCascadeDto = {
        room: nRoom,
        client: nClient,
        client_role: ClientRole.ADMIN,
      }
      
      let gRoomClient;
      let saveError;
      try {
        // gRoomClient = await roomClientRepository.room_clientCreate(nRoomClient);
        gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        console.log('<<c1>> error: ', error);
        saveError = error;
      }
      
      
      expect(saveError).toBeUndefined();

      expect(gRoomClient).toBeDefined();

      expect(gRoomClient.client).toBeDefined();
      expect(gRoomClient.room).toBeDefined();

      expect(gRoomClient.room_client_id).toEqual(1);
      expect(gRoomClient.room_id).toEqual(1);
      expect(gRoomClient.client_id).toEqual(1);
      expect(gRoomClient.room.room_id).toEqual(1);
      expect(gRoomClient.client.client_id).toEqual(1);

      expect(gRoomClient.client_role).toEqual(ClientRole.ADMIN);
      expect(gRoomClient.client.client_fname).toEqual("saeid");
      expect(gRoomClient.room.title).toEqual("All Hassan");

      done();
    }, 2000000);
    
    it("[2] client_fname is Empty hence should throw error", async done => {

      const nClient = Client.of(SampleClientDtos[0]);
      delete nClient.client_fname;

      const nRoom = Room.of(SampleRoomDtos[0]);

      // create sample room_client
      const roomClientDto: RoomClientCascadeDto = {
        room: nRoom,
        client: nClient,
        client_role: ClientRole.ADMIN,
      }
      
      let gRoomClient;
      let saveError;
      try {
        // gRoomClient = await roomClientRepository.room_clientCreate(nRoomClient);
        gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        // console.log('<<c1>> error: ', error);
        saveError = error;
      }
      
      
      expect(saveError).toBeDefined();
      expect(saveError).toBeInstanceOf(BadRequestException);
      expect(saveError.message).toEqual('Validation failed!');

      done();
    }, 2000000);
    
    it("[3] title of room is Empty hence should throw error", async done => {

      const nClient = Client.of(SampleClientDtos[0]);

      const nRoom = Room.of(SampleRoomDtos[0]);
      delete nRoom.title;

      // create sample room_client
      const roomClientDto: RoomClientCascadeDto = {
        room: nRoom,
        client: nClient,
        client_role: ClientRole.ADMIN,
      }
      
      let gRoomClient;
      let saveError;
      try {
        // gRoomClient = await roomClientRepository.room_clientCreate(nRoomClient);
        gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
        // console.log('<<rc.r.s>> gRoomClient: ', gRoomClient);
      } catch (error) {
        // console.log('<<c1>> error: ', error);
        saveError = error;
      }
      
      
      expect(saveError).toBeDefined();
      expect(saveError).toBeInstanceOf(BadRequestException);
      expect(saveError.message).toEqual('Validation failed!');

      done();
    }, 2000000);
   
  });




  describe("[d] room_clientUpdate()", () => {
    
    it("[1] change role_type to READER ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }


      const updateDto: RoomClientUpdateDto = {
        room_client_id: 1,
        client_role: ClientRole.READER,
      }

      let uRoomClient;
      let uError;
      try {
        uRoomClient = await roomClientRepository.room_clientUpdate(updateDto);
        // console.log('<<rc.r.s>> uRoomClient: ', uRoomClient);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(uRoomClient).toBeDefined();

      // expect(uRoomClient.client).toBeDefined();
      // expect(uRoomClient.room).toBeDefined();

      expect(uRoomClient.room_client_id).toEqual(1);
      expect(uRoomClient.room_id).toEqual(1);
      expect(uRoomClient.client_id).toEqual(1);
      // expect(uRoomClient.room.room_id).toEqual(1);
      // expect(uRoomClient.client.client_id).toEqual(1);

      expect(uRoomClient.client_role).toEqual(ClientRole.READER);
      // expect(uRoomClient.client.client_fname).toEqual("saeid");
      // expect(uRoomClient.room.title).toEqual("All Hassan");

      done();
    }, 2000000);
    
    it("[2] client_id is invalid hence should throw error ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }


      const updateDto: RoomClientUpdateDto = {
        room_client_id: 10,
        client_role: ClientRole.READER,
      }

      let uRoomClient;
      let uError;
      try {
        uRoomClient = await roomClientRepository.room_clientUpdate(updateDto);
        // console.log('<<rc.r.s>> uRoomClient: ', uRoomClient);
      } catch (error) {
        // console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uRoomClient).toBeUndefined();

      expect(uError).toBeDefined();

      // expect(uRoomClient.client).toBeDefined();
      // expect(uRoomClient.room).toBeDefined();

      // expect(uRoomClient.room_client_id).toEqual(1);
      // expect(uRoomClient.room_id).toEqual(1);
      // expect(uRoomClient.client_id).toEqual(1);
      // expect(uRoomClient.room.room_id).toEqual(1);
      // expect(uRoomClient.client.client_id).toEqual(1);

      // expect(uRoomClient.client_role).toEqual(ClientRole.READER);
      // expect(uRoomClient.client.client_fname).toEqual("saeid");
      // expect(uRoomClient.room.title).toEqual("All Hassan");

      done();
    }, 2000000);
    
  });


  
  describe("[e] clientsGetByRoomId()", () => {
    
    it("[1] should return 1, 2, 3 ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let fClients: Client[];
      let uError;
      try {
        fClients = await roomClientRepository.clientsGetByRoomId(1);
        // console.log('<<rc.r.s>> fClients: ', fClients);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(3);
      expect(fClients[0].client_fname).toEqual("saeid");
      expect(fClients[1].client_fname).toEqual("hamid");
      expect(fClients[2].client_fname).toEqual("asity");

      done();
    }, 2000000);
    
    it("[2] invalid room_client id hence should return Empty [] ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let fClients: Client[];
      let uError;
      try {
        fClients = await roomClientRepository.clientsGetByRoomId(10);
        // console.log('<<rc.r.s>> fClients: ', fClients);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(0);

      done();
    }, 2000000);
    
  });



  
  describe("[f] room_clientsGetByClientId()", () => {
    
    it("[1] should return client_room 1, 2 ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let fClients: RoomClient[];
      let uError;
      try {
        fClients = await roomClientRepository.room_clientsGetByClientId(2);
        // console.log('<<rc.r.s>> fClients: ', fClients);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(2);
      expect(fClients[0].client_role).toEqual(ClientRole.ADMIN);
      expect(fClients[1].client_role).toEqual(ClientRole.READER);

      done();
    }, 2000000);
    
    it("[2] invalid client_id hence should return Empty [] ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let fClients: RoomClient[];
      let uError;
      try {
        fClients = await roomClientRepository.room_clientsGetByClientId(10);
        // console.log('<<rc.r.s>> fClients: ', fClients);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(0);
      // expect(fClients[0].client_role).toEqual(ClientRole.ADMIN);
      // expect(fClients[1].client_role).toEqual(ClientRole.READER);

      done();
    }, 2000000);
    
  });



  
  describe("[g] clientLeftRoom()", () => {
    
    it("[1] should left client_id 2 from room_id 1 ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let deleleteRes: DeleteResult;
      let dError;
      try {
        deleleteRes = await roomClientRepository.clientLeftRoom(2, 1);
        // console.log('<<rc.r.s>> deleleteRes: ', deleleteRes);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        dError = error;
      }
      
      expect(dError).toBeUndefined();
      expect(deleleteRes).toBeDefined();
      // expect(deleleteRes).toBeInstanceOf(Array);
      expect(deleleteRes.affected).toEqual(1);
      // expect(deleleteRes[0].client_role).toEqual(ClientRole.ADMIN);
      // expect(deleleteRes[1].client_role).toEqual(ClientRole.READER);


      // #### check db is changed?
      let fClients: RoomClient[];
      let uError;
      try {
        fClients = await roomClientRepository.room_clientsGetByClientId(2);
        // console.log('<<rc.r.s>> fClients: ', fClients);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        uError = error;
      }
      
      expect(uError).toBeUndefined();
      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(1);
      expect(fClients[0].client_id).toEqual(2);
      // expect(fClients[0].client_role).toEqual(ClientRole.ADMIN);
      // expect(fClients[1].client_role).toEqual(ClientRole.READER);

      done();
    }, 2000000);
    
    it("[2] client_id is invalide hence should throw error ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        // console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
      }

      let deleleteRes: DeleteResult;
      let dError;
      try {
        deleleteRes = await roomClientRepository.clientLeftRoom(10, 1);
        // console.log('<<rc.r.s>> deleleteRes: ', deleleteRes);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        dError = error;
      }
      
      expect(dError).toBeUndefined();
      expect(deleleteRes).toBeDefined();
      // expect(deleleteRes).toBeInstanceOf(Array);
      expect(deleleteRes.affected).toEqual(0);
      // expect(deleleteRes[0].client_role).toEqual(ClientRole.ADMIN);
      // expect(deleleteRes[1].client_role).toEqual(ClientRole.READER);

      done();
    }, 2000000);
    
  });
  
  describe("[h] room_clientGetById()", () => {
    
    it("[1] should return room_client by id ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s h1>> loadAllSamples error: ', error);
      }

      let fRC: RoomClient;
      let fError;
      try {
        fRC = await roomClientRepository.room_clientGetById(1);
        // console.log('<<rc.r.s>> deleleteRes: ', fRC);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        fError = error;
      }
      
      expect(fError).toBeUndefined();
      expect(fRC).toBeDefined();
      // expect(deleleteRes).toBeInstanceOf(Array);
      // expect(fRC).toEqual(1);
      expect(fRC.client_role).toEqual(ClientRole.ADMIN);
      // expect(deleleteRes[1].client_role).toEqual(ClientRole.READER);

      done();

    }, 2000000);
    
    it("[2] invalid room_client id hence should return ? ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<rc.r.s h1>> loadAllSamples error: ', error);
      }

      let fRC: RoomClient;
      let fError;
      try {
        fRC = await roomClientRepository.room_clientGetById(10);
        console.log('<<rc.r.s>> deleleteRes: ', fRC);
      } catch (error) {
        console.log('<<rc.r.s>> error: ', error);
        fError = error;
      }
      
      expect(fError).toBeUndefined();
      expect(fRC).toBeUndefined();
      // expect(deleleteRes).toBeInstanceOf(Array);
      // expect(fRC).toEqual(1);
      // expect(fRC.client_role).toEqual(ClientRole.ADMIN);
      // expect(deleleteRes[1].client_role).toEqual(ClientRole.READER);

      done();

    }, 2000000);
    
  });

});