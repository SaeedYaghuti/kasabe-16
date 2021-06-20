"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_client_entity_1 = require("./room_client.entity");
const client_entity_1 = require("../client/client.entity");
const room_entity_1 = require("../room/room.entity");
const sample_room_dto_1 = require("../../../test/fixtures/chat/sample_room.dto");
const common_1 = require("@nestjs/common");
const client_role_enum_1 = require("../client/client_role.enum");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
const room_client_repository_1 = require("./room_client.repository");
jest.setTimeout(90000);
describe("room_client.entity.spec.ts", () => {
    let clientRepository;
    let roomRepository;
    let roomClientRepository;
    let testUtils;
    beforeAll(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        clientRepository = testUtils.databaseService.connection.getRepository(client_entity_1.Client);
        roomRepository = testUtils.databaseService.connection.getRepository(room_entity_1.Room);
        roomClientRepository = testUtils.databaseService.connection.getCustomRepository(room_client_repository_1.RoomClientRepository);
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<rc.e.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] variables", () => {
        it("[1] clientRepository", async (done) => {
            expect(clientRepository).toBeDefined();
            expect(clientRepository).toBeInstanceOf(typeorm_1.Repository);
            const nClient = new client_entity_1.Client();
            expect(nClient).toBeDefined();
            done();
        }, 20000);
        it("[2] roomRepository", async (done) => {
            expect(roomRepository).toBeDefined();
            expect(roomRepository).toBeInstanceOf(typeorm_1.Repository);
            const nRoom = new room_entity_1.Room();
            expect(nRoom).toBeDefined();
            done();
        }, 20000);
        it("[3] roomClientRepository", async (done) => {
            expect(roomClientRepository).toBeDefined();
            expect(roomClientRepository).toBeInstanceOf(room_client_repository_1.RoomClientRepository);
            const nRoomClient = new room_client_entity_1.RoomClient();
            expect(nRoomClient).toBeDefined();
            done();
        }, 20000);
    });
    describe("[b] room_clientCreate()", () => {
        it("[1] create a room_client seperately", async (done) => {
            const nClient = client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]);
            let gClient;
            try {
                gClient = await clientRepository.save(nClient);
            }
            catch (error) {
                console.error("<<b|1|client>> error: ", error);
                expect(error).toBeUndefined();
            }
            expect(gClient).toBeInstanceOf(client_entity_1.Client);
            const nRoom = room_entity_1.Room.of(sample_room_dto_1.SampleRoomDtos[0]);
            let gRoom;
            try {
                gRoom = await roomRepository.save(nRoom);
            }
            catch (error) {
                console.error("<<b|1|room>> error: ", error);
                expect(error).toBeUndefined();
            }
            expect(gRoom).toBeInstanceOf(room_entity_1.Room);
            const roomClientDto = {
                room_id: gRoom.room_id,
                client_id: gClient.client_id,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                saveError = error;
            }
            expect(saveError).toBeUndefined();
            expect(gRoomClient).toBeDefined();
            expect(gRoomClient.room_client_id).toEqual(1);
            expect(gRoomClient.room_id).toEqual(gRoom.room_id);
            expect(gRoomClient.client_id).toEqual(gClient.client_id);
            expect(gRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            done();
        }, 2000000);
        it("[2] client_id is invalid hence should throw error", async (done) => {
            const nRoom = room_entity_1.Room.of(sample_room_dto_1.SampleRoomDtos[0]);
            let gRoom;
            let roomError;
            try {
                gRoom = await nRoom.save();
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeUndefined();
            expect(gRoom).toBeInstanceOf(room_entity_1.Room);
            const roomClientDto = {
                room_id: gRoom.room_id,
                client_id: 1,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
            }
            catch (error) {
                saveError = error;
            }
            expect(saveError).toBeDefined();
            expect(saveError).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(saveError.message).toContain('insert or update on table \"room_client\" violates foreign key constraint');
            done();
        }, 2000000);
        it("[3] room_id is invalid hence hence should throw error", async (done) => {
            const nClient = client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]);
            let gClient;
            let clientError;
            try {
                gClient = await nClient.save();
            }
            catch (error) {
                console.log('gClient error:', error);
                clientError = error;
            }
            expect(clientError).toBeUndefined();
            expect(gClient).toBeInstanceOf(client_entity_1.Client);
            const roomClientDto = {
                room_id: 1,
                client_id: gClient.client_id,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.room_clientCreate(roomClientDto);
            }
            catch (error) {
                saveError = error;
            }
            expect(saveError).toBeDefined();
            expect(saveError).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(saveError.message).toContain('insert or update on table \"room_client\" violates foreign key constraint');
            done();
        }, 2000000);
    });
    describe("[c] roomClientCreateCascade()", () => {
        it("[1] create a room_client by entity", async (done) => {
            const nClient = client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]);
            const nRoom = room_entity_1.Room.of(sample_room_dto_1.SampleRoomDtos[0]);
            const roomClientDto = {
                room: nRoom,
                client: nClient,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
            }
            catch (error) {
                console.log('<<c1>> error: ', error);
                saveError = error;
            }
            expect(saveError).toBeUndefined();
            expect(gRoomClient).toBeDefined();
            expect(gRoomClient.client).toBeDefined();
            expect(gRoomClient.room).toBeDefined();
            expect(gRoomClient.room_client_id).toEqual(1);
            expect(gRoomClient.room_id).toEqual(1);
            expect(gRoomClient.client_id).toEqual(1);
            expect(gRoomClient.room.room_id).toEqual(1);
            expect(gRoomClient.client.client_id).toEqual(1);
            expect(gRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            expect(gRoomClient.client.client_fname).toEqual("saeid");
            expect(gRoomClient.room.title).toEqual("All Hassan");
            done();
        }, 2000000);
        it("[2] client_fname is Empty hence should throw error", async (done) => {
            const nClient = client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]);
            delete nClient.client_fname;
            const nRoom = room_entity_1.Room.of(sample_room_dto_1.SampleRoomDtos[0]);
            const roomClientDto = {
                room: nRoom,
                client: nClient,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
            }
            catch (error) {
                saveError = error;
            }
            expect(saveError).toBeDefined();
            expect(saveError).toBeInstanceOf(common_1.BadRequestException);
            expect(saveError.message).toEqual('Validation failed!');
            done();
        }, 2000000);
        it("[3] title of room is Empty hence should throw error", async (done) => {
            const nClient = client_entity_1.Client.of(sample_client_dto_1.SampleClientDtos[0]);
            const nRoom = room_entity_1.Room.of(sample_room_dto_1.SampleRoomDtos[0]);
            delete nRoom.title;
            const roomClientDto = {
                room: nRoom,
                client: nClient,
                client_role: client_role_enum_1.ClientRole.ADMIN,
            };
            let gRoomClient;
            let saveError;
            try {
                gRoomClient = await roomClientRepository.roomClientCreateCascade(roomClientDto);
            }
            catch (error) {
                saveError = error;
            }
            expect(saveError).toBeDefined();
            expect(saveError).toBeInstanceOf(common_1.BadRequestException);
            expect(saveError.message).toEqual('Validation failed!');
            done();
        }, 2000000);
    });
    describe("[d] room_clientUpdate()", () => {
        it("[1] change role_type to READER ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            const updateDto = {
                room_client_id: 1,
                client_role: client_role_enum_1.ClientRole.READER,
            };
            let uRoomClient;
            let uError;
            try {
                uRoomClient = await roomClientRepository.room_clientUpdate(updateDto);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(uRoomClient).toBeDefined();
            expect(uRoomClient.room_client_id).toEqual(1);
            expect(uRoomClient.room_id).toEqual(1);
            expect(uRoomClient.client_id).toEqual(1);
            expect(uRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.READER);
            done();
        }, 2000000);
        it("[2] client_id is invalid hence should throw error ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            const updateDto = {
                room_client_id: 10,
                client_role: client_role_enum_1.ClientRole.READER,
            };
            let uRoomClient;
            let uError;
            try {
                uRoomClient = await roomClientRepository.room_clientUpdate(updateDto);
            }
            catch (error) {
                uError = error;
            }
            expect(uRoomClient).toBeUndefined();
            expect(uError).toBeDefined();
            done();
        }, 2000000);
    });
    describe("[e] clientsGetByRoomId()", () => {
        it("[1] should return 1, 2, 3 ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let uError;
            try {
                fClients = await roomClientRepository.clientsGetByRoomId(1);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(3);
            expect(fClients[0].client_fname).toEqual("saeid");
            expect(fClients[1].client_fname).toEqual("hamid");
            expect(fClients[2].client_fname).toEqual("asity");
            done();
        }, 2000000);
        it("[2] invalid room_client id hence should return Empty [] ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let uError;
            try {
                fClients = await roomClientRepository.clientsGetByRoomId(10);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(0);
            done();
        }, 2000000);
    });
    describe("[f] room_clientsGetByClientId()", () => {
        it("[1] should return client_room 1, 2 ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let uError;
            try {
                fClients = await roomClientRepository.room_clientsGetByClientId(2);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(2);
            expect(fClients[0].client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            expect(fClients[1].client_role).toEqual(client_role_enum_1.ClientRole.READER);
            done();
        }, 2000000);
        it("[2] invalid client_id hence should return Empty [] ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let uError;
            try {
                fClients = await roomClientRepository.room_clientsGetByClientId(10);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(0);
            done();
        }, 2000000);
    });
    describe("[g] clientLeftRoom()", () => {
        it("[1] should left client_id 2 from room_id 1 ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s d1>> loadAllSamples error: ', error);
            }
            let deleleteRes;
            let dError;
            try {
                deleleteRes = await roomClientRepository.clientLeftRoom(2, 1);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                dError = error;
            }
            expect(dError).toBeUndefined();
            expect(deleleteRes).toBeDefined();
            expect(deleleteRes.affected).toEqual(1);
            let fClients;
            let uError;
            try {
                fClients = await roomClientRepository.room_clientsGetByClientId(2);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                uError = error;
            }
            expect(uError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(1);
            expect(fClients[0].client_id).toEqual(2);
            done();
        }, 2000000);
        it("[2] client_id is invalide hence should throw error ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
            }
            let deleleteRes;
            let dError;
            try {
                deleleteRes = await roomClientRepository.clientLeftRoom(10, 1);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                dError = error;
            }
            expect(dError).toBeUndefined();
            expect(deleleteRes).toBeDefined();
            expect(deleleteRes.affected).toEqual(0);
            done();
        }, 2000000);
    });
    describe("[h] room_clientGetById()", () => {
        it("[1] should return room_client by id ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s h1>> loadAllSamples error: ', error);
            }
            let fRC;
            let fError;
            try {
                fRC = await roomClientRepository.room_clientGetById(1);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                fError = error;
            }
            expect(fError).toBeUndefined();
            expect(fRC).toBeDefined();
            expect(fRC.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            done();
        }, 2000000);
        it("[2] invalid room_client id hence should return ? ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<rc.r.s h1>> loadAllSamples error: ', error);
            }
            let fRC;
            let fError;
            try {
                fRC = await roomClientRepository.room_clientGetById(10);
                console.log('<<rc.r.s>> deleleteRes: ', fRC);
            }
            catch (error) {
                console.log('<<rc.r.s>> error: ', error);
                fError = error;
            }
            expect(fError).toBeUndefined();
            expect(fRC).toBeUndefined();
            done();
        }, 2000000);
    });
});
//# sourceMappingURL=room_client.repository.spe.js.map