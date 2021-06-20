"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const client_entity_1 = require("./client.entity");
const common_1 = require("@nestjs/common");
const sample_client_dto_1 = require("../../../test/fixtures/chat/sample_client.dto");
jest.setTimeout(90000);
describe("client.entity.spec.ts", () => {
    let clientRepository;
    let testUtils;
    beforeAll(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [database_service_1.DatabaseService, test_utils_1.TestUtils]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        clientRepository = testUtils.databaseService.connection.getRepository(client_entity_1.Client);
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<c.s.s>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterAll(async (done) => {
        await testUtils.cleanAllSamples();
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] Create", () => {
        it("[1] variables", async (done) => {
            expect(clientRepository).toBeDefined();
            const nClient = new client_entity_1.Client();
            expect(nClient).toBeDefined();
            done();
        }, 20000);
        it("[2] should throw error bcs sample data is not complete", async (done) => {
            const sClient = sample_client_dto_1.SampleClientDtos[0];
            const nClient = new client_entity_1.Client();
            Object.assign(nClient, sClient);
            try {
                const cClient = await clientRepository.save(nClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
            }
            done();
        }, 20000);
        it("[3] should create a sample client", async (done) => {
            const sClient = sample_client_dto_1.SampleClientDtos[0];
            const nClient = await client_entity_1.Client.of(sClient);
            let cClient;
            try {
                cClient = await clientRepository.save(nClient);
            }
            catch (error) {
                expect(error).toBeUndefined();
            }
            expect(cClient).toBeDefined();
            expect(cClient.client_fname).toEqual("saeid");
            done();
        }, 20000);
        it("[4] should create 4 sample client", async (done) => {
            const cClients = [];
            for (const sClientDto of sample_client_dto_1.SampleClientDtos) {
                let nClient;
                try {
                    nClient = await client_entity_1.Client.of(sClientDto);
                }
                catch (error) {
                    expect(error).toBeUndefined();
                }
                expect(nClient).toBeDefined();
                let cClient;
                try {
                    cClient = await clientRepository.save(nClient);
                }
                catch (error) {
                    expect(error).toBeUndefined();
                }
                cClients.push(cClient);
            }
            expect(cClients.length).toEqual(4);
            done();
        }, 20000);
        it("[5] client_fname is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "",
                client_lname: "yaghouti",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "saeid@yahouti.com",
            };
            let nClient;
            let gClient;
            try {
                nClient = client_entity_1.Client.of(clientDto);
                gClient = await clientRepository.save(nClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(nClient).toBeDefined();
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[6] client_lname is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "saeid@yahouti.com",
            };
            let nClient;
            let gClient;
            try {
                nClient = client_entity_1.Client.of(clientDto);
                gClient = await clientRepository.save(nClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(nClient).toBeDefined();
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[7] email is empty hence should throw error", async (done) => {
            const clientDto = {
                client_fname: "saeid",
                client_lname: "yahouti",
                password: "12345678",
                phone: "09194846922",
                client_mname: "poker face",
                email: "",
            };
            let nClient;
            let gClient;
            try {
                nClient = client_entity_1.Client.of(clientDto);
                gClient = await clientRepository.save(nClient);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(common_1.BadRequestException);
                expect(error.message).toEqual('Validation failed!');
            }
            expect(nClient).toBeDefined();
            expect(gClient).toBeUndefined();
            done();
        }, 20000);
        it("[8] 🎯 TODO phone should validate", async (done) => {
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
});
//# sourceMappingURL=client.entity.spe.js.map