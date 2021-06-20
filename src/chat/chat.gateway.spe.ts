import { Test, TestingModule } from '@nestjs/testing';
import { Connection, QueryFailedError } from "typeorm";

import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

import { INestApplication } from '@nestjs/common';

import faker from 'faker';
import { MessageRepository } from './models/message/message.repository';
import { ClientRepository } from './models/client/client.repository';
import { RoomRepository } from './models/room/room.repository';
import { MessageCreateRepoDto } from './models/message/dto/message_create_repo.dto';
import { RoomClientRepository } from './models/room_client/room_client.repository';
import { Message } from './models/message/message.entity';
import { MessageCreateDto } from './models/message/dto/message_create.dto';
import { MessageRecipiant } from './models/message/messag_recipiant.enum';
import { SocketStateService } from '../realtime/socket-state/socket-state.service';
import { RedisPropagatorService } from '../realtime/redis-propagator/redis-propagator.service';
import { RedisService } from '../realtime/redis/redis.service';
import { REDIS_SUBSCRIBER_CLIENT } from '../realtime/redis/redis.constants';
import { RealtimeModule } from '../realtime/realtime.module';
import { AuthenticatedSocket, SocketStateAdapter } from '../realtime/socket-state/socket-state.adapter';
import * as io from 'socket.io-client';
import { AuthService } from '../auth/auth.service';
import { EmittoFrontendDto } from '../realtime/redis-propagator/dto/emit-to-frontend.dto';
import { doesNotReject } from 'assert';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { TestUtils } from '../test/test.utils';
import { async } from 'rxjs/internal/scheduler/async';
import { Client } from './models/client/client.entity';
import { SampleClientDtos } from '../test/fixtures/chat/sample_client.dto';

jest.setTimeout(90000);

 //#region  Fake Repository
 class ChatServiceFake {
  public async messageCreate(): Promise<void> {}
  public async messageGetById(): Promise<void> {}
  public async clientCreate(): Promise<void> {}
  public async clientUpdate(): Promise<void> {}
  public async clientGetById(): Promise<void> {}
  public async clientsGetByRoomId(): Promise<void> {}
  public async roomUpdate(): Promise<void> {}
  public async roomGetById(): Promise<void> {}
  public async roomsGetByClientId(): Promise<void> {}
  public async room_clientUpdate(): Promise<void> {}
  public async room_clientGetById(): Promise<void> {}
  public async room_clientsGetByClientId(): Promise<void> {}
}
 class ClientRepositoryFake {
  public async clientCreate(): Promise<void> {}
  public async clientUpdate(): Promise<void> {}
  public async clientGetById(): Promise<void> {}
  public async clientsGetByRoomId(): Promise<void> {}
}
class MessageRepositoryFake {
  public async messageCreate(): Promise<void> {}
  public async messageGetById(): Promise<void> {}
}
class RoomClientRepositoryFake {
  public async room_clientCreate(): Promise<void> {}
  public async room_clientCreateSample(): Promise<void> {}
  public async room_clientUpdate(): Promise<void> {}
  public async clientsGetByRoomId(): Promise<void> {}
  public async room_clientsGetByClientId(): Promise<void> {}
  public async clientLeftRoom(): Promise<void> {}
  public async room_clientGetById(): Promise<void> {}
}
class RoomRepositoryFake {
  public async roomCreate(): Promise<void> {}
  public async roomCreateSample(): Promise<void> {}
  public async roomUpdate(): Promise<void> {}
  public async roomGetById(): Promise<void> {}
  public async clientsGetByRoomId(): Promise<void> {}
  public async roomsGetByClientId(): Promise<void> {}
}

//#endregion



