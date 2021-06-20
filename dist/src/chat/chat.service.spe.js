"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_service_1 = require("./chat.service");
const faker_1 = __importDefault(require("faker"));
const message_repository_1 = require("./models/message/message.repository");
const client_repository_1 = require("./models/client/client.repository");
const room_repository_1 = require("./models/room/room.repository");
const room_client_repository_1 = require("./models/room_client/room_client.repository");
const message_entity_1 = require("./models/message/message.entity");
const messag_recipiant_enum_1 = require("./models/message/messag_recipiant.enum");
class ClientRepositoryFake {
    async clientCreate() { }
    async clientUpdate() { }
    async clientGetById() { }
    async clientsGetByRoomId() { }
}
class MessageRepositoryFake {
    async messageCreate() { }
    async messageGetById() { }
}
class RoomClientRepositoryFake {
    async room_clientCreate() { }
    async room_clientCreateSample() { }
    async room_clientUpdate() { }
    async clientsGetByRoomId() { }
    async room_clientsGetByClientId() { }
    async clientLeftRoom() { }
    async room_clientGetById() { }
}
class RoomRepositoryFake {
    async roomCreate() { }
    async roomCreateSample() { }
    async roomUpdate() { }
    async roomGetById() { }
    async clientsGetByRoomId() { }
    async roomsGetByClientId() { }
}
describe('ChatService', () => {
    let app;
    let chatService;
    let messageRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [],
            providers: [
                chat_service_1.ChatService,
                {
                    provide: client_repository_1.ClientRepository,
                    useClass: ClientRepositoryFake,
                },
                {
                    provide: room_repository_1.RoomRepository,
                    useClass: RoomRepositoryFake,
                },
                {
                    provide: room_client_repository_1.RoomClientRepository,
                    useClass: RoomClientRepositoryFake,
                },
                {
                    provide: message_repository_1.MessageRepository,
                    useClass: MessageRepositoryFake,
                }
            ]
        })
            .compile();
        app = module.createNestApplication();
        await app.init();
        chatService = app.get(chat_service_1.ChatService);
        messageRepository = app.get(message_repository_1.MessageRepository);
    });
    describe('[a] variables', () => {
        it('[1] messageRepository should be instance of MessageRepositoryFake', async () => {
            expect(messageRepository).toBeDefined();
            expect(messageRepository).toBeInstanceOf(MessageRepositoryFake);
        }, 20000);
        it('[2] chatService should be defined', async (done) => {
            expect(chatService).toBeDefined();
            done();
        }, 20000);
    });
    describe('[b] messageCreate()', () => {
        it('[1] message to client', async () => {
            const messageDto = {
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 1,
                text: faker_1.default.lorem.words(),
            };
            const nMessageClient = message_entity_1.Message.of(messageDto, 1);
            const messageRepositorymessageCreateSpy = jest.spyOn(messageRepository, 'messageCreate')
                .mockResolvedValue(nMessageClient);
            const result = await chatService.messageCreate(messageDto, 1);
            expect(messageRepositorymessageCreateSpy).toBeCalledWith(messageDto, 1);
            expect(result).toEqual(nMessageClient);
        }, 20000);
        it('[2] to ROOM:  should return sample message', async () => {
            const messageDto = {
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_client_id: 1,
                text: faker_1.default.lorem.words(),
            };
            const nMessageRoom = message_entity_1.Message.of(messageDto, 1);
            const messageRepositorymessageCreateSpy = jest.spyOn(messageRepository, 'messageCreate')
                .mockResolvedValue(nMessageRoom);
            const result = await chatService.messageCreate(messageDto, 1);
            expect(messageRepositorymessageCreateSpy).toBeCalledWith(messageDto, 1);
            expect(result).toEqual(nMessageRoom);
        }, 20000);
        it('[3] message to client should throw error', async () => {
            const errorMessage = "insert or update on table \"message\" violates foreign key constraint";
            const messageDto = {
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 1,
                text: faker_1.default.lorem.words(),
            };
            const nMessageClient = message_entity_1.Message.of(messageDto, 1);
            const messageRepositorymessageCreateSpy = jest.spyOn(messageRepository, 'messageCreate')
                .mockImplementation(() => { throw new Error(errorMessage); });
            try {
                const result = await chatService.messageCreate(messageDto, 1);
            }
            catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toEqual(errorMessage);
            }
        }, 20000);
        it('should return ERROR', async () => {
            const messageDto = {
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_client_id: 1,
                text: faker_1.default.lorem.words(),
            };
            const messageRepositorymessageCreateSpy = jest.spyOn(messageRepository, 'messageCreate')
                .mockRejectedValue(new Error('some error happend!'));
            let result;
            let createErr;
            try {
                result = await chatService.messageCreate(messageDto, 1);
            }
            catch (error) {
                createErr = error;
            }
            expect(messageRepositorymessageCreateSpy).toBeCalledWith(messageDto, 1);
            expect(createErr).toBeInstanceOf(Error);
            expect(createErr.message).toEqual('err');
        }, 20000);
    });
});
//# sourceMappingURL=chat.service.spe.js.map