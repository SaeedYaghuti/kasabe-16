import { Connection, QueryFailedError, Repository } from "typeorm";

import { Test } from "@nestjs/testing";

import * as Fs from "fs";
import * as Path from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { SampleRoomClientDtos } from '../../../test/fixtures/chat/sample_room_client.dto';
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { SampleRoomDtos } from '../../../test/fixtures/chat/sample_room.dto';
import { BadRequestException } from "@nestjs/common";
import { ClientRole } from "../client/client_role.enum";
import { Message } from './message.entity';
import { SampleMessageDtos } from "../../../test/fixtures/chat/sample_message.dto";
import { Client } from '../client/client.entity';
import { Room } from '../room/room.entity';
import { MessageRepository } from './message.repository';
import { ClientRepository } from "../client/client.repository";
import { RoomRepository } from '../room/room.repository';
import { RoomClientRepository } from '../room_client/room_client.repository';
import { MessageCreateDto } from "./dto/message_create.dto";
import { Length } from 'class-validator';
import { SampleMessageEntities } from '../../../test/fixtures/chat/sample_message.entities';
import { RoomClient } from '../room_client/room_client.entity';

jest.setTimeout(90000);

describe("message.entity.spec.ts", () => {
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
      console.log('<<m.e.s>> cleanAllSamples error: ', error);
    }

    done();
  });
  
  afterAll(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] Variables", () => {

    it("[1] messageRepository", async done => {  
      //Message
      expect(messageRepository).toBeDefined();
      // expect(messageRepository).toBeInstanceOf(MessageRepository);
      expect(messageRepository).toBeInstanceOf(Repository);
      const nMessage = new Message();
      expect(nMessage).toBeDefined();

      done();
    }, 200000);

    it("[2] clientRepository", async done => {  
      
      //Client
      expect(clientRepository).toBeDefined();
      // expect(clientRepository).toBeInstanceOf(ClientRepository);
      expect(clientRepository).toBeInstanceOf(Repository);
      const nClient = new Client();
      expect(nClient).toBeDefined();

      done();
    }, 200000);

    it("[3] roomRepository", async done => {  

      // Room
      expect(roomRepository).toBeDefined();
      // expect(roomRepository).toBeInstanceOf(RoomRepository);
      expect(roomRepository).toBeInstanceOf(Repository);
      const nRoom = new Room();
      expect(nRoom).toBeDefined();

      done();
    }, 200000);

    it("[4] roomClientRepository", async done => {  

      // Room_Clien
      expect(roomClientRepository).toBeDefined();
      // expect(roomClientRepository).toBeInstanceOf(RoomClientRepository);
      expect(roomClientRepository).toBeInstanceOf(Repository);
      const nRoomClient = new RoomClient();
      expect(nRoomClient).toBeDefined();

      done();
    }, 200000);

  });

  describe("[b] create", () => {
    it("[1] create a sample message [0] sent to client sepetatly", async done => {
      // 💡 create 2️⃣ client: for sender and reciver of message
      const gClients: Client[] = [];

      const numbClinet = 2;
      for (const sClientDto of SampleClientDtos.slice(0, numbClinet)) {
        const nClient = Client.of(sClientDto);

        const gClient = await clientRepository.save(nClient);
        gClients.push(gClient);
      }
      expect(gClients.length).toEqual(numbClinet);

      // Message
      const sMessage: MessageCreateDto = SampleMessageDtos[0];

      // console.log('<<m.e.s 1>> sMessage: ', sMessage);
      expect(sMessage).toBeDefined();
      expect(sMessage.text).toEqual("first message");
      
      const nMessage = Message.of(sMessage, gClients[0].client_id);
      

      let gMessage;
      let msgError;
      try {
        gMessage = await messageRepository.save(nMessage);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(gMessage).toBeDefined();
      expect(gMessage.message_id).toEqual(1);
      expect(gMessage.text).toEqual(sMessage.text);
      

      done();
    }, 200000);
    
    it("[2] create a sample message [1] for room sepetatly", async done => {
      // sample client [1]
      const gClients: Client[] = [];
      const countOfClient = 1;
      for (const sClientDto of SampleClientDtos.slice(0, countOfClient)) {
        const nClient = Client.of(sClientDto);

        const gClient = await clientRepository.save(nClient);
        gClients.push(gClient);
      }
      expect(gClients.length).toEqual(countOfClient);
      
      // sample client [1]
      const gRooms: Room[] = [];
      const countOfRoom = 1;
      for (const sRoomDto of SampleRoomDtos.slice(0, countOfRoom)) {
        const nRoom = Room.of(sRoomDto);

        // console.log('<<b2|1>> nRoom: ', nRoom);
        const gRoom = await roomRepository.save(nRoom);
        // console.log('<<b2|2>> gRoom: ', gRoom);
        gRooms.push(gRoom);
      }
      expect(gRooms.length).toEqual(countOfRoom);

      // Ssample Client
      const sMessage: MessageCreateDto = SampleMessageDtos[1];
      
      const nMessage = Message.of(sMessage, gClients[0].client_id);
      // console.log('<<b2|3>> nMessage: ', nMessage);

      const gMessage = await messageRepository.save(nMessage);
      // console.log('<<b2|4>> gMessage: ', gMessage);

      const fMessage = await messageRepository.findOne({ message_id: 1});
      // console.log('<<b2|5>> fMessage: ', fMessage);

      expect(fMessage).toBeInstanceOf(Message);
      expect(fMessage.message_id).toEqual(1);
      expect(fMessage.text).toEqual(sMessage.text);
      expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
      expect(fMessage.reciver_client_id).toEqual(null);
      expect(fMessage.reciver_room_id).toEqual(1);

      done();
    }, 200000);
    
    it("[3] create a sample [1] message to room assign entity", async done => {
      // sample client [1]
      const gClients: Client[] = [];
      const countOfClient = 1;
      for (const sClientDto of SampleClientDtos.slice(0, countOfClient)) {
        const nClient = Client.of(sClientDto);

        const gClient = await clientRepository.save(nClient);
        gClients.push(gClient);
      }
      expect(gClients[0]).toBeInstanceOf(Client);
      expect(gClients.length).toEqual(countOfClient);
      
      // sample client [1]
      const gRooms: Room[] = [];
      const countOfRoom = 1;
      for (const sRoomDto of SampleRoomDtos.slice(0, countOfRoom)) {
        const nRoom = Room.of(sRoomDto);

        const gRoom = await roomRepository.save(nRoom);
        gRooms.push(gRoom);
      }
      expect(gRooms[0]).toBeInstanceOf(Room);
      expect(gRooms.length).toEqual(countOfRoom);

      // Ssample Client
      const sMessageDto: MessageCreateDto = SampleMessageDtos[1];
      
      const nMessage = new Message();
      
      Object.assign(nMessage, sMessageDto);

      delete sMessageDto.reciver_room_id;
      nMessage.sender_client = gClients[0];
      nMessage.reciver_room = gRooms[0];
      nMessage.created_at = new Date();
      nMessage.updated_at = new Date();

      const gMessage = await messageRepository.save(nMessage);

      expect(gMessage).toBeDefined();
      expect(gMessage).toBeInstanceOf(Message);
      expect(gMessage.message_id).toEqual(1);
      expect(gMessage.text).toEqual(sMessageDto.text);

      const fMessage = await messageRepository.findOne({ message_id: 1});
      // console.log('<<b3| 1>> fMessage: ', fMessage);
      expect(fMessage).toBeInstanceOf(Message);
      expect(fMessage.message_id).toEqual(1);
      expect(fMessage.text).toEqual(sMessageDto.text);
      expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
      expect(fMessage.reciver_client_id).toEqual(null);
      expect(fMessage.reciver_room_id).toEqual(gRooms[0].room_id);

      done();
    }, 200000);
    
    it("[4] MessageCreateDto is not complete hence should throw error", async done => {
        const sMessage: MessageCreateDto = SampleMessageDtos[0] ;

        const nMessage = new Message();
        Object.assign(nMessage, sMessage);

        let gMessage;
        let msgError;
        try {
         gMessage = await messageRepository.save(nMessage);
        } catch (error) {
          // console.log('b4| 1 error: ', error);
          msgError = error;
        }
        expect(gMessage).toBeUndefined();
        expect(msgError).toBeDefined();
        expect(msgError).toBeInstanceOf(BadRequestException);
        expect(msgError.message).toEqual('Validation failed!');

        done();
    }, 20000);
    
    it("[5] reciver-client is unavailable hence should throw error", async done => {
      // 💡 create only  1️⃣ client: for  sender of message
      const gClients: Client[] = [];

      const numbClinet = 1; // 1️⃣
      for (const sClientDto of SampleClientDtos.slice(0, numbClinet)) {
        const nClient = Client.of(sClientDto);

        const gClient = await clientRepository.save(nClient);
        gClients.push(gClient);
      }
      expect(gClients.length).toEqual(numbClinet);

      // Message
      const sMessage: MessageCreateDto = SampleMessageDtos[0]; // reciver_id: 2️⃣

      // console.log('<<m.e.s 1>> sMessage: ', sMessage);
      expect(sMessage).toBeDefined();
      expect(sMessage.text).toEqual("first message");
      
      const nMessage = Message.of(sMessage, gClients[0].client_id);
      

      let gMessage;
      let msgError;
      try {
        gMessage = await messageRepository.save(nMessage);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeDefined();
      expect(msgError).toBeInstanceOf(QueryFailedError);
      expect(msgError.message).toContain("insert or update on table \"message\" violates foreign key constraint");
      
      expect(gMessage).toBeUndefined();
      

      done();
    }, 200000);
    
    it("[6] sender-client is unavailable hence should throw error", async done => {
      // 💡 create only  1️⃣ client: for  sender of message
      const gClients: Client[] = [];

      const numbClinet = 1; // 1️⃣
      for (const sClientDto of SampleClientDtos.slice(0, numbClinet)) {
        const nClient = Client.of(sClientDto);

        const gClient = await clientRepository.save(nClient);
        gClients.push(gClient);
      }
      expect(gClients.length).toEqual(numbClinet);

      // Message
      const sMessage: MessageCreateDto = SampleMessageDtos[1]; // reciver_id: 1️⃣

      // console.log('<<m.e.s 1>> sMessage: ', sMessage);
      expect(sMessage).toBeDefined();
      expect(sMessage.text).toEqual("second message");
      
      const nMessage = Message.of(sMessage, 2); // 2️⃣ is unavailable
      

      let gMessage;
      let msgError;
      try {
        gMessage = await messageRepository.save(nMessage);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeDefined();
      expect(msgError).toBeInstanceOf(QueryFailedError);
      expect(msgError.message).toContain("insert or update on table \"message\" violates foreign key constraint");
      
      expect(gMessage).toBeUndefined();
      

      done();
    }, 200000);

  });
  
  describe("[c] read", () => {

    it("[1] find()", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessages;
      let msgError;
      try {
        fMessages = await messageRepository.find();
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessages).toBeInstanceOf(Array);
      expect(fMessages.length).toEqual(4);
      expect(fMessages[0].text).toEqual(SampleMessageEntities[0].text);
      

      done();
    }, 200000);
    
    it("[2] find(1): no affect", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessages;
      let msgError;
      try {
        fMessages = await messageRepository.find(1);
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessages).toBeInstanceOf(Array);
      expect(fMessages.length).toEqual(4);
      expect(fMessages[0].text).toEqual(SampleMessageEntities[0].text);
      

      done();
    }, 200000);
    
    it("[3] find({message_id}) ", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessages;
      let msgError;
      try {
        fMessages = await messageRepository.find({message_id: 1});
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessages).toBeInstanceOf(Array);
      expect(fMessages.length).toEqual(1);
      expect(fMessages[0].text).toEqual(SampleMessageEntities[0].text);
      

      done();
    }, 200000);
    
    it("[4] findOne({message_id}) ", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessages;
      let msgError;
      try {
        fMessages = await messageRepository.findOne({message_id: 1});
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessages).toBeInstanceOf(Message);
      // expect(fMessages.length).toEqual(1);
      expect(fMessages.text).toEqual(SampleMessageEntities[0].text);
      

      done();
    }, 200000);
    
    it("[5] findOne({text}) ", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessages;
      let msgError;
      try {
        fMessages = await messageRepository.findOne({text: 'first message'});
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessages).toBeInstanceOf(Message);
      // expect(fMessages.length).toEqual(1);
      expect(fMessages.text).toEqual('first message');
      

      done();
    }, 200000);
    
    // it("[2] create a sample message [1] for room sepetatly", async done => {
    //   // sample client [1]
    //   const gClients: Client[] = [];
    //   const countOfClient = 1;
    //   for (const sClientDto of SampleClientDtos.slice(0, countOfClient)) {
    //     const nClient = Client.of(sClientDto);

    //     const gClient = await clientRepository.save(nClient);
    //     gClients.push(gClient);
    //   }
    //   expect(gClients.length).toEqual(countOfClient);
      
    //   // sample client [1]
    //   const gRooms: Room[] = [];
    //   const countOfRoom = 1;
    //   for (const sRoomDto of SampleRoomDtos.slice(0, countOfRoom)) {
    //     const nRoom = Room.of(sRoomDto);

    //     // console.log('<<b2|1>> nRoom: ', nRoom);
    //     const gRoom = await roomRepository.save(nRoom);
    //     // console.log('<<b2|2>> gRoom: ', gRoom);
    //     gRooms.push(gRoom);
    //   }
    //   expect(gRooms.length).toEqual(countOfRoom);

    //   // Ssample Client
    //   const sMessage: MessageCreateDto = SampleMessageDtos[1];
      
    //   const nMessage = Message.of(sMessage, gClients[0].client_id);
    //   // console.log('<<b2|3>> nMessage: ', nMessage);

    //   const gMessage = await messageRepository.save(nMessage);
    //   // console.log('<<b2|4>> gMessage: ', gMessage);

    //   const fMessage = await messageRepository.findOne({ message_id: 1});
    //   // console.log('<<b2|5>> fMessage: ', fMessage);

    //   expect(fMessage).toBeInstanceOf(Message);
    //   expect(fMessage.message_id).toEqual(1);
    //   expect(fMessage.text).toEqual(sMessage.text);
    //   expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
    //   expect(fMessage.reciver_client_id).toEqual(null);
    //   expect(fMessage.reciver_room_id).toEqual(1);

    //   done();
    // }, 200000);
    
    // it("[3] create a sample [1] message to room assign entity", async done => {
    //   // sample client [1]
    //   const gClients: Client[] = [];
    //   const countOfClient = 1;
    //   for (const sClientDto of SampleClientDtos.slice(0, countOfClient)) {
    //     const nClient = Client.of(sClientDto);

    //     const gClient = await clientRepository.save(nClient);
    //     gClients.push(gClient);
    //   }
    //   expect(gClients[0]).toBeInstanceOf(Client);
    //   expect(gClients.length).toEqual(countOfClient);
      
    //   // sample client [1]
    //   const gRooms: Room[] = [];
    //   const countOfRoom = 1;
    //   for (const sRoomDto of SampleRoomDtos.slice(0, countOfRoom)) {
    //     const nRoom = Room.of(sRoomDto);

    //     const gRoom = await roomRepository.save(nRoom);
    //     gRooms.push(gRoom);
    //   }
    //   expect(gRooms[0]).toBeInstanceOf(Room);
    //   expect(gRooms.length).toEqual(countOfRoom);

    //   // Ssample Client
    //   const sMessageDto: MessageCreateDto = SampleMessageDtos[1];
      
    //   const nMessage = new Message();
      
    //   Object.assign(nMessage, sMessageDto);

    //   delete sMessageDto.reciver_room_id;
    //   nMessage.sender_client = gClients[0];
    //   nMessage.reciver_room = gRooms[0];
    //   nMessage.created_at = new Date();
    //   nMessage.updated_at = new Date();

    //   const gMessage = await messageRepository.save(nMessage);

    //   expect(gMessage).toBeDefined();
    //   expect(gMessage).toBeInstanceOf(Message);
    //   expect(gMessage.message_id).toEqual(1);
    //   expect(gMessage.text).toEqual(sMessageDto.text);

    //   const fMessage = await messageRepository.findOne({ message_id: 1});
    //   // console.log('<<b3| 1>> fMessage: ', fMessage);
    //   expect(fMessage).toBeInstanceOf(Message);
    //   expect(fMessage.message_id).toEqual(1);
    //   expect(fMessage.text).toEqual(sMessageDto.text);
    //   expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
    //   expect(fMessage.reciver_client_id).toEqual(null);
    //   expect(fMessage.reciver_room_id).toEqual(gRooms[0].room_id);

    //   done();
    // }, 200000);
    
    // it("[4] MessageCreateDto is not complete hence should throw error", async done => {
    //     const sMessage: MessageCreateDto = SampleMessageDtos[0] ;

    //     const nMessage = new Message();
    //     Object.assign(nMessage, sMessage);

    //     let gMessage;
    //     let msgError;
    //     try {
    //      gMessage = await messageRepository.save(nMessage);
    //     } catch (error) {
    //       // console.log('b4| 1 error: ', error);
    //       msgError = error;
    //     }
    //     expect(gMessage).toBeUndefined();
    //     expect(msgError).toBeDefined();
    //     expect(msgError).toBeInstanceOf(BadRequestException);
    //     expect(msgError.message).toEqual('Validation failed!');

    //     done();
    // }, 20000);


    
  });


});