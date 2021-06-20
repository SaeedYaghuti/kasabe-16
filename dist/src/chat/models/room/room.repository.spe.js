"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_repository_1 = require("./room.repository");
const common_1 = require("@nestjs/common");
const room_client_repository_1 = require("../room_client/room_client.repository");
const client_repository_1 = require("../client/client.repository");
const message_repository_1 = require("../message/message.repository");
const room_entity_1 = require("./room.entity");
const sample_room_dto_1 = require("../../../test/fixtures/chat/sample_room.dto");
const room_type_enum_1 = require("./room_type.enum");
const sample_room_entities_1 = require("../../../test/fixtures/chat/sample_room.entities");
const sample_room_client_entities_1 = require("../../../test/fixtures/chat/sample_room_client.entities");
jest.setTimeout(90000);
describe("room.repository.spec.ts", () => {
    let messageRepository;
    let clientRepository;
    let roomRepository;
    let testUtils;
    beforeAll(async (done) => {
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
            console.error('<<r.r.s |1>> error: ', error);
        }
        try {
            clientRepository = testUtils.databaseService.connection.getCustomRepository(client_repository_1.ClientRepository);
        }
        catch (error) {
            console.error('<<r.r.s |2>> error: ', error);
        }
        try {
            roomRepository = testUtils.databaseService.connection.getCustomRepository(room_repository_1.RoomRepository);
        }
        catch (error) {
            console.error('<<r.r.s |3>> error: ', error);
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
    afterAll(async (done) => {
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
        it("[3] roomRepository", async (done) => {
            expect(roomRepository).toBeDefined();
            expect(roomRepository).toBeInstanceOf(room_repository_1.RoomRepository);
            done();
        }, 20000);
    });
    describe("[b] roomCreate()", () => {
        it("[1] should create new Room", async (done) => {
            const sRoomDto = sample_room_dto_1.SampleRoomDtos[0];
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.roomCreate(sRoomDto);
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeUndefined();
            expect(gRoom).toBeDefined();
            expect(gRoom.room_id).toEqual(1);
            expect(gRoom.title).toEqual(sRoomDto.title);
            done();
        }, 20000);
        it("[2] title is less than 3 character hence should throw error", async (done) => {
            const sRoomDto = {
                room_type: room_type_enum_1.RoomType.GROUP,
                title: "ti",
                status: "Hasan Legendery",
                profile_image_url: "Hassan.jpg",
            };
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.roomCreate(sRoomDto);
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeDefined();
            expect(roomError).toBeInstanceOf(common_1.BadRequestException);
            expect(roomError.message).toContain("Validation failed!");
            expect(gRoom).toBeUndefined();
            done();
        }, 20000);
        it("[3] status is less than 3 character hence should throw error", async (done) => {
            const sRoomDto = {
                room_type: room_type_enum_1.RoomType.GROUP,
                title: "All Hassan",
                status: "st",
                profile_image_url: "Hassan.jpg",
            };
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.roomCreate(sRoomDto);
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeDefined();
            expect(roomError).toBeInstanceOf(common_1.BadRequestException);
            expect(roomError.message).toContain("Validation failed!");
            expect(gRoom).toBeUndefined();
            done();
        }, 20000);
    });
    describe("[c] roomGetById()", () => {
        it("[1] should return a room", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s c1>> loadAllSamples error: ', error);
            }
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.roomGetById(1);
            }
            catch (error) {
                console.log('<<r.r.s |c1>> Error while create new room: error:', error);
                roomError = error;
            }
            expect(roomError).toBeUndefined();
            expect(gRoom).toBeDefined();
            expect(gRoom.room_id).toEqual(1);
            expect(gRoom.title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 20000);
        it("[2] should return undefined", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s c1>> loadAllSamples error: ', error);
            }
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.roomGetById(10);
            }
            catch (error) {
                console.log('<<r.r.s |c1>> Error while create new room: error:', error);
                roomError = error;
            }
            expect(roomError).toBeUndefined();
            expect(gRoom).toBeUndefined();
            done();
        }, 20000);
    });
    describe("[d] clientsGetByRoomId()", () => {
        it("[1] should return client 1, 2 and 3", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let fetchError;
            try {
                fClients = await roomRepository.clientsGetByRoomId(1);
            }
            catch (error) {
                console.log('<<r.r.s |d1>> Error while create new room: error:', error);
                fetchError = error;
            }
            expect(fetchError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(3);
            expect(fClients[0].client_id).toEqual(sample_room_client_entities_1.SampleRoomClientEntities[0].client_id);
            expect(fClients[1].client_id).toEqual(sample_room_client_entities_1.SampleRoomClientEntities[1].client_id);
            expect(fClients[2].client_id).toEqual(sample_room_client_entities_1.SampleRoomClientEntities[2].client_id);
            done();
        }, 20000);
        it("[2] should return empty [] ", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s d1>> loadAllSamples error: ', error);
            }
            let fClients;
            let fetchError;
            try {
                fClients = await roomRepository.clientsGetByRoomId(10);
            }
            catch (error) {
                console.log('<<r.r.s |d1>> Error while create new room: error:', error);
                fetchError = error;
            }
            expect(fetchError).toBeUndefined();
            expect(fClients).toBeDefined();
            expect(fClients).toBeInstanceOf(Array);
            expect(fClients.length).toEqual(0);
            done();
        }, 20000);
    });
    describe("[e] roomsGetByClientId()", () => {
        it("[1] should return room 1, 2 for client 2", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s e1>> loadAllSamples error: ', error);
            }
            let fRooms;
            let fetchError;
            try {
                fRooms = await roomRepository.roomsGetByClientId(2);
            }
            catch (error) {
                console.log('<<r.r.s |d1>> Error while create new room: error:', error);
                fetchError = error;
            }
            expect(fetchError).toBeUndefined();
            expect(fRooms).toBeDefined();
            expect(fRooms).toBeInstanceOf(Array);
            expect(fRooms.length).toEqual(2);
            expect(fRooms[0].room_id).toEqual(1);
            expect(fRooms[1].room_id).toEqual(2);
            done();
        }, 20000);
        it("[2] should return empty []", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s e1>> loadAllSamples error: ', error);
            }
            let fRooms;
            let fetchError;
            try {
                fRooms = await roomRepository.roomsGetByClientId(10);
            }
            catch (error) {
                console.log('<<r.r.s |d1>> Error while create new room: error:', error);
                fetchError = error;
            }
            expect(fetchError).toBeUndefined();
            expect(fRooms).toBeDefined();
            expect(fRooms).toBeInstanceOf(Array);
            expect(fRooms.length).toEqual(0);
            done();
        }, 20000);
    });
    describe("[f] roomUpdate()", () => {
        it("[1] should change to 'All Saeid'", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s e1>> loadAllSamples error: ', error);
            }
            const roomUpdateDto = {
                room_id: 1,
                title: "All Saeid",
            };
            let fRooms;
            let fetchError;
            try {
                fRooms = await roomRepository.roomUpdate(roomUpdateDto);
            }
            catch (error) {
                console.log('<<r.r.s |d1>> Error while create new room: error:', error);
                fetchError = error;
            }
            expect(fetchError).toBeUndefined();
            expect(fRooms).toBeDefined();
            expect(fRooms).toBeInstanceOf(room_entity_1.Room);
            expect(fRooms.title).toEqual(roomUpdateDto.title);
            done();
        }, 20000);
        it("[2] invalid Id hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<r.r.s e1>> loadAllSamples error: ', error);
            }
            const roomUpdateDto = {
                room_id: 10,
                title: "All Saeid",
            };
            let fRooms;
            let fetchError;
            try {
                fRooms = await roomRepository.roomUpdate(roomUpdateDto);
            }
            catch (error) {
                fetchError = error;
            }
            expect(fetchError).toBeDefined();
            expect(fetchError).toBeInstanceOf(common_1.BadRequestException);
            expect(fetchError.message).toEqual('Invalid room_id');
            expect(fRooms).toBeUndefined();
            done();
        }, 20000);
    });
});
//# sourceMappingURL=room.repository.spe.js.map