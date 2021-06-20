"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
const sample_room_dto_1 = require("../../../test/fixtures/chat/sample_room.dto");
const common_1 = require("@nestjs/common");
const message_entity_1 = require("./message.entity");
const sample_message_dto_1 = require("../../../test/fixtures/chat/sample_message.dto");
const client_entity_1 = require("../client/client.entity");
const room_entity_1 = require("../room/room.entity");
const sample_message_entities_1 = require("../../../test/fixtures/chat/sample_message.entities");
const room_client_entity_1 = require("../room_client/room_client.entity");
jest.setTimeout(90000);
describe("message.entity.spec.ts", () => {
    let messageRepository;
    let clientRepository;
    let roomRepository;
    let roomClientRepository;
    let testUtils;
    beforeAll(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [database_service_1.DatabaseService, test_utils_1.TestUtils]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        messageRepository = testUtils.databaseService.connection.getRepository(message_entity_1.Message);
        clientRepository = testUtils.databaseService.connection.getRepository(client_entity_1.Client);
        roomRepository = testUtils.databaseService.connection.getRepository(room_entity_1.Room);
        roomClientRepository = testUtils.databaseService.connection.getRepository(message_entity_1.Message);
        done();
    }, 200000);
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<m.e.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] Variables", () => {
        it("[1] messageRepository", async (done) => {
            expect(messageRepository).toBeDefined();
            expect(messageRepository).toBeInstanceOf(typeorm_1.Repository);
            const nMessage = new message_entity_1.Message();
            expect(nMessage).toBeDefined();
            done();
        }, 200000);
        it("[2] clientRepository", async (done) => {
            expect(clientRepository).toBeDefined();
            expect(clientRepository).toBeInstanceOf(typeorm_1.Repository);
            const nClient = new client_entity_1.Client();
            expect(nClient).toBeDefined();
            done();
        }, 200000);
        it("[3] roomRepository", async (done) => {
            expect(roomRepository).toBeDefined();
            expect(roomRepository).toBeInstanceOf(typeorm_1.Repository);
            const nRoom = new room_entity_1.Room();
            expect(nRoom).toBeDefined();
            done();
        }, 200000);
        it("[4] roomClientRepository", async (done) => {
            expect(roomClientRepository).toBeDefined();
            expect(roomClientRepository).toBeInstanceOf(typeorm_1.Repository);
            const nRoomClient = new room_client_entity_1.RoomClient();
            expect(nRoomClient).toBeDefined();
            done();
        }, 200000);
    });
    describe("[b] create", () => {
        it("[1] create a sample message [0] sent to client sepetatly", async (done) => {
            const gClients = [];
            const numbClinet = 2;
            for (const sClientDto of sample_client_dto_1.SampleClientDtos.slice(0, numbClinet)) {
                const nClient = client_entity_1.Client.of(sClientDto);
                const gClient = await clientRepository.save(nClient);
                gClients.push(gClient);
            }
            expect(gClients.length).toEqual(numbClinet);
            const sMessage = sample_message_dto_1.SampleMessageDtos[0];
            expect(sMessage).toBeDefined();
            expect(sMessage.text).toEqual("first message");
            const nMessage = message_entity_1.Message.of(sMessage, gClients[0].client_id);
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.save(nMessage);
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(gMessage).toBeDefined();
            expect(gMessage.message_id).toEqual(1);
            expect(gMessage.text).toEqual(sMessage.text);
            done();
        }, 200000);
        it("[2] create a sample message [1] for room sepetatly", async (done) => {
            const gClients = [];
            const countOfClient = 1;
            for (const sClientDto of sample_client_dto_1.SampleClientDtos.slice(0, countOfClient)) {
                const nClient = client_entity_1.Client.of(sClientDto);
                const gClient = await clientRepository.save(nClient);
                gClients.push(gClient);
            }
            expect(gClients.length).toEqual(countOfClient);
            const gRooms = [];
            const countOfRoom = 1;
            for (const sRoomDto of sample_room_dto_1.SampleRoomDtos.slice(0, countOfRoom)) {
                const nRoom = room_entity_1.Room.of(sRoomDto);
                const gRoom = await roomRepository.save(nRoom);
                gRooms.push(gRoom);
            }
            expect(gRooms.length).toEqual(countOfRoom);
            const sMessage = sample_message_dto_1.SampleMessageDtos[1];
            const nMessage = message_entity_1.Message.of(sMessage, gClients[0].client_id);
            const gMessage = await messageRepository.save(nMessage);
            const fMessage = await messageRepository.findOne({ message_id: 1 });
            expect(fMessage).toBeInstanceOf(message_entity_1.Message);
            expect(fMessage.message_id).toEqual(1);
            expect(fMessage.text).toEqual(sMessage.text);
            expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
            expect(fMessage.reciver_client_id).toEqual(null);
            expect(fMessage.reciver_room_id).toEqual(1);
            done();
        }, 200000);
        it("[3] create a sample [1] message to room assign entity", async (done) => {
            const gClients = [];
            const countOfClient = 1;
            for (const sClientDto of sample_client_dto_1.SampleClientDtos.slice(0, countOfClient)) {
                const nClient = client_entity_1.Client.of(sClientDto);
                const gClient = await clientRepository.save(nClient);
                gClients.push(gClient);
            }
            expect(gClients[0]).toBeInstanceOf(client_entity_1.Client);
            expect(gClients.length).toEqual(countOfClient);
            const gRooms = [];
            const countOfRoom = 1;
            for (const sRoomDto of sample_room_dto_1.SampleRoomDtos.slice(0, countOfRoom)) {
                const nRoom = room_entity_1.Room.of(sRoomDto);
                const gRoom = await roomRepository.save(nRoom);
                gRooms.push(gRoom);
            }
            expect(gRooms[0]).toBeInstanceOf(room_entity_1.Room);
            expect(gRooms.length).toEqual(countOfRoom);
            const sMessageDto = sample_message_dto_1.SampleMessageDtos[1];
            const nMessage = new message_entity_1.Message();
            Object.assign(nMessage, sMessageDto);
            delete sMessageDto.reciver_room_id;
            nMessage.sender_client = gClients[0];
            nMessage.reciver_room = gRooms[0];
            nMessage.created_at = new Date();
            nMessage.updated_at = new Date();
            const gMessage = await messageRepository.save(nMessage);
            expect(gMessage).toBeDefined();
            expect(gMessage).toBeInstanceOf(message_entity_1.Message);
            expect(gMessage.message_id).toEqual(1);
            expect(gMessage.text).toEqual(sMessageDto.text);
            const fMessage = await messageRepository.findOne({ message_id: 1 });
            expect(fMessage).toBeInstanceOf(message_entity_1.Message);
            expect(fMessage.message_id).toEqual(1);
            expect(fMessage.text).toEqual(sMessageDto.text);
            expect(fMessage.sender_client_id).toEqual(gClients[0].client_id);
            expect(fMessage.reciver_client_id).toEqual(null);
            expect(fMessage.reciver_room_id).toEqual(gRooms[0].room_id);
            done();
        }, 200000);
        it("[4] MessageCreateDto is not complete hence should throw error", async (done) => {
            const sMessage = sample_message_dto_1.SampleMessageDtos[0];
            const nMessage = new message_entity_1.Message();
            Object.assign(nMessage, sMessage);
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.save(nMessage);
            }
            catch (error) {
                msgError = error;
            }
            expect(gMessage).toBeUndefined();
            expect(msgError).toBeDefined();
            expect(msgError).toBeInstanceOf(common_1.BadRequestException);
            expect(msgError.message).toEqual('Validation failed!');
            done();
        }, 20000);
        it("[5] reciver-client is unavailable hence should throw error", async (done) => {
            const gClients = [];
            const numbClinet = 1;
            for (const sClientDto of sample_client_dto_1.SampleClientDtos.slice(0, numbClinet)) {
                const nClient = client_entity_1.Client.of(sClientDto);
                const gClient = await clientRepository.save(nClient);
                gClients.push(gClient);
            }
            expect(gClients.length).toEqual(numbClinet);
            const sMessage = sample_message_dto_1.SampleMessageDtos[0];
            expect(sMessage).toBeDefined();
            expect(sMessage.text).toEqual("first message");
            const nMessage = message_entity_1.Message.of(sMessage, gClients[0].client_id);
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.save(nMessage);
            }
            catch (error) {
                msgError = error;
            }
            expect(msgError).toBeDefined();
            expect(msgError).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(msgError.message).toContain("insert or update on table \"message\" violates foreign key constraint");
            expect(gMessage).toBeUndefined();
            done();
        }, 200000);
        it("[6] sender-client is unavailable hence should throw error", async (done) => {
            const gClients = [];
            const numbClinet = 1;
            for (const sClientDto of sample_client_dto_1.SampleClientDtos.slice(0, numbClinet)) {
                const nClient = client_entity_1.Client.of(sClientDto);
                const gClient = await clientRepository.save(nClient);
                gClients.push(gClient);
            }
            expect(gClients.length).toEqual(numbClinet);
            const sMessage = sample_message_dto_1.SampleMessageDtos[1];
            expect(sMessage).toBeDefined();
            expect(sMessage.text).toEqual("second message");
            const nMessage = message_entity_1.Message.of(sMessage, 2);
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.save(nMessage);
            }
            catch (error) {
                msgError = error;
            }
            expect(msgError).toBeDefined();
            expect(msgError).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(msgError.message).toContain("insert or update on table \"message\" violates foreign key constraint");
            expect(gMessage).toBeUndefined();
            done();
        }, 200000);
    });
    describe("[c] read", () => {
        it("[1] find()", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessages;
            let msgError;
            try {
                fMessages = await messageRepository.find();
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessages).toBeInstanceOf(Array);
            expect(fMessages.length).toEqual(4);
            expect(fMessages[0].text).toEqual(sample_message_entities_1.SampleMessageEntities[0].text);
            done();
        }, 200000);
        it("[2] find(1): no affect", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessages;
            let msgError;
            try {
                fMessages = await messageRepository.find(1);
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessages).toBeInstanceOf(Array);
            expect(fMessages.length).toEqual(4);
            expect(fMessages[0].text).toEqual(sample_message_entities_1.SampleMessageEntities[0].text);
            done();
        }, 200000);
        it("[3] find({message_id}) ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessages;
            let msgError;
            try {
                fMessages = await messageRepository.find({ message_id: 1 });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessages).toBeInstanceOf(Array);
            expect(fMessages.length).toEqual(1);
            expect(fMessages[0].text).toEqual(sample_message_entities_1.SampleMessageEntities[0].text);
            done();
        }, 200000);
        it("[4] findOne({message_id}) ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessages;
            let msgError;
            try {
                fMessages = await messageRepository.findOne({ message_id: 1 });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessages).toBeInstanceOf(message_entity_1.Message);
            expect(fMessages.text).toEqual(sample_message_entities_1.SampleMessageEntities[0].text);
            done();
        }, 200000);
        it("[5] findOne({text}) ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessages;
            let msgError;
            try {
                fMessages = await messageRepository.findOne({ text: 'first message' });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessages).toBeInstanceOf(message_entity_1.Message);
            expect(fMessages.text).toEqual('first message');
            done();
        }, 200000);
    });
});
//# sourceMappingURL=message.entity.spe.js.map