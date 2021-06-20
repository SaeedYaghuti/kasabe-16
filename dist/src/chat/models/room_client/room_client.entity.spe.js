"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_client_entity_1 = require("./room_client.entity");
const sample_room_client_dto_1 = require("../../../test/fixtures/chat/sample_room_client.dto");
const client_entity_1 = require("../client/client.entity");
const room_entity_1 = require("../room/room.entity");
const sample_room_dto_1 = require("../../../test/fixtures/chat/sample_room.dto");
const common_1 = require("@nestjs/common");
const client_role_enum_1 = require("../client/client_role.enum");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
jest.setTimeout(90000);
describe("room_client.entity.spec.ts", () => {
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
        clientRepository = testUtils.databaseService.connection.getRepository(client_entity_1.Client);
        roomRepository = testUtils.databaseService.connection.getRepository(room_entity_1.Room);
        roomClientRepository = testUtils.databaseService.connection.getRepository(room_client_entity_1.RoomClient);
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
            const nClient = new client_entity_1.Client();
            expect(nClient).toBeDefined();
            done();
        }, 20000);
        it("[2]  roomRepository", async (done) => {
            expect(roomRepository).toBeDefined();
            const nRoom = new room_entity_1.Room();
            expect(nRoom).toBeDefined();
            done();
        }, 20000);
        it("[3] roomClientRepository", async (done) => {
            expect(roomClientRepository).toBeDefined();
            const nRoomClient = new room_client_entity_1.RoomClient();
            expect(nRoomClient).toBeDefined();
            done();
        }, 20000);
    });
    describe("[b] create", () => {
        it("[1] should insert CASCADE", async (done) => {
            const sClient = sample_client_dto_1.SampleClientDtos[0];
            const nClient = client_entity_1.Client.of(sClient);
            const roomSampleDto = sample_room_dto_1.SampleRoomDtos[0];
            const nRoom = room_entity_1.Room.of(roomSampleDto);
            const nRoomClient = new room_client_entity_1.RoomClient();
            nRoomClient.room = nRoom;
            nRoomClient.client = nClient;
            nRoomClient.client_role = client_role_enum_1.ClientRole.ADMIN;
            const gRoomClient = await roomClientRepository.save(nRoomClient);
            expect(gRoomClient).toBeDefined();
            expect(gRoomClient.client).toBeDefined();
            expect(gRoomClient.room).toBeDefined();
            expect(gRoomClient.room_client_id).toEqual(1);
            expect(gRoomClient.room.room_id).toEqual(1);
            expect(gRoomClient.client.client_id).toEqual(1);
            expect(gRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            expect(gRoomClient.client.client_fname).toEqual("saeid");
            expect(gRoomClient.room.title).toEqual("All Hassan");
            done();
        }, 2000000);
        it("[2] should create a sample roomClient seperately", async (done) => {
            const checkEmptiness = await client_entity_1.Client.find();
            expect(checkEmptiness).toEqual([]);
            let gClients = [];
            for (const sClientDto of sample_client_dto_1.SampleClientDtos) {
                const nClient = client_entity_1.Client.of(sClientDto);
                try {
                    const gClient = await clientRepository.save(nClient);
                    gClients.push(gClient);
                }
                catch (error) {
                    console.error("<<b|1|client>> error: ", error);
                    expect(error).toBeUndefined();
                }
            }
            expect(gClients.length).toEqual(sample_client_dto_1.SampleClientDtos.length);
            const gRooms = [];
            for (const sRoomDto of sample_room_dto_1.SampleRoomDtos) {
                const nRoom = room_entity_1.Room.of(sRoomDto);
                try {
                    const gRoom = await roomRepository.save(nRoom);
                    gRooms.push(gRoom);
                }
                catch (error) {
                    console.error("<<b|1|room>> error: ", error);
                    expect(error).toBeUndefined();
                }
            }
            expect(gRooms.length).toEqual(sample_room_dto_1.SampleRoomDtos.length);
            let nRoomClients = [];
            for (const sRoomClientDto of sample_room_client_dto_1.SampleRoomClientDtos) {
                const nRC = room_client_entity_1.RoomClient.of(sRoomClientDto);
                nRoomClients.push(nRC);
            }
            console.assert(nRoomClients.length === 6, '<<b|1|nrc>> nRoomClients: ', nRoomClients);
            expect(nRoomClients.length).toEqual(6);
            const gRoomClients = [];
            for (const nRC of nRoomClients) {
                try {
                    const gRC = await roomClientRepository.save(nRC);
                    gRoomClients.push(gRC);
                }
                catch (error) {
                    console.error("<<b|1|room-client>> error: ", error);
                    expect(error).toBeUndefined();
                }
            }
            let roomClientCount = 0;
            sample_room_client_dto_1.SampleRoomClientDtos.forEach(dto => roomClientCount++);
            console.assert(gRoomClients.length === roomClientCount, "<<b|1|grc>> gRoomClients: ", gRoomClients);
            expect(gRoomClients.length).toEqual(roomClientCount);
            done();
        }, 200000);
        it("[3] client_role is empty hence should throw error ", async (done) => {
            const nRoomClient = new room_client_entity_1.RoomClient();
            nRoomClient.room_id = 1;
            nRoomClient.client_id = 1;
            let gRoomClient;
            let error;
            try {
                gRoomClient = await roomClientRepository.save(nRoomClient);
            }
            catch (err) {
                error = err;
            }
            expect(gRoomClient).toBeUndefined();
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(common_1.BadRequestException);
            expect(error.message).toEqual('Validation failed!');
            done();
        }, 200000);
        it("[4] room and client are not defind hence should throw error", async (done) => {
            const nRoomClient = new room_client_entity_1.RoomClient();
            nRoomClient.room_id = 1;
            nRoomClient.client_id = 1;
            nRoomClient.client_role = client_role_enum_1.ClientRole.ADMIN;
            let gRoomClient;
            let error;
            try {
                gRoomClient = await roomClientRepository.save(nRoomClient);
            }
            catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(error.message).toContain('insert or update on table "room_client" violates foreign key constraint');
            expect(gRoomClient).toBeUndefined();
            done();
        }, 2000000);
        it("[5] UQ_CLIENT_ROOM hence should throw error", async (done) => {
            await testUtils.reloadAllSamples();
            const fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
            console.assert(fRoomClient, '<<b5>> fRoomClient: ', fRoomClient);
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.room_id).toEqual(1);
            expect(fRoomClient.client_id).toEqual(1);
            expect(fRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            const nRoomClient = new room_client_entity_1.RoomClient();
            nRoomClient.room_id = 1;
            nRoomClient.client_id = 1;
            nRoomClient.client_role = client_role_enum_1.ClientRole.ADMIN;
            let gRoomClient;
            let error;
            try {
                gRoomClient = await roomClientRepository.save(nRoomClient);
            }
            catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error).toBeInstanceOf(typeorm_1.QueryFailedError);
            expect(error.message).toContain('duplicate key value violates unique constraint \"UQ_CLIENT_ROOM\"');
            expect(gRoomClient).toBeUndefined();
            done();
        }, 200000);
    });
    describe("[c] update", () => {
        it("[1] should update a room_client", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<b|5>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.ADMIN);
            fRoomClient.client_role = client_role_enum_1.ClientRole.EDITOR;
            let uRoomClient;
            let errURoomClient;
            try {
                uRoomClient = await roomClientRepository.save(fRoomClient);
            }
            catch (error) {
                console.error("<<b|5>> error: ", error);
                errURoomClient = error;
            }
            expect(errURoomClient).toBeUndefined();
            expect(uRoomClient).toBeDefined();
            expect(uRoomClient.client_role).toEqual(client_role_enum_1.ClientRole.EDITOR);
            done();
        }, 2000000);
    });
    describe("[d] read", () => {
        it("[1] find(): return []", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.find();
            }
            catch (error) {
                console.error("<<d1>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient).toBeInstanceOf(Array);
            expect(fRoomClient.length).toEqual(6);
            done();
        }, 2000000);
        it("[2] find(1): return [];❌ 1 has no effect ", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.find(1);
            }
            catch (error) {
                console.error("<<d2>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient).toBeInstanceOf(Array);
            expect(fRoomClient.length).toEqual(6);
            done();
        }, 2000000);
        it("[3] find({ room_client_id: 1}): return [ {} ];", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.find({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<d3>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient).toBeInstanceOf(Array);
            expect(fRoomClient.length).toEqual(1);
            expect(fRoomClient[0].room_client_id).toEqual(1);
            done();
        }, 2000000);
        it("[4] findOne({ room_client_id: 1}): return {} ;", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<d4>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.room_client_id).toEqual(1);
            done();
        }, 2000000);
        it("[5] findOne(): return {} ;", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.findOne();
            }
            catch (error) {
                console.error("<<d5>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.room_client_id).toEqual(1);
            done();
        }, 2000000);
    });
    describe("[e] delete", () => {
        it("[1] delete()", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<e1>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.room_client_id).toEqual(1);
            let deleteRes;
            let errDeleteRoomClient;
            try {
                deleteRes = await roomClientRepository.delete(fRoomClient);
            }
            catch (error) {
                console.error("<<e1>> error: ", error);
                errDeleteRoomClient = error;
            }
            expect(errDeleteRoomClient).toBeUndefined();
            expect(deleteRes).toBeDefined();
            expect(deleteRes.affected).toEqual(1);
            let fRoomClient3;
            let err3;
            try {
                fRoomClient3 = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<e1>> error: ", error);
                err3 = error;
            }
            expect(err3).toBeUndefined();
            expect(fRoomClient3).toBeUndefined();
            done();
        }, 2000000);
        it("[2] remove(): return RoomClient", async (done) => {
            await testUtils.reloadAllSamples();
            let fRoomClient;
            let errRoomClient;
            try {
                fRoomClient = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<e2>> error: ", error);
                errRoomClient = error;
            }
            expect(errRoomClient).toBeUndefined();
            expect(fRoomClient).toBeDefined();
            expect(fRoomClient.room_client_id).toEqual(1);
            let removeRes;
            let errDeleteRoomClient;
            try {
                removeRes = await roomClientRepository.remove(fRoomClient);
            }
            catch (error) {
                console.error("<<e2>> error: ", error);
                errDeleteRoomClient = error;
            }
            expect(errDeleteRoomClient).toBeUndefined();
            expect(removeRes).toBeDefined();
            expect(removeRes).toBeInstanceOf(room_client_entity_1.RoomClient);
            expect(removeRes.room_client_id).toEqual(undefined);
            expect(removeRes.room_id).toEqual(1);
            expect(removeRes.client_id).toEqual(1);
            let fRoomClient3;
            let err3;
            try {
                fRoomClient3 = await roomClientRepository.findOne({ room_client_id: 1 });
            }
            catch (error) {
                console.error("<<e2>> error: ", error);
                err3 = error;
            }
            expect(err3).toBeUndefined();
            expect(fRoomClient3).toBeUndefined();
            done();
        }, 2000000);
    });
});
//# sourceMappingURL=room_client.entity.spe.js.map