"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_repository_1 = require("../room/room.repository");
const message_repository_1 = require("./message.repository");
const sample_message_dto_1 = require("../../../test/fixtures/chat/sample_message.dto");
const room_client_repository_1 = require("../room_client/room_client.repository");
const client_repository_1 = require("../client/client.repository");
const client_entity_1 = require("../client/client.entity");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
const message_entity_1 = require("./message.entity");
const sample_message_entities_1 = require("../../../test/fixtures/chat/sample_message.entities");
jest.setTimeout(90000);
describe("message.repository.spec.ts", () => {
    let messageRepository;
    let clientRepository;
    let testUtils;
    beforeEach(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                message_repository_1.MessageRepository,
                room_repository_1.RoomRepository,
                room_client_repository_1.RoomClientRepository,
                client_repository_1.ClientRepository,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        try {
            messageRepository = testUtils.databaseService.connection.getCustomRepository(message_repository_1.MessageRepository);
        }
        catch (error) {
            console.error('<<m.r.s |1>> error: ', error);
        }
        try {
            clientRepository = testUtils.databaseService.connection.getCustomRepository(client_repository_1.ClientRepository);
        }
        catch (error) {
            console.error('<<m.r.s |2>> error: ', error);
        }
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<m.r.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterEach(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] Variables()", () => {
        it("[1] testUtils", async (done) => {
            expect(testUtils).toBeDefined();
            done();
        }, 20000);
        it("[2] messageRepository", async (done) => {
            expect(messageRepository).toBeDefined();
            expect(messageRepository).toBeInstanceOf(message_repository_1.MessageRepository);
            done();
        }, 20000);
    });
    describe("[b] messageCreate()", () => {
        it("[1] messageCreate(0) should create new Message", async (done) => {
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
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.messageCreate(sMessage, 1);
            }
            catch (error) {
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(gMessage).toBeDefined();
            expect(gMessage.message_id).toEqual(1);
            expect(gMessage.text).toEqual(sMessage.text);
            expect(gMessage.sender_client_id).toEqual(1);
            expect(gMessage.reciver_client_id).toEqual(sMessage.reciver_client_id);
            done();
        }, 20000);
        it("[2] reciver-client is unavailable hence should throw error", async (done) => {
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
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.messageCreate(sMessage, gClients[0].client_id);
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
        it("[3] sender-client is unavailable hence should throw error", async (done) => {
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
            let gMessage;
            let msgError;
            try {
                gMessage = await messageRepository.messageCreate(sMessage, 10);
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
    describe("[c] messageGetById()", () => {
        it("[1] messageGetById(1) should return a message", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessage;
            let msgError;
            try {
                fMessage = await messageRepository.messageGetById(1);
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessage).toBeInstanceOf(message_entity_1.Message);
            expect(fMessage.sender_client_id).toEqual(sample_message_entities_1.SampleMessageEntities[0].sender_client_id);
            expect(fMessage.reciver_client_id).toEqual(sample_message_entities_1.SampleMessageEntities[0].reciver_client_id);
            done();
        }, 200000);
        it("[2] messageGetById(10) should return undefined", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fMessage;
            let msgError;
            try {
                fMessage = await messageRepository.messageGetById(10);
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error while create new message: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fMessage).toBeUndefined();
            done();
        }, 200000);
    });
});
//# sourceMappingURL=message.repository.spe.js.map