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
const build_merchant_inputs_1 = require("../../../test/fixtures/kasabe/merchant/build.merchant.inputs");
const test_1 = require("../../../test");
const tag_entity_1 = require("../tag/tag.entity");
const tag_repository_1 = require("../tag/tag.repository");
const build_tag_inputs_1 = require("../../../test/fixtures/kasabe/tag/build.tag.inputs");
const merchant_category_entity_1 = require("../merchant_category/merchant_category.entity");
const build_merchant_category_inputs_1 = require("../../../test/fixtures/kasabe/merchant_category/build.merchant_category.inputs");
const seen_repository_1 = require("./seen.repository");
const merchant_repository_1 = require("../merchant/merchant.repository");
const build_seen_inputs_1 = require("../../../test/fixtures/kasabe/seen/build.seen.inputs");
const post_repository_1 = require("../post/post.repository");
const post_entity_1 = require("../post/post.entity");
const build_post_inputs_1 = require("../../../test/fixtures/kasabe/post/build.post.inputs");
jest.setTimeout(90000);
describe("post.repository.spec.ts", () => {
    let testUtils;
    let authService;
    let merchantRepository;
    let merchantCategoryRepository;
    let tagRepository;
    let postRepository;
    let seenRepository;
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
                seen_repository_1.SeenRepository,
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
            seenRepository = module.get(seen_repository_1.SeenRepository);
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
            console.log('<<seen.repository.ts>> cleanAllSamples error: ', error);
        }
        done();
    });
    afterEach(async (done) => {
        await testUtils.closeDbConnection();
        done();
    });
    describe("[a] Variables()", () => {
    });
    describe("[b] seenCreate()", () => {
    });
    describe("[c] seenCount()", () => {
    });
    describe("[d] did-I-seen()", () => {
    });
    describe("[e] post relation with seen", () => {
        it("[1] post should contains all seen", async (done) => {
            const authCount = 2;
            const gAuths = [];
            for (const authInput of test_1.BuildAuthInputs.slice(0, authCount)) {
                const gAuth = await authService.build(authInput);
                gAuths.push(gAuth);
            }
            expect(gAuths.length).toBe(2);
            const tagCount = 3;
            const gTags = [];
            for (const tagInput of build_tag_inputs_1.BuildTagInputs.slice(0, tagCount)) {
                const nTag = tag_entity_1.Tag.of(tagInput);
                const gTag = await tag_entity_1.Tag.save(nTag);
                gTags.push(gTag);
            }
            expect(gTags.length).toBe(3);
            const merchantCategoryCount = 2;
            const gMerchantCategorys = [];
            for (const merchantCategoryInput of build_merchant_category_inputs_1.BuildMerchantCategoryInputs.slice(0, merchantCategoryCount)) {
                const nMerchantCategory = merchant_category_entity_1.MerchantCategory.of(merchantCategoryInput);
                const gMerchantCategory = await merchant_category_entity_1.MerchantCategory.save(nMerchantCategory);
                gMerchantCategorys.push(gMerchantCategory);
            }
            expect(gMerchantCategorys.length).toBe(merchantCategoryCount);
            const merchantCount = 1;
            const gMerchants = [];
            for (const merchantInput of build_merchant_inputs_1.BuildMerchantInputs.slice(0, merchantCount)) {
                const gMerchant = await merchantRepository.build(merchantInput);
                gMerchants.push(gMerchant);
            }
            expect(gMerchants.length).toBe(merchantCount);
            expect(gMerchants[0]).toBeDefined();
            expect(gMerchants[0].merchant_id).toEqual(1);
            expect(gMerchants[0].merchant_title).toEqual(build_merchant_inputs_1.BuildMerchantInputs[0].merchant_title);
            const postCount = 1;
            const gPosts = [];
            for (const postInput of build_post_inputs_1.BuildPostInputs.slice(0, postCount)) {
                const gPost = await postRepository.build(postInput);
                gPosts.push(gPost);
            }
            expect(gPosts.length).toBe(postCount);
            expect(gPosts[0]).toBeDefined();
            expect(gPosts[0].post_id).toEqual(1);
            expect(gPosts[0].post_text).toEqual(build_post_inputs_1.BuildPostInputs[0].post_text);
            const fMerchant = await merchantRepository.fetchById(gMerchants[0].merchant_id);
            expect(fMerchant.article.posts).toBeInstanceOf(Array);
            expect(fMerchant.article.posts.length).toBe(1);
            expect(fMerchant.article.posts[0].post_id).toBe(1);
            expect(fMerchant.article.posts[0].post_text).toBe(build_post_inputs_1.BuildPostInputs[0].post_text);
            const seenCount = 2;
            const gSeens = [];
            for (const seenInput of build_seen_inputs_1.BuildSeenInputs.slice(0, seenCount)) {
                const gSeen = await seenRepository.build(seenInput);
                gSeens.push(gSeen);
            }
            expect(gSeens.length).toBe(seenCount);
            expect(gSeens[0]).toBeDefined();
            expect(gSeens[0].seen_id).toEqual(1);
            expect(gSeens[0].auth_id).toEqual(1);
            const fPost = await post_entity_1.Post.findOne({
                relations: ["seens"],
                where: { post_id: 1 },
            });
            console.log('<seen.repository| e1| fPost>', fPost);
            expect(fPost).toBeDefined();
            done();
        }, 20000);
    });
    describe("[c] merchantGetById()", () => {
    });
    describe("[d] merchantUpdate()", () => {
    });
    describe("[e] merchantGetByRoomId()", () => {
    });
});
//# sourceMappingURL=seen.repository.spe.js.map