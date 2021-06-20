import { Connection, QueryFailedError, Repository } from "typeorm";

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { Room } from "./room.entity";
import { RoomType } from './room_type.enum';
import { SampleRoomDtos } from '../../../test/fixtures/chat/sample_room.dto';
import { BadRequestException } from "@nestjs/common/exceptions";
import { RoomCreateDto } from './dto/room_create.dto';
import { RoomRepository } from './room.repository';
import { Message } from '../message/message.entity';
import { Client } from "../client/client.entity";
import { SampleRoomEntities } from '../../../test/fixtures/chat/sample_room.entities';

jest.setTimeout(90000);

describe("room.entity.spec.ts", () => {
  let messageRepository;
  let clientRepository;
  let roomRepository;
  let roomClientRepository;
  let testUtils: TestUtils;

  // beforeEach(async done => {
  beforeAll(async done => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [DatabaseService, TestUtils]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);

    // Message
    // await testUtils.cleanTable("message", "message");
    messageRepository = testUtils.databaseService.connection.getRepository(Message);
    // messageRepository = testUtils.databaseService.connection.getCustomRepository(Message);

    // Client
    // await testUtils.cleanTable("client", "client");
    clientRepository = testUtils.databaseService.connection.getRepository(Client);

    // Room
    // await testUtils.cleanTable("room", "room");
    roomRepository = testUtils.databaseService.connection.getRepository(Room);

    // Room_Client
    // await testUtils.cleanTable("room_client", "room_client");
    roomClientRepository = testUtils.databaseService.connection.getRepository(Message);

    done();
  }, 200000);

  // afterEach(async done => {
  beforeEach(async done => {
    try {
      // await testUtils.reloadAllSamples();
      await testUtils.cleanAllSamples();
      // await testUtils.reloadAllSamples();
    } catch (error) {
      console.log('<<r.e.s>> cleanAllSamples error: ', error);
    }

    done();
  });
  
  afterAll(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] variables", () => {
    it("[1] testUtils", async done => {  

        expect(testUtils).toBeDefined();
        
        done();
    }, 20000);
    
    it("[2] roomRepository", async done => {  
        expect(roomRepository).toBeDefined();
        expect(roomRepository).toBeInstanceOf(Repository);

        const nRoom = new Room();
        expect(nRoom).toBeDefined();
        expect(nRoom).toBeInstanceOf(Room);

        done();
    }, 20000);
  });

  describe("[b] create", () => {
    it("[1] should create a sample room", async done => {

      const roomSampleDto: RoomCreateDto = SampleRoomDtos[0] ;

      const nRoom = Room.of(roomSampleDto);
      
      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.save(nRoom);
      } catch (error) {
        console.log('<<b1>> error while .save() error: ', error);
        roomError = error;
      }
      
      expect(roomError).toBeUndefined();

      expect(gRoom).toBeDefined();
      expect(gRoom.room_id).toEqual(1);
      expect(gRoom.title).toEqual(roomSampleDto.title);

      done();
    }, 200000);

    it("[2] RoomCreateDto is not complete hence should throw error", async done => {
        const roomSampleDto: RoomCreateDto = SampleRoomDtos[0] ;

        const nRoom = new Room();
        Object.assign(nRoom, roomSampleDto);

        let gRoom: Room;
        let roomError;
        try {
          gRoom = await roomRepository.save(nRoom);
        } catch (error) {
          // console.log('<<b1>> error while .save() error: ', error);
          roomError = error;
        }
        
        expect(roomError).toBeDefined();
        expect(roomError).toBeInstanceOf(BadRequestException);
        expect(roomError.message).toEqual('Validation failed!');

        expect(gRoom).toBeUndefined();

        done();
    }, 20000);
    
    it("[3] title is Empty hence should throw error", async done => {
        
      const roomSampleDto: RoomCreateDto = {
        room_type: RoomType.GROUP,
        title: "",
        status: "Hasan Legendery",
        profile_image_url: "Hassan.jpg",
      };

      const nRoom = Room.of(roomSampleDto);

      let gRoom: Room;
      let roomError;
      try {
        gRoom = await roomRepository.save(nRoom);
      } catch (error) {
        // console.log('<<b1>> error while .save() error: ', error);
        roomError = error;
      }
      
      expect(roomError).toBeDefined();
      expect(roomError).toBeInstanceOf(BadRequestException);
      expect(roomError.message).toEqual('Validation failed!');

      expect(gRoom).toBeUndefined();

      done();
    }, 20000);
    
    it("[4] room_type is Empty hence TS Error", async done => {
        
      // const roomSampleDto = {
      //   room_type: RoomType.GROUP,
      //   title: "Al Hassan",
      //   status: "Hasan Legendery",
      //   profile_image_url: "Hassan.jpg",
      // };

      // const nRoom = Room.of(roomSampleDto);

      // let gRoom: Room;
      // let roomError;
      // try {
      //   gRoom = await roomRepository.save(nRoom);
      // } catch (error) {
      //   // console.log('<<b1>> error while .save() error: ', error);
      //   roomError = error;
      // }
      
      // expect(roomError).toBeDefined();
      // expect(roomError).toBeInstanceOf(BadRequestException);
      // expect(roomError.message).toEqual('Validation failed!');

      // expect(gRoom).toBeUndefined();

      done();
    }, 20000);
    
  });

  describe("[c] read", () => {

    it("[1] find()", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fRooms: Room[];
      let msgError;
      try {
        fRooms = await roomRepository.find();
        // console.log('<<c1>> fRooms: ', fRooms);
      } catch (error) {
        console.log('<<m.e.s 3>> error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fRooms).toBeInstanceOf(Array);
      expect(fRooms.length).toEqual(2);
      expect(fRooms[0].title).toEqual(SampleRoomEntities[0].title);
      

      done();
    }, 200000);
    
    it("[2] find(1): no affect", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fRooms: Room[];
      let msgError;
      try {
        fRooms = await roomRepository.find(1);
        // console.log('<<c1>> fRooms: ', fRooms);
      } catch (error) {
        console.log('<<m.e.s 3>> Error: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fRooms).toBeInstanceOf(Array);
      expect(fRooms.length).toEqual(2);
      expect(fRooms[0].title).toEqual(SampleRoomEntities[0].title);
      

      done();
    }, 200000);
    
    it("[3] find({ room_id })", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fRoom: Room[];
      let msgError;
      try {
        fRoom = await roomRepository.find({ room_id: 1 });
        // console.log('<<c1>> fRooms: ', fRooms);
      } catch (error) {
        console.log('<<m.e.s 3>> Error: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fRoom).toBeInstanceOf(Array);
      expect(fRoom.length).toEqual(1);
      expect(fRoom[0].title).toEqual(SampleRoomEntities[0].title);
      

      done();
    }, 200000);
    
    it("[4] findOne({ room_id })", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fRoom: Room;
      let msgError;
      try {
        fRoom = await roomRepository.findOne({ room_id: 1 });
        // console.log('<<c1>> fRooms: ', fRooms);
      } catch (error) {
        console.log('<<m.e.s 3>> Error: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fRoom).toBeInstanceOf(Room);
      expect(fRoom.title).toEqual(SampleRoomEntities[0].title);
      

      done();
    }, 200000);
    
    it("[4] findOne({ title })", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fRoom: Room;
      let msgError;
      try {
        fRoom = await roomRepository.findOne({ title: "All Hassan" });
        // console.log('<<c1>> fRooms: ', fRooms);
      } catch (error) {
        console.log('<<m.e.s 3>> Error: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fRoom).toBeInstanceOf(Room);
      expect(fRoom.title).toEqual(SampleRoomEntities[0].title);
      

      done();
    }, 200000);
    
    // it("[3] find({message_id}) ", async done => {

    //   try {
    //     // clean and load
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<<c1| 1>> loadAllSamples error: ', error);
    //   }

    //   let fMessages;
    //   let msgError;
    //   try {
    //     fMessages = await messageRepository.find({message_id: 1});
    //     // console.log('<<c1>> fMessages: ', fMessages);
    //   } catch (error) {
    //     console.log('<<m.e.s 3>> Error while create new message: error:', error);
    //     msgError = error;
    //   }

    //   expect(msgError).toBeUndefined();
      
    //   expect(fMessages).toBeInstanceOf(Array);
    //   expect(fMessages.length).toEqual(1);
    //   expect(fMessages[0].text).toEqual(SampleMessageEntities[0].text);
      

    //   done();
    // }, 200000);
    
    // it("[4] findOne({message_id}) ", async done => {

    //   try {
    //     // clean and load
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<<c1| 1>> loadAllSamples error: ', error);
    //   }

    //   let fMessages;
    //   let msgError;
    //   try {
    //     fMessages = await messageRepository.findOne({message_id: 1});
    //     // console.log('<<c1>> fMessages: ', fMessages);
    //   } catch (error) {
    //     console.log('<<m.e.s 3>> Error while create new message: error:', error);
    //     msgError = error;
    //   }

    //   expect(msgError).toBeUndefined();
      
    //   expect(fMessages).toBeInstanceOf(Message);
    //   // expect(fMessages.length).toEqual(1);
    //   expect(fMessages.text).toEqual(SampleMessageEntities[0].text);
      

    //   done();
    // }, 200000);
    
    // it("[5] findOne({text}) ", async done => {

    //   try {
    //     // clean and load
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<<c1| 1>> loadAllSamples error: ', error);
    //   }

    //   let fMessages;
    //   let msgError;
    //   try {
    //     fMessages = await messageRepository.findOne({text: 'first message'});
    //     // console.log('<<c1>> fMessages: ', fMessages);
    //   } catch (error) {
    //     console.log('<<m.e.s 3>> Error while create new message: error:', error);
    //     msgError = error;
    //   }

    //   expect(msgError).toBeUndefined();
      
    //   expect(fMessages).toBeInstanceOf(Message);
    //   // expect(fMessages.length).toEqual(1);
    //   expect(fMessages.text).toEqual('first message');
      

    //   done();
    // }, 200000);

  });

});