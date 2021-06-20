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
import { RoomRepository } from '../room/room.repository';
import { MessageRepository } from "./message.repository";
import { BadRequestException } from "@nestjs/common";
import { SampleMessageDtos } from '../../../test/fixtures/chat/sample_message.dto';
import { RoomClientRepository } from "../room_client/room_client.repository";
import { ClientRepository } from "../client/client.repository";
import { MessageUpdateDto } from "./dto/message_update.dto";
import { Client } from "../client/client.entity";
import { SampleClientDtos } from '../../../test/fixtures/chat/sample_client.dto';
import { MessageCreateDto } from "./dto/message_create.dto";
import { Message } from "./message.entity";
import { MessageRecipiant } from './messag_recipiant.enum';
import { SampleMessageEntities } from '../../../test/fixtures/chat/sample_message.entities';

jest.setTimeout(90000);

describe("message.repository.spec.ts", () => {
  let messageRepository: MessageRepository;
  let clientRepository: ClientRepository;
  let testUtils: TestUtils;

  beforeEach(async done => {
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
      console.error('<<m.r.s |1>> error: ', error);
    }
    
    try {
      clientRepository = testUtils.databaseService.connection.getCustomRepository(ClientRepository);
      // clientRepository = module.get<MessageRepository>(MessageRepository);
    } catch (error) {
      console.error('<<m.r.s |2>> error: ', error);
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
 
  afterEach(async done => {
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
  });

  describe("[b] messageCreate()", () => {

    it("[1] messageCreate(0) should create new Message", async done => {
      // 💡 create only  1️⃣ client: for  sender of message
      const gClients: Client[] = [];

      const numbClinet = 2; // 2️⃣
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

      let gMessage: Message;
      let msgError;
      try {
        gMessage = await messageRepository.messageCreate(sMessage, 1);
        // console.log('<<b1| 1>> gMessage:', gMessage);
      } catch (error) {
        // console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      // expect(msgError).toBeInstanceOf(QueryFailedError);
      // expect(msgError.message).toContain("insert or update on table \"message\" violates foreign key constraint");

      expect(gMessage).toBeDefined();
      expect(gMessage.message_id).toEqual(1);
      expect(gMessage.text).toEqual(sMessage.text);
      expect(gMessage.sender_client_id).toEqual(1);
      expect(gMessage.reciver_client_id).toEqual(sMessage.reciver_client_id);

      done();
    }, 20000);
    
    it("[2] reciver-client is unavailable hence should throw error", async done => {
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
      

      let gMessage;
      let msgError;
      try {
        gMessage = await messageRepository.messageCreate(sMessage, gClients[0].client_id);
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
    
    it("[3] sender-client is unavailable hence should throw error", async done => {
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
      

      let gMessage;
      let msgError;
      try {
        gMessage = await messageRepository.messageCreate(sMessage, 10);
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

  describe("[c] messageGetById()", () => {
    it("[1] messageGetById(1) should return a message", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessage;
      let msgError;
      try {
        fMessage = await messageRepository.messageGetById(1);
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessage).toBeInstanceOf(Message);
      expect(fMessage.sender_client_id).toEqual(SampleMessageEntities[0].sender_client_id);
      expect(fMessage.reciver_client_id).toEqual(SampleMessageEntities[0].reciver_client_id);
      

      done();
    }, 200000);
    
    it("[2] messageGetById(10) should return undefined", async done => {

      try {
        // clean and load
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<c1| 1>> loadAllSamples error: ', error);
      }

      let fMessage;
      let msgError;
      try {
        fMessage = await messageRepository.messageGetById(10);
        // console.log('<<c1>> fMessages: ', fMessages);
      } catch (error) {
        console.log('<<m.e.s 3>> Error while create new message: error:', error);
        msgError = error;
      }

      expect(msgError).toBeUndefined();
      
      expect(fMessage).toBeUndefined();
      // expect(fMessage.sender_client_id).toEqual(SampleMessageEntities[0].sender_client_id);
      // expect(fMessage.reciver_client_id).toEqual(SampleMessageEntities[0].reciver_client_id);
      

      done();
    }, 200000);
    
  });
  

//   describe("[e] messageGetByRoomId()", () => {

//     it("[1] CR.messagesGetByRoomId(1) should return []", async done => {

//       try {
//         // await testUtils.reloadAllSamples();
//         await testUtils.loadAllSamples();
//       } catch (error) {
//         console.log('2|cgbi error: ', error.message);
//         expect(error).toBeUndefined();
//       }
      
//       const fMessages = await messageRepository.messagesGetByRoomId(1);
//       expect(fMessages).toBeDefined();
//       expect(fMessages.length).toEqual(3);
//       expect(fMessages[0].message_fname).toEqual("saeid");
//       expect(fMessages[1].message_fname).toEqual("hamid");
//       expect(fMessages[2].message_fname).toEqual("asity");

      
//       done();
//     }, 20000);
    
//     it("[2] CR.messagesGetByRoomId(1) should return []", async done => {
      
//       const fMessages = await messageRepository.messagesGetByRoomId(1);
//       expect(fMessages).toEqual([]);
      
//       done();
//     }, 20000);
    
//   });



})
