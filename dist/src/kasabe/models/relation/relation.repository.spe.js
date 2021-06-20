"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const database_service_1 = require("../../../database/database.service");
const database_module_1 = require("../../../database/database.module");
const test_utils_1 = require("../../../test/test.utils");
const auth_module_1 = require("../../../auth/auth.module");
const auth_service_1 = require("../../../auth/auth.service");
const auth_repository_1 = require("../../../auth/auth/auth.repository");
const nest_access_control_1 = require("nest-access-control");
const auth_roles_1 = require("../../../auth/auth.roles");
const merchant_category_repository_1 = require("../merchant_category/merchant_category.repository");
const tag_repository_1 = require("../tag/tag.repository");
const relation_repository_1 = require("./relation.repository");
const merchant_repository_1 = require("../merchant/merchant.repository");
const post_repository_1 = require("../post/post.repository");
jest.setTimeout(90000);
describe("post.repository.spec.ts", () => {
    let testUtils;
    let authService;
    let merchantRepository;
    let merchantCategoryRepository;
    let tagRepository;
    let postRepository;
    let relationRepository;
    beforeEach(async (done) => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                nest_access_control_1.AccessControlModule.forRoles(auth_roles_1.roles),
                database_module_1.DatabaseModule,
                auth_module_1.AuthModule,
            ],
            providers: [
                database_service_1.DatabaseService,
                test_utils_1.TestUtils,
                auth_repository_1.AuthRepository,
                tag_repository_1.TagRepository,
                merchant_repository_1.MerchantRepository,
                post_repository_1.PostRepository,
                relation_repository_1.RelationRepository,
                auth_service_1.AuthService,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        authService = module.get(auth_service_1.AuthService);
        try {
            merchantRepository = testUtils.databaseService.connection.getCustomRepository(merchant_repository_1.MerchantRepository);
            merchantCategoryRepository = testUtils.databaseService.connection.getCustomRepository(merchant_category_repository_1.MerchantCategoryRepository);
            tagRepository = testUtils.databaseService.connection.getCustomRepository(tag_repository_1.TagRepository);
            postRepository = module.get(post_repository_1.PostRepository);
            relationRepository = module.get(relation_repository_1.RelationRepository);
        }
        catch (error) {
            console.error('merchantRepository| error>', error);
        }
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanAllSamples();
        }
        catch (error) {
            console.log('<<relation.repository.ts>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterEach(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] Variables()", () => {
    });
    describe("[b] relationCreate()", () => {
    });
    describe("[c] relationCount()", () => {
    });
    describe("[d] did-I-relation()", () => {
    });
    describe("[e] post relation with relation", () => {
    });
    describe("[c] merchantGetById()", () => {
    });
    describe("[d] merchantUpdate()", () => {
    });
    describe("[e] merchantGetByRoomId()", () => {
    });
});
//# sourceMappingURL=relation.repository.spe.js.map