describe('chat.gateway.spec.ts', () => {
  // let client;

  let app: INestApplication;
  let chatService: ChatService;
  let chatGateway: ChatGateway;
  let messageRepository: MessageRepository;
  let testUtils: TestUtils;

  beforeEach(async () => {
   
    const module: TestingModule = await Test.createTestingModule({
      imports: [ RealtimeModule, DatabaseModule ],
      providers: [
        ChatGateway,
        // ChatService,
        // MessageRepository,
        SocketStateService,
        RedisPropagatorService,
        RedisService,
        DatabaseService,
        TestUtils,
        // AuthService,
        {
          provide: ChatService,
          useClass: ChatServiceFake,
        },
        {
          provide: ClientRepository,
          useClass: ClientRepositoryFake,
        },
        {
          provide: RoomRepository,
          useClass: RoomRepositoryFake,
        },
        {
          provide: RoomClientRepository,
          useClass: RoomClientRepositoryFake,
        },
        // {
        //   provide: MessageRepository,
        //   useClass: MessageRepositoryFake,
        // },
      ]

    })
    .compile();

    app = module.createNestApplication();

    // ########## Add SocketIO ################
    const socketStateService = app.get(SocketStateService);
    // const redisPropagatorService = app.get(RedisPropagatorService);
    // const authService = app.get(AuthService);

    // To register our custom adapter, we have to use the useWebSocketAdapter method of a Nest application:
    // app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, redisPropagatorService, authService));
    // app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService, authService));
    app.useWebSocketAdapter(new SocketStateAdapter(app, socketStateService));

    await app.init();

    await app.listen(3000);
    // #######################################

    chatService = app.get<ChatService>(ChatService);
    chatGateway = app.get<ChatGateway>(ChatGateway);
    testUtils = module.get<TestUtils>(TestUtils);
    // messageRepository = app.get<MessageRepository>(MessageRepository);
  });


  // beforeEach(async done => {

  //   client = io.connect('http://localhost:3000', {
  //     reconnectionDelay: 0,
  //     // "reconnectionDelay": 0,
  //     // 'reopen delay': 0,
  //     // 'force new connection': true
  //   });

  //   client.on('connect', () => {
  //     // console.log('[1] on.connect: worked...');
  //     done();
  //   });

  //   client.on('disconnect', () => {
  //     // console.log('[2] on.disconnect: disconnect...');
  //     done();
  //   });
    
  // });


  
  // afterEach(async done => {

  //   if(client?.connected) {
  //     // console.log('[3] disconnecting...');
  //     await client.disconnect();
  //   } else {
  //     // console.log('[4] no connection to break...');
  //   }

  //   done();

  // });



  afterEach(async done => {
    app.close();
    done();
  })

  //#region a

  describe('[a] variables', () => {

    it('[1] chatService should be defined', async (done) => {
      
      expect(chatService).toBeDefined();
      // expect(chatService).toBeInstanceOf(ChatService);
      expect(chatService).toBeInstanceOf(ChatServiceFake);

      done();

    }, 20000);
    
    it('[2] chatGateway should be defined', async () => {
      
      expect(chatGateway).toBeDefined();

    }, 20000);
    
    it('[3] testUtils should be defined', async () => {
      
      expect(testUtils).toBeDefined();

    }, 20000);

  });
  
  //#endregion
  
  //#region b
  describe('[b] chatToServer', () => {

    it('[1] should transfer message from front-end to server and return RESULT', async (done) => {
      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });

      // 📱 => 💻
      const feData = {
        reciver_client_id: 1,
        // reciver_room_id: 1,
        text: 'first message',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Client,
        reciver_client_id: 2, 
        text: 'a text' ,
      }, 1);

      // 💻 => 📱
      const beMessage = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      

      let chatToServerCbCalled = false;


      // 📱 Front_End
      client1.emit('chatToServer', feData, (result, error) => {

        chatToServerCbCalled = true;
        expect(chatService_messageCreate_Spy).toBeCalledWith(feData, 1);

        
        expect(result).toEqual(beMessage); 
        expect(error).toBeUndefined(); 
        
      });
      
      // 📱 Front_end
      client1.on('msgToClient', (rData) => {
        
        expect(chatToServerCbCalled).toEqual(true);

        expect(rData.message).toEqual('your message delevered to server');
        expect(rData.req).toEqual(feData);

        client1.disconnect();

        done();

      });
      
    });
      
    it('[2] should transfer message from front-end to server and return ERROR', async (done) => {
      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });

      // 📱 => 💻
      const feData = {
        reciver_client_id: 1,
        text: 'first message',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Client,
        reciver_client_id: 2, 
        text: 'a text' ,
      }, 1);

      // 💻 => 📱
      const beMessage = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockRejectedValue(new Error('error while saving message at db!'));
      

      let chatToServerCbCalled = false;


      // 📱 Front_End
      client1.emit('chatToServer', feData, (result, error) => {

        chatToServerCbCalled = true;
        expect(chatService_messageCreate_Spy).toBeCalledWith(feData, 1);

        
        expect(result).toEqual(null); 
        expect(error).toEqual('error while saving message at db!'); 
        
      });
      
      // 📱 Front_end
      client1.on('msgToClient', (rData) => {
        
        expect(chatToServerCbCalled).toEqual(true);

        expect(rData.message).toEqual('your message delevered to server');
        expect(rData.req).toEqual(feData);

        client1.disconnect();

        done();

      });
      
    });

  });

  //#endregion
  
  //#region c
  describe('[c] chatToOne', () => {

    it('[1] client1 send message to client2', async (done) => {
      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });

      // 📱 => 💻
      const cData = {
        reciver_client_id: 2,
        // reciver_room_id: 1,
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Client,
        reciver_client_id: 2, 
        text: 'a text' ,
      }, 1);

      // 💻 => 📱
      const beMessage = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      

      let chatToServerCbCalled = false;


      // 📱 Front_End
      client1.emit('chatToOne', cData, (result, error) => {

        chatToServerCbCalled = true;
        expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);

        
        expect(result).toEqual(beMessage); 
        expect(error).toBeUndefined(); 

        client1.disconnect();

        // done();
        
      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client2.on('msgToClient', (rData) => {
        
        // rData: {
        //   message: 'your message delevered to server',
        //   req: { reciver_client_id: 2, text: 'sample message c1' }
        // }
        // console.log('<<c1>> rData:', rData);
        expect(chatToServerCbCalled).toEqual(true);

        expect(rData.message).toEqual('your message delevered to server');
        expect(rData.req).toEqual(cData);

        client2.disconnect();

        done();

      });
      
    });
    
    it('[2] client1 send invalid message hence cb error ', async (done) => {
      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });

      // 📱 => 💻
      const cData = {
        // reciver_client_id: 2, 
        reciver_room_id: 1,  // 🚩 Error Prone
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Client,
        reciver_client_id: 2, 
        text: 'a text' ,
      }, 1);

      // 💻 => 📱
      const beMessage = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      

      let chatToServerCbCalled = false;


      // 📱 Front_End
      client1.emit('chatToOne', cData, (result, error) => {

        `error : [
          {
            target: { reciver_room_id: 1, text: 'sample message c1' },
            property: 'reciver_client_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_client_id should not be empty' }
          }
        ]`;

        // console.log('result :', result);
        // console.log('error :', error);

        chatToServerCbCalled = true;
        expect(chatService_messageCreate_Spy).toBeCalledTimes(0);

        
        expect(result).toEqual(null); 
        expect(error).toBeInstanceOf(Array); 
        expect(error[0].constraints).toEqual({ isNotEmpty: 'reciver_client_id should not be empty' }); 

        // client1.disconnect();

        // done();
        
      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client1.on('msgToClient', (rData) => {
        
        `rData: {
          message: {
            sender: { authid: 'Admin', socketid: '007' },
            reciver: { authid: 1, socketid: 'ALWhKqwwI1TQgF2QAAAA' },
            message: 'There was problem in message you sent!',
            createdAt: '2020-10-03T06:46:49.958Z'
          },
          req: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
        
        // console.log('<<c1>> client1 rData:', rData);

        expect(chatToServerCbCalled).toEqual(true);

        expect(rData.req).toEqual(cData);

        client1.disconnect();

        done();

      });
      
      // hence Error client2 is not called
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      // client2.on('msgToClient', (rData) => {
        
      //   // rData: {
      //   //   message: 'your message delevered to server',
      //   //   req: { reciver_client_id: 2, text: 'sample message c1' }
      //   // }
      //   console.log('<<c1>> rData:', rData);
      //   expect(chatToServerCbCalled).toEqual(true);

      //   expect(rData.message).toEqual('your message delevered to server');
      //   expect(rData.req).toEqual(cData);

      //   client2.disconnect();

      //   done();

      // });
      
    });
    
  });
  //#endregion

  //#region d

  describe('[d] chatToGroup', () => {

    //#region  [1]

    it('[1] sending message to group1 hence 2, 3 will recive data', async (done) => {
      
      try {
        await testUtils.loadAllSamples();
      } catch (error) {
        console.log('<<r.r.s c1>> loadAllSamples error: ', error);
      }

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });

      // 📱 => 💻
      const cData = {
        // reciver_client_id: 2,
        reciver_room_id: 1,
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Room,
        reciver_room_id: 1, 
        text: 'message returned by spy' ,
      }, 1);

      // 💻 => 📱
      const gMessageUp = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      
      // 🕵️‍♀️
      const clinetSpys = [];
      [1, 2, 3].forEach(i => clinetSpys.push({
        client_id: i,
        ...Client.of(SampleClientDtos[0])
      }));
      const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
      .mockResolvedValue(clinetSpys);
      

      let c1Done = false;
      let c2Done = false;
      let c3Done = false;


      // 📱 Front_End
      client1.emit('chatToGroup', cData, (result, error) => {
        
        // console.log('[2] result: ', result);
        // console.log('[2] error: ', error);

        expect(result).toEqual([1, 2, 3]); 
        expect(error).toBeUndefined(); 

        c1Done = true;
        expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);

        

        // client1.disconnect();

        // done();
        
      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client2.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: 'OAoabrj8j-TGxNFaAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
        // console.log('<<c1| client-2>> rData:', rData);

        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client2.disconnect();

        c2Done = true;

        if(c3Done) done();

      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client3.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: 'OAoabrj8j-TGxNFaAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
        // console.log('<<c1| client-3>> rData:', rData);

        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client3.disconnect();

        c3Done = true;
        
        if(c2Done) done();
        

      });
      
    });

    //#endregion
    
    //#region  [2]
    it('[2] validation-error hence should return-back error to c1', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });

      // 📱 => 💻
      const cData = {
        reciver_client_id: 2,
        // reciver_room_id: 1,
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Room,
        reciver_room_id: 1, 
        text: 'message returned by spy' ,
      }, 1);

      // 💻 => 📱
      const gMessageUp = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      }

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      
      // 🕵️‍♀️
      const clinetSpys = [];
      [1, 2, 3].forEach(i => clinetSpys.push({
        client_id: i,
        ...Client.of(SampleClientDtos[0])
      }));
      const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
      .mockResolvedValue(clinetSpys);
      

      let c1Done = false;
      let c2Done = false;
      let c3Done = false;


      // 📱 Front_End
      client1.emit('chatToGroup', cData, (result, error) => {
        `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;

        
        // console.log('result :', result);
        // console.log('error :', error);

        c1Done = true;
        expect(chatService_messageCreate_Spy).toBeCalledTimes(0);

        
        expect(result).toEqual(null); 
        expect(error).toBeInstanceOf(Array); 
        expect(error[0].constraints).toEqual({ isNotEmpty: "reciver_room_id should not be empty" }); 

        client1.disconnect();

        done();
        
      });
      
    });
    
    //#endregion
    
    //#region  [3]

    it('[3] messageCreate()-error hence send error to c1 and send message to c1, c2', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });

      // 📱 => 💻
      const cData = {
        // reciver_client_id: 2,
        reciver_room_id: 1,
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Room,
        reciver_room_id: 1, 
        text: 'message returned by spy' ,
      }, 1);

      // 💻 => 📱
      const gMessageUp = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      };

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockRejectedValue('error while saving message');
      
      // 🕵️‍♀️
      const clinetSpys = [];
      [1, 2, 3].forEach(i => clinetSpys.push({
        client_id: i,
        ...Client.of(SampleClientDtos[0])
      }));
      const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
      .mockResolvedValue(clinetSpys);
      

      let c1Done = false;
      let c2Done = false;
      let c3Done = false;


      // 📱 Front_End
      client1.emit('chatToGroup', cData, (result, error) => {
        `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;

        
        // console.log('result :', result);
        // console.log('error :', error);

        c1Done = true;
        expect(chatService_messageCreate_Spy).toBeCalledTimes(1);
        expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);

        
        expect(result).toEqual(null); 
        // expect(error).toBeInstanceOf(Error); 
        expect(error).toEqual('error while saving message'); 
        // expect(error[0].constraints).toEqual({ isNotEmpty: "reciver_room_id should not be empty" }); 

        client1.disconnect();

        // done();
        
      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client2.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;

        // console.log('<<client-2>> rData:', rData);
        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client2.disconnect();

        c2Done = true;

        if(c3Done) done();

      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client3.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;

        // console.log('<<client-3>> rData:', rData);
        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client3.disconnect();

        c3Done = true;
        
        if(c2Done) done();
        
      });
      
    });

    //#endregion
    
    //#region  [4]
    it('[4] clientsGetByRoomId()-error hence send error to c1', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });

      // 📱 => 💻
      const cData = {
        // reciver_client_id: 2,
        reciver_room_id: 1,
        text: "sample message c1",
        // extraField: 'shoud not allowed',
        // msg_video_id: '',
        // msg_audio_id: '',
        // msg_photo_id: '',
        // msg_sticker_id: '',
      }

      
      const gMessage = Message.of({
        to: MessageRecipiant.Room,
        reciver_room_id: 1, 
        text: 'message returned by spy' ,
      }, 1);

      // 💻 => 📱
      const gMessageUp = {
        ...gMessage,
        created_at: gMessage.created_at.toISOString(),
        updated_at: gMessage.updated_at.toISOString(),
      };

      // 🕵️‍♀️
      const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
      .mockResolvedValue(gMessage);
      
      // 🕵️‍♀️
      const clinetSpys = [];
      [1, 2, 3].forEach(i => clinetSpys.push({
        client_id: i,
        ...Client.of(SampleClientDtos[0])
      }));
      const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
      .mockRejectedValue('error while getting clients have joined in group');
      

      let c1Done = false;
      let c2Done = false;
      let c3Done = false;


      // 📱 Front_End
      client1.emit('chatToGroup', cData, (result, error) => {
        `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;

        
        // console.log('result :', result);
        // console.log('error :', error);

        c1Done = true;
        expect(chatService_messageCreate_Spy).toBeCalledTimes(1);
        expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);

        expect(chatService_clientsGetByRoomId_Spy).toBeCalledTimes(1);
        expect(chatService_clientsGetByRoomId_Spy).toBeCalledWith(cData.reciver_room_id);

        
        expect(result).toEqual(null); 
        // expect(error).toBeInstanceOf(Error); 
        expect(error).toEqual('error while getting clients have joined in group'); 
        // expect(error[0].constraints).toEqual({ isNotEmpty: "reciver_room_id should not be empty" }); 

        client1.disconnect();

        done();
        
      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client2.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;

        // console.log('<<client-2>> rData:', rData);
        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client2.disconnect();

        c2Done = true;

        if(c3Done) done();

      });
      
      // chat-To-One wont send message to current client 
      // 📱 Front_end
      client3.on('msgToClient', (rData) => {
        
        `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;

        // console.log('<<client-3>> rData:', rData);
        expect(c1Done).toEqual(true);

        expect(rData.message).toEqual(cData);

        client3.disconnect();

        c3Done = true;
        
        if(c2Done) done();
        
      });
      
    });
    
    //#endregion
    
    
  });
  
  //#endregion
  
  //#region e

  describe('[e] emitClientStatus and watchClientStatus', () => {

    //#region  [1]

    it('[1] client1 emit its status and get cb', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      const emitClientStatusDto = {
        status: 'ISONLINE',
        emitted_at: new Date().getTime(),
      }
      
      // 📱 Front_End
      client1.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
        // console.log('client1 result: ', result);
        // console.log('client1 error: ', error);

        expect(result).toEqual(`Your status: ${emitClientStatusDto.status}...`); 
        expect(error).toBeUndefined(); 

        c1Done = true;

        client1.disconnect();

        done();
      });

    });

    //#endregion
    
    //#region  [2]

    it('[2] client1 watchClientStatus of client2', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      // watching authID = 2
      const client1WatchDto = {
        followed_client_ids: [2, 3],
        emitted_at: new Date().getTime(),// milisecond
      }
      
      client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
        // console.log('client1 result: ', result);
        // console.log('client1 error: ', error);

        expect(result).toEqual(`You will be notified about your folowers client`); 
        expect(error).toBeUndefined(); 

        c1Done = true;

        client1.disconnect();

        done();
        
      });
      
    });

    //#endregion
     
    //#region  [3]

    it('[3] client1 watchStatus and client2 emitStatus', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      // 🚧 3️⃣ Step There: client1 should recive status of client2  🚧
      
      // 📱 Front_end
      client1.on('msgToClient', (rData) => {
        
        // console.log('client1 |2  rData:', rData);

        // expect(rData.message).toEqual('your message delevered to server');
        // expect(rData.req).toEqual(feData);

        client1.disconnect();

        done();

      });

      // 🚧 1️⃣ Step One: client1 emitWatchStatus of client 2  🚧

      // watching authID = 2
      const client1WatchDto = {
        followed_client_ids: [2, 3],
        emitted_at: new Date().getTime(),// milisecond
      }
      
      client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
        
        // console.log('client1 result: ', result);
        // console.log('client1 error: ', error);

        expect(result).toEqual(`You will be notified about your folowers client`); 
        expect(error).toBeUndefined(); 

        c1Done = true;

        // client1.disconnect();

        // done();

      });


      // 🚧 2️⃣ Step Two: client2 emitStatus  🚧

      const emitClientStatusDto = {
        status: 'ISONLINE',
        emitted_at: new Date().getTime(),
      }
      
      // 📱 Front_End
      client2.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
        
        // console.log('client2 result: ', result);
        // console.log('client2 error: ', error);

        expect(result).toEqual(`Your status: ${emitClientStatusDto.status}...`); 
        expect(error).toBeUndefined(); 

        c1Done = true;

        client2.disconnect();

        // done();
      });

      
      
    });

    //#endregion
    
    //#region  [4]

    it('[4] emit client status with invalid arg hence throw error', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      const emitClientStatusDto = {
        status: 'ISONLINEXXX',
        emitted_at: new Date().getTime(),
      }
      
      // 📱 Front_End
      client1.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
        
        `error:  [
          {
            target: { status: 'ISONLINEXXX', emitted_at: 1601791126921 },
            value: 'ISONLINEXXX',
            property: 'status',
            children: [],
            constraints: { isEnum: 'status must be a valid enum value' }
          }
        ]`;
        // console.log('client1 error: ', error);
        // console.log('client1 result: ', result);

        expect(result).toEqual(null); 
        expect(error).toBeDefined(); 
        expect(error[0].constraints).toEqual({ isEnum: 'status must be a valid enum value' }); 

        c1Done = true;

        client1.disconnect();

        done();
      });

    });

    //#endregion

    //#region  [5]

    it('[5] emit watch-client-status with invalid arg hence throw error', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      // watching authID = 2
      const client1WatchDto = {
        followed_client_ids: ["2", "3"],
        emitted_at: new Date().getTime(),// milisecond
      }
      
      client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
        
        `error:  [
          {
            target: { followed_client_ids: [Array], emitted_at: 1601792319629 },
            value: [ '2', '3' ],
            property: 'followed_client_ids',
            children: [],
            constraints: {
              isInt: 'each value in followed_client_ids must be an integer number'
            }
          }
        ]`;

        // console.log('client1 result: ', result);
        // console.log('client1 error: ', error);

        expect(result).toEqual(null); 
        expect(error[0].constraints).toEqual({
          isInt: 'each value in followed_client_ids must be an integer number'
        }); 

        c1Done = true;

        client1.disconnect();

        done();
        
      });
      
    });
  
    //#endregion
    
    //#region  [6]

    it('[6] emit watch-client-status with invalid TIME (less than 2s ago) hence throw error', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      // watching authID = 2
      const client1WatchDto = {
        followed_client_ids: [2, 3],
        emitted_at: new Date().getTime() - 2500,// milisecond
      }
      
      client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
        
        `error: Invalid Timstamp or too past: vData.emitted_at: 1601793518501`;
        // console.log('client1 error: ', error);
        // console.log('client1 result: ', result);

        expect(result).toEqual(null); 
        expect(error).toEqual(`Invalid Timstamp or too past: vData.emitted_at: ${client1WatchDto.emitted_at}`); 

        c1Done = true;

        client1.disconnect();

        done();
        
      });
      
    });

    //#endregion
    
    //#region  [7]

    it('[7] emit watch-client-status with invalid TIME (at future) hence throw error', async (done) => {

      // establish connection
      const client1 = io.connect('http://localhost:3000', {
        query: {
            token: 1,
        },
      });
      
      const client2 = io.connect('http://localhost:3000', {
        query: {
            token: 2,
        },
      });
      
      const client3 = io.connect('http://localhost:3000', {
        query: {
            token: 3,
        },
      });


      let c1Done = false;
      let c2Done = false;
      let c3Done = false;

      // watching authID = 2
      const client1WatchDto = {
        followed_client_ids: [2, 3],
        emitted_at: new Date().getTime() + 1000,// milisecond
      }
      
      client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
        
        `error: Invalid Timstamp or too past: vData.emitted_at: 1601793518501`;
        
        // console.log('client1 error: ', error);
        // console.log('client1 result: ', result);

        expect(result).toEqual(null); 
        expect(error).toEqual(`Invalid Timstamp or too past: vData.emitted_at: ${client1WatchDto.emitted_at}`); 

        c1Done = true;

        client1.disconnect();

        done();
        
      });
      
    });

    //#endregion
    
  });
  
  //#endregion

});




