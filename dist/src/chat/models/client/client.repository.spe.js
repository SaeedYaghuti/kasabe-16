"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityNotFoundError_1 = require("typeorm/error/EntityNotFoundError");
const testing_1 = require("@nestjs/testing");
const client_repository_1 = require("./client.repository");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const room_repository_1 = require("../room/room.repository");
const message_repository_1 = require("../message/message.repository");
const common_1 = require("@nestjs/common");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
const room_client_repository_1 = require("../room_client/room_client.repository");
jest.setTimeout(90000);
describe("client.repository.spec.ts", () => {
    let clientRepository;
    let testUtils;
    beforeEach(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                client_repository_1.ClientRepository,
                room_repository_1.RoomRepository,
                room_client_repository_1.RoomClientRepository,
                message_repository_1.MessageRepository,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        try {
            clientRepository = testUtils.databaseService.connection.getCustomRepository(client_repository_1.ClientRepository);
        }
        catch (error) {
            console.error('<<crs2>> error: ', error);
        }
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<c.r.s>> cleanAllSamples error: ', error);
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
        it("[2] clientRepository", async (done) => {
            expect(clientRepository).toBeDefined();
            expect(clientRepository).toBeInstanceOf(client_repository_1.ClientRepository);
            done();
        }, 20000);
    });
    describe("[b] clientCreate()", () => {
        it("[1] CR.clientCreate(0) should create new Client", async (done) => {
            const clientDto = sample_client_dto_1.SampleClientDtos[0];
            const fClient = await clientRepository.clientCreate(clientDto);
            expect(fClient).toBeDefined();
            expect(fClient.client_fname).toEqual('saeid');
            done();
        }, 20000);
        it("[2] client_fname is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "",
                client_lname: "yaghouti",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "saeid@yahouti.com",
            };
            let gClient;
            try {
                gClient = await clientRepository.clientCreate(clientDto);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[3] client_lname is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "saeid@yahouti.com",
            };
            let gClient;
            try {
                gClient = await clientRepository.clientCreate(clientDto);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[4] email is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "yahouti",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "",
            };
            let gClient;
            try {
                gClient = await clientRepository.clientCreate(clientDto);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[5] email is invalid hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "yahouti",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "saeid@gmailcom",
            };
            let gClient;
            try {
                gClient = await clientRepository.clientCreate(clientDto);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[6] 🎯 TODO phone should validate", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "yahouti",
                password: "12345678",
                phone: "",
                client_mname: "poker face",
                email: "saeid@yaghouti.com",
            };
            done();
        }, 20000);
    });
    describe("[c] clientGetById()", () => {
        it("[1] CR.clientGetById(1) should return data", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('2|cgbi error: ', error);
                expect(error).toBeUndefined();
            }
            const fClient = await clientRepository.clientGetById(1);
            expect(fClient).toBeDefined();
            expect(fClient.client_fname).toEqual('saeid');
            done();
        }, 20000);
        it("[2] CR.clientGetById(10) should return undefined", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('3|cgbi error: ', error);
                expect(error).toBeUndefined();
            }
            const fClient = await clientRepository.clientGetById(10);
            expect(fClient).toBeUndefined();
            done();
        }, 20000);
    });
    describe("[d] clientUpdate()", () => {
        it("[1] should update", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('1|cu error: ', error);
                expect(error).toBeUndefined();
            }
            const toUpdateClient = {
                client_id: 1,
                client_fname: "updated saeid",
            };
            let uClient;
            try {
                uClient = await clientRepository.clientUpdate(toUpdateClient);
            }
            catch (error) {
                console.log('1|su Error: ', error);
                expect(error).toBeUndefined();
            }
            expect(uClient).toBeDefined();
            expect(uClient.client_fname).toEqual('updated saeid');
            done();
        }, 20000);
        it("[2] client_id is invalid hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('2|cu error: ', error);
                expect(error).toBeUndefined();
            }
            const toUpdateClient = {
                client_id: 10,
                client_fname: "update saeid",
            };
            let uClient;
            try {
                uClient = await clientRepository.clientUpdate(toUpdateClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(EntityNotFoundError_1.EntityNotFoundError);
                expect(error.message).toEqual(`Could not find any entity of type "Client" matching: ${toUpdateClient.client_id}`);
            }
            expect(uClient).toBeUndefined();
            done();
        }, 20000);
        it("[3] client_fname is invalid hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('3|cu error: ', error);
                expect(error).toBeUndefined();
            }
            const toUpdateClient = {
                client_id: 1,
                client_fname: "",
            };
            let uClient;
            try {
                uClient = await clientRepository.clientUpdate(toUpdateClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual(`Validation failed!`);
            }
            expect(uClient).toBeUndefined();
            done();
        }, 20000);
        it("[4] client_mname is invalid hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('3|cu error: ', error);
                expect(error).toBeUndefined();
            }
            const toUpdateClient = {
                client_id: 1,
                client_mname: "",
            };
            let uClient;
            try {
                uClient = await clientRepository.clientUpdate(toUpdateClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual(`Validation failed!`);
            }
            expect(uClient).toBeUndefined();
            done();
        }, 20000);
        it("[5] 🎯 phone is invalid hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('3|cu error: ', error);
                expect(error).toBeUndefined();
            }
            done();
        }, 20000);
        it("[6] email is invalid hence should throw error", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('3|cu error: ', error);
                expect(error).toBeUndefined();
            }
            const toUpdateClient = {
                client_id: 1,
                email: "saeid@gmailcom",
            };
            let uClient;
            try {
                uClient = await clientRepository.clientUpdate(toUpdateClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual(`Validation failed!`);
            }
            expect(uClient).toBeUndefined();
            done();
        }, 20000);
    });
    describe("[e] clientGetByRoomId()", () => {
        it("[1] CR.clientsGetByRoomId(1) should return []", async (done) => {
            try {
                await testUtils.loadAllSamples();
            }
            catch (error) {
                console.log('2|cgbi error: ', error.message);
                expect(error).toBeUndefined();
            }
            const fClients = await clientRepository.clientsGetByRoomId(1);
            expect(fClients).toBeDefined();
            expect(fClients.length).toEqual(3);
            expect(fClients[0].client_fname).toEqual("saeid");
            expect(fClients[1].client_fname).toEqual("hamid");
            expect(fClients[2].client_fname).toEqual("asity");
            done();
        }, 20000);
        it("[2] CR.clientsGetByRoomId(1) should return []", async (done) => {
            const fClients = await clientRepository.clientsGetByRoomId(1);
            expect(fClients).toEqual([]);
            done();
        }, 20000);
    });
});
//# sourceMappingURL=client.repository.spe.js.map