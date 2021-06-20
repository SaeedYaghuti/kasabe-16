"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_entity_1 = require("./room.entity");
const room_type_enum_1 = require("./room_type.enum");
const sample_room_dto_1 = require("../../../test/fixtures/chat/sample_room.dto");
const exceptions_1 = require("@nestjs/common/exceptions");
const message_entity_1 = require("../message/message.entity");
const client_entity_1 = require("../client/client.entity");
const sample_room_entities_1 = require("../../../test/fixtures/chat/sample_room.entities");
jest.setTimeout(90000);
describe("room.entity.spec.ts", () => {
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
            console.log('<<r.e.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] variables", () => {
        it("[1] testUtils", async (done) => {
            expect(testUtils).toBeDefined();
            done();
        }, 20000);
        it("[2] roomRepository", async (done) => {
            expect(roomRepository).toBeDefined();
            expect(roomRepository).toBeInstanceOf(typeorm_1.Repository);
            const nRoom = new room_entity_1.Room();
            expect(nRoom).toBeDefined();
            expect(nRoom).toBeInstanceOf(room_entity_1.Room);
            done();
        }, 20000);
    });
    describe("[b] create", () => {
        it("[1] should create a sample room", async (done) => {
            const roomSampleDto = sample_room_dto_1.SampleRoomDtos[0];
            const nRoom = room_entity_1.Room.of(roomSampleDto);
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.save(nRoom);
            }
            catch (error) {
                console.log('<<b1>> error while .save() error: ', error);
                roomError = error;
            }
            expect(roomError).toBeUndefined();
            expect(gRoom).toBeDefined();
            expect(gRoom.room_id).toEqual(1);
            expect(gRoom.title).toEqual(roomSampleDto.title);
            done();
        }, 200000);
        it("[2] RoomCreateDto is not complete hence should throw error", async (done) => {
            const roomSampleDto = sample_room_dto_1.SampleRoomDtos[0];
            const nRoom = new room_entity_1.Room();
            Object.assign(nRoom, roomSampleDto);
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.save(nRoom);
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeDefined();
            expect(roomError).toBeInstanceOf(exceptions_1.BadRequestException);
            expect(roomError.message).toEqual('Validation failed!');
            expect(gRoom).toBeUndefined();
            done();
        }, 20000);
        it("[3] title is Empty hence should throw error", async (done) => {
            const roomSampleDto = {
                room_type: room_type_enum_1.RoomType.GROUP,
                title: "",
                status: "Hasan Legendery",
                profile_image_url: "Hassan.jpg",
            };
            const nRoom = room_entity_1.Room.of(roomSampleDto);
            let gRoom;
            let roomError;
            try {
                gRoom = await roomRepository.save(nRoom);
            }
            catch (error) {
                roomError = error;
            }
            expect(roomError).toBeDefined();
            expect(roomError).toBeInstanceOf(exceptions_1.BadRequestException);
            expect(roomError.message).toEqual('Validation failed!');
            expect(gRoom).toBeUndefined();
            done();
        }, 20000);
        it("[4] room_type is Empty hence TS Error", async (done) => {
            done();
        }, 20000);
    });
    describe("[c] read", () => {
        it("[1] find()", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fRooms;
            let msgError;
            try {
                fRooms = await roomRepository.find();
            }
            catch (error) {
                console.log('<<m.e.s 3>> error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fRooms).toBeInstanceOf(Array);
            expect(fRooms.length).toEqual(2);
            expect(fRooms[0].title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 200000);
        it("[2] find(1): no affect", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fRooms;
            let msgError;
            try {
                fRooms = await roomRepository.find(1);
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fRooms).toBeInstanceOf(Array);
            expect(fRooms.length).toEqual(2);
            expect(fRooms[0].title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 200000);
        it("[3] find({ room_id })", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fRoom;
            let msgError;
            try {
                fRoom = await roomRepository.find({ room_id: 1 });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fRoom).toBeInstanceOf(Array);
            expect(fRoom.length).toEqual(1);
            expect(fRoom[0].title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 200000);
        it("[4] findOne({ room_id })", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fRoom;
            let msgError;
            try {
                fRoom = await roomRepository.findOne({ room_id: 1 });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fRoom).toBeInstanceOf(room_entity_1.Room);
            expect(fRoom.title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 200000);
        it("[4] findOne({ title })", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('<<c1| 1>> loadAllSamples error: ', error);
            }
            let fRoom;
            let msgError;
            try {
                fRoom = await roomRepository.findOne({ title: "All Hassan" });
            }
            catch (error) {
                console.log('<<m.e.s 3>> Error: error:', error);
                msgError = error;
            }
            expect(msgError).toBeUndefined();
            expect(fRoom).toBeInstanceOf(room_entity_1.Room);
            expect(fRoom.title).toEqual(sample_room_entities_1.SampleRoomEntities[0].title);
            done();
        }, 200000);
    });
});
//# sourceMappingURL=room.entity.spe.js.map