import { Connection, QueryFailedError } from "typeorm";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { EntitiesSeed } from '../../../test/fixtures/_entities';
import { RoomRepository } from './room.repository';
import { BadRequestException } from "@nestjs/common";
import { SampleMessageDtos } from '../../../test/fixtures/chat/sample_message.dto';
import { RoomClientRepository } from "../room_client/room_client.repository";
import { ClientRepository } from "../client/client.repository";
import { Client } from "../client/client.entity";
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { SampleMessageEntities } from '../../../test/fixtures/chat/sample_message.entities';
import { MessageRepository } from "../message/message.repository";
import { MessageCreateDto } from "../message/dto/message_create.dto";
import { Message } from "../message/message.entity";
import { Room } from './room.entity';
import { SampleRoomDtos } from '../../../test/fixtures/chat/sample_room.dto';
import { RoomType } from './room_type.enum';
import { SampleRoomEntities } from '../../../test/fixtures/chat/sample_room.entities';
import { SampleRoomClientEntities } from '../../../test/fixtures/chat/sample_room_client.entities';

jest.setTimeout(90000);

describe("room.repository.spec.ts", () => {
  let messageRepository: MessageRepository;
  let clientRepository: ClientRepository;
  let roomRepository: RoomRepository;
  let testUtils: TestUtils;

  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        DatabaseService, 
        TestUtils, 
        MessageRepository, 
        RoomRepository,
        RoomClientRepository,
        ClientRepository,
      ]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);

    try {
      messageRepository = testUtils.databaseService.connection.getCustomRepository(MessageRepository);
      // messageRepository = module.get<MessageRepository>(MessageRepository);
    } catch (error) {
      console.error('<<r.r.s |1>> error: ', error);
    }
    
    try {
      clientRepository = testUtils.databaseService.connection.getCustomRepository(ClientRepository);
      // clientRepository = module.get<MessageRepository>(MessageRepository);
    } catch (error) {
      console.error('<<r.r.s |2>> error: ', error);
    }
    
    try {
      roomRepository = testUtils.databaseService.connection.getCustomRepository(RoomRepository);
      // clientRepository = module.get<MessageRepository>(MessageRepository);
    } catch (error) {
      console.error('<<r.r.s |3>> error: ', error);
    }
    
    // messageRepository = testUtils.databaseService.connection.getCustomRepository(MessageRepository);

    done();
  });

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

  describe("[a] Variables()", () => {
    //#region  passed
    it("[1] testUtils", async done => {
      expect(testUtils).toBeDefined();

      done();
    }, 20000);
    
    it("[2] messageRepository", async done => {
      expect(messageRepository).toBeDefined();
      expect(messageRepository).toBeInstanceOf(MessageRepository);

      done();
    }, 20000);
    
    it("[3] roomRepository", async done => {
      expect(roomRepository).toBeDefined();
      expect(roomRepository).toBeInstanceOf(RoomRepository);

      done();
    }, 20000);
  });

  describe("[b] roomCreate()", () => {

    it("[1] should create new Room", async done => {
      const sRoomDto = SampleRoomDtos[0];

      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.roomCreate(sRoomDto);
        // console.log('<<b1| 1>> gRoom:', gRoom);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new room: error:', error);
        roomError = error;
      }

      expect(roomError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(gRoom).toBeDefined();
      expect(gRoom.room_id).toEqual(1);
      expect(gRoom.title).toEqual(sRoomDto.title);
      done();
    }, 20000);
    
    it("[2] title is less than 3 character hence should throw error", async done => {
      const sRoomDto = {
        room_type: RoomType.GROUP,
        title: "ti",
        status: "Hasan Legendery",
        profile_image_url: "Hassan.jpg",
    }

      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.roomCreate(sRoomDto);
        // console.log('<<b1| 1>> gRoom:', gRoom);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new room: error:', error);
        roomError = error;
      }

      expect(roomError).toBeDefined();
      expect(roomError).toBeInstanceOf(BadRequestException);
      expect(roomError.message).toContain("Validation failed!");

      expect(gRoom).toBeUndefined();
      
      done();
    }, 20000);
    
    it("[3] status is less than 3 character hence should throw error", async done => {
      const sRoomDto = {
        room_type: RoomType.GROUP,
        title: "All Hassan",
        status: "st",
        profile_image_url: "Hassan.jpg",
    }

      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.roomCreate(sRoomDto);
        // console.log('<<b1| 1>> gRoom:', gRoom);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new room: error:', error);
        roomError = error;
      }

      expect(roomError).toBeDefined();
      expect(roomError).toBeInstanceOf(BadRequestException);
      expect(roomError.message).toContain("Validation failed!");

      expect(gRoom).toBeUndefined();
      
      done();
    }, 20000);
    
  });
  
  describe("[c] roomGetById()", () => {

    it("[1] should return a room", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s c1>> loadAllSamples error: ', error);
      }


      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.roomGetById(1);
        // console.log('<<b1| 1>> gRoom:', gRoom);
      } catch (error) {
        console.log('<<r.r.s |c1>> Error while create new room: error:', error);
        roomError = error;
      }

      expect(roomError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(gRoom).toBeDefined();
      expect(gRoom.room_id).toEqual(1);
      expect(gRoom.title).toEqual(SampleRoomEntities[0].title);
      done();
    }, 20000);
    
    it("[2] should return undefined", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s c1>> loadAllSamples error: ', error);
      }


      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.roomGetById(10);
        // console.log('<<b1| 1>> gRoom:', gRoom);
      } catch (error) {
        console.log('<<r.r.s |c1>> Error while create new room: error:', error);
        roomError = error;
      }

      expect(roomError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(gRoom).toBeUndefined();
    //   expect(gRoom.room_id).toEqual(1);
    //   expect(gRoom.title).toEqual(SampleRoomEntities[0].title);
      done();
    }, 20000);
    
  });
  
  describe("[d] clientsGetByRoomId()", () => {

    it("[1] should return client 1, 2 and 3", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s d1>> loadAllSamples error: ', error);
      }


      let fClients: Client[];
      let fetchError;
      try {
        fClients = await roomRepository.clientsGetByRoomId(1);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(3);

      expect(fClients[0].client_id).toEqual(SampleRoomClientEntities[0].client_id);
      expect(fClients[1].client_id).toEqual(SampleRoomClientEntities[1].client_id);
      expect(fClients[2].client_id).toEqual(SampleRoomClientEntities[2].client_id);
      
      done();
    }, 20000);
    
    it("[2] should return empty [] ", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s d1>> loadAllSamples error: ', error);
      }


      let fClients: Client[];
      let fetchError;
      try {
        fClients = await roomRepository.clientsGetByRoomId(10);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(fClients).toBeDefined();
      expect(fClients).toBeInstanceOf(Array);
      expect(fClients.length).toEqual(0);

    //   expect(fClients[0].client_id).toEqual(SampleRoomClientEntities[0].client_id);
    //   expect(fClients[1].client_id).toEqual(SampleRoomClientEntities[1].client_id);
    //   expect(fClients[2].client_id).toEqual(SampleRoomClientEntities[2].client_id);
      
      done();
    }, 20000);
    
  });
  
  describe("[e] roomsGetByClientId()", () => {

    it("[1] should return room 1, 2 for client 2", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s e1>> loadAllSamples error: ', error);
      }


      let fRooms: Room[];
      let fetchError;
      try {
        fRooms = await roomRepository.roomsGetByClientId(2);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(fRooms).toBeDefined();
      expect(fRooms).toBeInstanceOf(Array);
      expect(fRooms.length).toEqual(2);

      expect(fRooms[0].room_id).toEqual(1);
      expect(fRooms[1].room_id).toEqual(2);

    //   expect(fRooms[0].room_id).toEqual(SampleRoomClientEntities[0].room_id);
    //   expect(fRooms[1].room_id).toEqual(SampleRoomClientEntities[1].room_id);
      
      done();
    }, 20000);
    
    it("[2] should return empty []", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s e1>> loadAllSamples error: ', error);
      }


      let fRooms: Room[];
      let fetchError;
      try {
        fRooms = await roomRepository.roomsGetByClientId(10);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(fRooms).toBeDefined();
      expect(fRooms).toBeInstanceOf(Array);
      expect(fRooms.length).toEqual(0);

    //   expect(fRooms[0].room_id).toEqual(1);
    //   expect(fRooms[1].room_id).toEqual(2);

    //   expect(fRooms[0].room_id).toEqual(SampleRoomClientEntities[0].room_id);
    //   expect(fRooms[1].room_id).toEqual(SampleRoomClientEntities[1].room_id);
      
      done();
    }, 20000);
    
    
  });
 
  describe("[f] roomUpdate()", () => {

    it("[1] should change to 'All Saeid'", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s e1>> loadAllSamples error: ', error);
      }

      const roomUpdateDto = {
          room_id: 1,
          title: "All Saeid",
      }

      let fRooms: Room;
      let fetchError;
      try {
        fRooms = await roomRepository.roomUpdate(roomUpdateDto);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.room).toContain("insert or update on table \"room\" violates foreign key constraint");

      expect(fRooms).toBeDefined();
      expect(fRooms).toBeInstanceOf(Room);
    //   expect(fRooms.length).toEqual(2);

    //   expect(fRooms[0].room_id).toEqual(1);
      expect(fRooms.title).toEqual(roomUpdateDto.title);

    //   expect(fRooms[0].room_id).toEqual(SampleRoomClientEntities[0].room_id);
    //   expect(fRooms[1].room_id).toEqual(SampleRoomClientEntities[1].room_id);
      
      done();
    }, 20000);
    
    it("[2] invalid Id hence should throw error", async done => {

      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s e1>> loadAllSamples error: ', error);
      }

      const roomUpdateDto = {
          room_id: 10,
          title: "All Saeid",
      }

      let fRooms: Room;
      let fetchError;
      try {
        fRooms = await roomRepository.roomUpdate(roomUpdateDto);
        // console.log('<<d1>> fClients:', fClients);
      } catch (error) {
        // console.log('<<r.r.s |d1>> Error while create new room: error:', error);
        fetchError = error;
      }

      expect(fetchError).toBeDefined();
      expect(fetchError).toBeInstanceOf(BadRequestException);
      expect(fetchError.message).toEqual('Invalid room_id');

      expect(fRooms).toBeUndefined();
    //   expect(fRooms).toBeInstanceOf(Room);
    //   expect(fRooms.length).toEqual(2);

    //   expect(fRooms[0].room_id).toEqual(1);
    //   expect(fRooms.title).toEqual(roomUpdateDto.title);

    //   expect(fRooms[0].room_id).toEqual(SampleRoomClientEntities[0].room_id);
    //   expect(fRooms[1].room_id).toEqual(SampleRoomClientEntities[1].room_id);
      
      done();
    }, 20000);
    
  });

})
