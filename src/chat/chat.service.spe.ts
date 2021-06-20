import { Test, TestingModule } from '@nestjs/testing';

import { ChatService } from './chat.service';

import { INestApplication } from '@nestjs/common';

import faker from 'faker';
import { MessageRepository } from './models/message/message.repository';
import { ClientRepository } from './models/client/client.repository';
import { RoomRepository } from './models/room/room.repository';
import { RoomClientRepository } from './models/room_client/room_client.repository';
import { Message } from './models/message/message.entity';
import { MessageCreateDto } from './models/message/dto/message_create.dto';
import { MessageRecipiant } from './models/message/messag_recipiant.enum';

 //#region  Fake Repository
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


describe('ChatService', () => {
  let app: INestApplication;
  
  let chatService: ChatService;
  let messageRepository: MessageRepository;

  beforeAll(async () => {
   
    const module: TestingModule = await Test.createTestingModule({
      imports: [ ],
      providers: [
        ChatService,
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
        {
          provide: MessageRepository,
          useClass: MessageRepositoryFake,
        }
      ]

    })
    .compile();

    app = module.createNestApplication();
    await app.init();

    chatService = app.get<ChatService>(ChatService);
    messageRepository = app.get<MessageRepository>(MessageRepository);
  });

  
  describe('[a] variables', () => {

    it('[1] messageRepository should be instance of MessageRepositoryFake', async () => {
      
      expect(messageRepository).toBeDefined();

      expect(messageRepository).toBeInstanceOf(MessageRepositoryFake);

    }, 20000);
    
    it('[2] chatService should be defined', async done => {
      
      expect(chatService).toBeDefined();

      done();

    }, 20000);

  });

  
  
  describe('[b] messageCreate()', () => {

    it('[1] message to client', async () => {
      
      const messageDto: MessageCreateDto = {
        to: MessageRecipiant.Client,
        reciver_client_id: 1,
        text: faker.lorem.words(),
      }

      const nMessageClient = Message.of(messageDto, 1);

      const messageRepositorymessageCreateSpy = 
      jest.spyOn(messageRepository, 'messageCreate')
      .mockResolvedValue(nMessageClient);
      
      const result = await chatService.messageCreate(messageDto, 1);
      expect(messageRepositorymessageCreateSpy).toBeCalledWith( messageDto, 1);
      expect(result).toEqual(nMessageClient);
      
    }, 20000);

    it('[2] to ROOM:  should return sample message', async () => { 

      const messageDto: MessageCreateDto = {
        to: MessageRecipiant.Room,
        reciver_client_id: 1,
        text: faker.lorem.words(),
      }

      const nMessageRoom = Message.of(messageDto, 1);

      const messageRepositorymessageCreateSpy = 
      jest.spyOn(messageRepository, 'messageCreate')
      .mockResolvedValue(nMessageRoom);
      
      const result = await chatService.messageCreate(messageDto, 1);
      expect(messageRepositorymessageCreateSpy).toBeCalledWith(messageDto, 1);
      expect(result).toEqual(nMessageRoom);
    }, 20000);
    
    it('[3] message to client should throw error', async () => {
      
      const errorMessage = "insert or update on table \"message\" violates foreign key constraint";
      
      const messageDto: MessageCreateDto = {
        to: MessageRecipiant.Client,
        reciver_client_id: 1,
        text: faker.lorem.words(),
      }

      const nMessageClient = Message.of(messageDto, 1);

      const messageRepositorymessageCreateSpy = 
      jest.spyOn(messageRepository, 'messageCreate')
      .mockImplementation(() => { throw new Error(errorMessage) });
      
      try {
        const result = await chatService.messageCreate(messageDto, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toEqual(errorMessage);
      }

    }, 20000);
    
    
    
    it('should return ERROR', async () => {   
      
      const messageDto: MessageCreateDto = {
        to: MessageRecipiant.Room,
        reciver_client_id: 1,
        text: faker.lorem.words(),
      }

      // const nMessageRoom = Message.of(messageDto, 1);
      
      // const siMessagetoRoom: MessageCreateRepoDto = {
      //     sender_client_id: 1,
      //     reciver_room_id: 1,
      //     text: faker.lorem.words(),
      // }

      const messageRepositorymessageCreateSpy = 
      jest.spyOn(messageRepository, 'messageCreate')
      .mockRejectedValue(new Error('some error happend!'))
      // .mockResolvedValue(throw new Error('server error!'));

      let result;
      let createErr;
      try {
        result = await chatService.messageCreate(messageDto, 1);
      } catch (error) {
        // console.log('error: ', error);
        createErr = error;
      }

      expect(messageRepositorymessageCreateSpy).toBeCalledWith(messageDto, 1);
      
      expect(createErr).toBeInstanceOf(Error);
      expect(createErr.message).toEqual('err');

    }, 20000);

  });
  
});
