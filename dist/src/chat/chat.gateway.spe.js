"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_service_1 = require("./chat.service");
const chat_gateway_1 = require("./chat.gateway");
const client_repository_1 = require("./models/client/client.repository");
const room_repository_1 = require("./models/room/room.repository");
const room_client_repository_1 = require("./models/room_client/room_client.repository");
const message_entity_1 = require("./models/message/message.entity");
const messag_recipiant_enum_1 = require("./models/message/messag_recipiant.enum");
const socket_state_service_1 = require("../realtime/socket-state/socket-state.service");
const redis_propagator_service_1 = require("../realtime/redis-propagator/redis-propagator.service");
const redis_service_1 = require("../realtime/redis/redis.service");
const realtime_module_1 = require("../realtime/realtime.module");
const socket_state_adapter_1 = require("../realtime/socket-state/socket-state.adapter");
const io = __importStar(require("socket.io-client"));
const database_module_1 = require("../database/database.module");
const database_service_1 = require("../database/database.service");
const test_utils_1 = require("../test/test.utils");
const client_entity_1 = require("./models/client/client.entity");
const sample_client_dto_1 = require("../test/fixtures/chat/sample_client.dto");
jest.setTimeout(90000);
class ChatServiceFake {
    async messageCreate() { }
    async messageGetById() { }
    async clientCreate() { }
    async clientUpdate() { }
    async clientGetById() { }
    async clientsGetByRoomId() { }
    async roomUpdate() { }
    async roomGetById() { }
    async roomsGetByClientId() { }
    async room_clientUpdate() { }
    async room_clientGetById() { }
    async room_clientsGetByClientId() { }
}
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
describe('chat.gateway.spec.ts', () => {
    let app;
    let chatService;
    let chatGateway;
    let messageRepository;
    let testUtils;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [realtime_module_1.RealtimeModule, database_module_1.DatabaseModule],
            providers: [
                chat_gateway_1.ChatGateway,
                socket_state_service_1.SocketStateService,
                redis_propagator_service_1.RedisPropagatorService,
                redis_service_1.RedisService,
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                {
                    provide: chat_service_1.ChatService,
                    useClass: ChatServiceFake,
                },
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
            ]
        })
            .compile();
        app = module.createNestApplication();
        const socketStateService = app.get(socket_state_service_1.SocketStateService);
        app.useWebSocketAdapter(new socket_state_adapter_1.SocketStateAdapter(app, socketStateService));
        await app.init();
        await app.listen(3000);
        chatService = app.get(chat_service_1.ChatService);
        chatGateway = app.get(chat_gateway_1.ChatGateway);
        testUtils = module.get(test_utils_1.TestUtils);
    });
    afterEach(async (done) => {
        app.close();
        done();
    });
    describe('[a] variables', () => {
        it('[1] chatService should be defined', async (done) => {
            expect(chatService).toBeDefined();
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
    describe('[b] chatToServer', () => {
        it('[1] should transfer message from front-end to server and return RESULT', async (done) => {
            const client1 = io.connect('http://localhost:3000', {
                query: {
                    token: 1,
                },
            });
            const feData = {
                reciver_client_id: 1,
                text: 'first message',
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 2,
                text: 'a text',
            }, 1);
            const beMessage = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            let chatToServerCbCalled = false;
            client1.emit('chatToServer', feData, (result, error) => {
                chatToServerCbCalled = true;
                expect(chatService_messageCreate_Spy).toBeCalledWith(feData, 1);
                expect(result).toEqual(beMessage);
                expect(error).toBeUndefined();
            });
            client1.on('msgToClient', (rData) => {
                expect(chatToServerCbCalled).toEqual(true);
                expect(rData.message).toEqual('your message delevered to server');
                expect(rData.req).toEqual(feData);
                client1.disconnect();
                done();
            });
        });
        it('[2] should transfer message from front-end to server and return ERROR', async (done) => {
            const client1 = io.connect('http://localhost:3000', {
                query: {
                    token: 1,
                },
            });
            const feData = {
                reciver_client_id: 1,
                text: 'first message',
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 2,
                text: 'a text',
            }, 1);
            const beMessage = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockRejectedValue(new Error('error while saving message at db!'));
            let chatToServerCbCalled = false;
            client1.emit('chatToServer', feData, (result, error) => {
                chatToServerCbCalled = true;
                expect(chatService_messageCreate_Spy).toBeCalledWith(feData, 1);
                expect(result).toEqual(null);
                expect(error).toEqual('error while saving message at db!');
            });
            client1.on('msgToClient', (rData) => {
                expect(chatToServerCbCalled).toEqual(true);
                expect(rData.message).toEqual('your message delevered to server');
                expect(rData.req).toEqual(feData);
                client1.disconnect();
                done();
            });
        });
    });
    describe('[c] chatToOne', () => {
        it('[1] client1 send message to client2', async (done) => {
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
            const cData = {
                reciver_client_id: 2,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 2,
                text: 'a text',
            }, 1);
            const beMessage = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            let chatToServerCbCalled = false;
            client1.emit('chatToOne', cData, (result, error) => {
                chatToServerCbCalled = true;
                expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);
                expect(result).toEqual(beMessage);
                expect(error).toBeUndefined();
                client1.disconnect();
            });
            client2.on('msgToClient', (rData) => {
                expect(chatToServerCbCalled).toEqual(true);
                expect(rData.message).toEqual('your message delevered to server');
                expect(rData.req).toEqual(cData);
                client2.disconnect();
                done();
            });
        });
        it('[2] client1 send invalid message hence cb error ', async (done) => {
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
            const cData = {
                reciver_room_id: 1,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Client,
                reciver_client_id: 2,
                text: 'a text',
            }, 1);
            const beMessage = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            let chatToServerCbCalled = false;
            client1.emit('chatToOne', cData, (result, error) => {
                `error : [
          {
            target: { reciver_room_id: 1, text: 'sample message c1' },
            property: 'reciver_client_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_client_id should not be empty' }
          }
        ]`;
                chatToServerCbCalled = true;
                expect(chatService_messageCreate_Spy).toBeCalledTimes(0);
                expect(result).toEqual(null);
                expect(error).toBeInstanceOf(Array);
                expect(error[0].constraints).toEqual({ isNotEmpty: 'reciver_client_id should not be empty' });
            });
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
                expect(chatToServerCbCalled).toEqual(true);
                expect(rData.req).toEqual(cData);
                client1.disconnect();
                done();
            });
        });
    });
    describe('[d] chatToGroup', () => {
        it('[1] sending message to group1 hence 2, 3 will recive data', async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s c1>> loadAllSamples error: ', error);
            }
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
            const cData = {
                reciver_room_id: 1,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_room_id: 1,
                text: 'message returned by spy',
            }, 1);
            const gMessageUp = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            const clinetSpys = [];
            [1, 2, 3].forEach(i => clinetSpys.push(Object.assign({ client_id: i }, client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]))));
            const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
                .mockResolvedValue(clinetSpys);
            let c1Done = false;
            let c2Done = false;
            let c3Done = false;
            client1.emit('chatToGroup', cData, (result, error) => {
                expect(result).toEqual([1, 2, 3]);
                expect(error).toBeUndefined();
                c1Done = true;
                expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);
            });
            client2.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: 'OAoabrj8j-TGxNFaAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client2.disconnect();
                c2Done = true;
                if (c3Done)
                    done();
            });
            client3.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: 'OAoabrj8j-TGxNFaAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client3.disconnect();
                c3Done = true;
                if (c2Done)
                    done();
            });
        });
        it('[2] validation-error hence should return-back error to c1', async (done) => {
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
            const cData = {
                reciver_client_id: 2,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_room_id: 1,
                text: 'message returned by spy',
            }, 1);
            const gMessageUp = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            const clinetSpys = [];
            [1, 2, 3].forEach(i => clinetSpys.push(Object.assign({ client_id: i }, client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]))));
            const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
                .mockResolvedValue(clinetSpys);
            let c1Done = false;
            let c2Done = false;
            let c3Done = false;
            client1.emit('chatToGroup', cData, (result, error) => {
                `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;
                c1Done = true;
                expect(chatService_messageCreate_Spy).toBeCalledTimes(0);
                expect(result).toEqual(null);
                expect(error).toBeInstanceOf(Array);
                expect(error[0].constraints).toEqual({ isNotEmpty: "reciver_room_id should not be empty" });
                client1.disconnect();
                done();
            });
        });
        it('[3] messageCreate()-error hence send error to c1 and send message to c1, c2', async (done) => {
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
            const cData = {
                reciver_room_id: 1,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_room_id: 1,
                text: 'message returned by spy',
            }, 1);
            const gMessageUp = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockRejectedValue('error while saving message');
            const clinetSpys = [];
            [1, 2, 3].forEach(i => clinetSpys.push(Object.assign({ client_id: i }, client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]))));
            const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
                .mockResolvedValue(clinetSpys);
            let c1Done = false;
            let c2Done = false;
            let c3Done = false;
            client1.emit('chatToGroup', cData, (result, error) => {
                `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;
                c1Done = true;
                expect(chatService_messageCreate_Spy).toBeCalledTimes(1);
                expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);
                expect(result).toEqual(null);
                expect(error).toEqual('error while saving message');
                client1.disconnect();
            });
            client2.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client2.disconnect();
                c2Done = true;
                if (c3Done)
                    done();
            });
            client3.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client3.disconnect();
                c3Done = true;
                if (c2Done)
                    done();
            });
        });
        it('[4] clientsGetByRoomId()-error hence send error to c1', async (done) => {
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
            const cData = {
                reciver_room_id: 1,
                text: "sample message c1",
            };
            const gMessage = message_entity_1.Message.of({
                to: messag_recipiant_enum_1.MessageRecipiant.Room,
                reciver_room_id: 1,
                text: 'message returned by spy',
            }, 1);
            const gMessageUp = Object.assign(Object.assign({}, gMessage), { created_at: gMessage.created_at.toISOString(), updated_at: gMessage.updated_at.toISOString() });
            const chatService_messageCreate_Spy = jest.spyOn(chatService, 'messageCreate')
                .mockResolvedValue(gMessage);
            const clinetSpys = [];
            [1, 2, 3].forEach(i => clinetSpys.push(Object.assign({ client_id: i }, client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]))));
            const chatService_clientsGetByRoomId_Spy = jest.spyOn(chatService, 'clientsGetByRoomId')
                .mockRejectedValue('error while getting clients have joined in group');
            let c1Done = false;
            let c2Done = false;
            let c3Done = false;
            client1.emit('chatToGroup', cData, (result, error) => {
                `error : [
          {
            target: { reciver_client_id: 2, text: 'sample message c1' },
            property: 'reciver_room_id',
            children: [],
            constraints: { isNotEmpty: 'reciver_room_id should not be empty' }
          }
        ]`;
                c1Done = true;
                expect(chatService_messageCreate_Spy).toBeCalledTimes(1);
                expect(chatService_messageCreate_Spy).toBeCalledWith(cData, 1);
                expect(chatService_clientsGetByRoomId_Spy).toBeCalledTimes(1);
                expect(chatService_clientsGetByRoomId_Spy).toBeCalledWith(cData.reciver_room_id);
                expect(result).toEqual(null);
                expect(error).toEqual('error while getting clients have joined in group');
                client1.disconnect();
                done();
            });
            client2.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client2.disconnect();
                c2Done = true;
                if (c3Done)
                    done();
            });
            client3.on('msgToClient', (rData) => {
                `rData: {
          sender: { authid: 1, socketid: '7uyV6AKdvI3t7TRfAAAA' },
          reciver: { authid: 1, socketid: '_' },
          message: { reciver_room_id: 1, text: 'sample message c1' }
        }`;
                expect(c1Done).toEqual(true);
                expect(rData.message).toEqual(cData);
                client3.disconnect();
                c3Done = true;
                if (c2Done)
                    done();
            });
        });
    });
    describe('[e] emitClientStatus and watchClientStatus', () => {
        it('[1] client1 emit its status and get cb', async (done) => {
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
            };
            client1.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
                expect(result).toEqual(`Your status: ${emitClientStatusDto.status}...`);
                expect(error).toBeUndefined();
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
        it('[2] client1 watchClientStatus of client2', async (done) => {
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
            const client1WatchDto = {
                followed_client_ids: [2, 3],
                emitted_at: new Date().getTime(),
            };
            client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
                expect(result).toEqual(`You will be notified about your folowers client`);
                expect(error).toBeUndefined();
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
        it('[3] client1 watchStatus and client2 emitStatus', async (done) => {
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
            client1.on('msgToClient', (rData) => {
                client1.disconnect();
                done();
            });
            const client1WatchDto = {
                followed_client_ids: [2, 3],
                emitted_at: new Date().getTime(),
            };
            client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
                expect(result).toEqual(`You will be notified about your folowers client`);
                expect(error).toBeUndefined();
                c1Done = true;
            });
            const emitClientStatusDto = {
                status: 'ISONLINE',
                emitted_at: new Date().getTime(),
            };
            client2.emit('emitClientStatus', emitClientStatusDto, (result, error) => {
                expect(result).toEqual(`Your status: ${emitClientStatusDto.status}...`);
                expect(error).toBeUndefined();
                c1Done = true;
                client2.disconnect();
            });
        });
        it('[4] emit client status with invalid arg hence throw error', async (done) => {
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
            };
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
                expect(result).toEqual(null);
                expect(error).toBeDefined();
                expect(error[0].constraints).toEqual({ isEnum: 'status must be a valid enum value' });
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
        it('[5] emit watch-client-status with invalid arg hence throw error', async (done) => {
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
            const client1WatchDto = {
                followed_client_ids: ["2", "3"],
                emitted_at: new Date().getTime(),
            };
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
                expect(result).toEqual(null);
                expect(error[0].constraints).toEqual({
                    isInt: 'each value in followed_client_ids must be an integer number'
                });
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
        it('[6] emit watch-client-status with invalid TIME (less than 2s ago) hence throw error', async (done) => {
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
            const client1WatchDto = {
                followed_client_ids: [2, 3],
                emitted_at: new Date().getTime() - 2500,
            };
            client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
                `error: Invalid Timstamp or too past: vData.emitted_at: 1601793518501`;
                expect(result).toEqual(null);
                expect(error).toEqual(`Invalid Timstamp or too past: vData.emitted_at: ${client1WatchDto.emitted_at}`);
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
        it('[7] emit watch-client-status with invalid TIME (at future) hence throw error', async (done) => {
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
            const client1WatchDto = {
                followed_client_ids: [2, 3],
                emitted_at: new Date().getTime() + 1000,
            };
            client1.emit('watchClientStatus', client1WatchDto, (result, error) => {
                `error: Invalid Timstamp or too past: vData.emitted_at: 1601793518501`;
                expect(result).toEqual(null);
                expect(error).toEqual(`Invalid Timstamp or too past: vData.emitted_at: ${client1WatchDto.emitted_at}`);
                c1Done = true;
                client1.disconnect();
                done();
            });
        });
    });
});
//# sourceMappingURL=chat.gateway.spe.js.map