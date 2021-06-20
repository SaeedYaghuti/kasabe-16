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
const build_auth_inputs_1 = require("../../../test/fixtures/auth/auth/build.auth.inputs");
const tag_entity_1 = require("../tag/tag.entity");
const tag_repository_1 = require("../tag/tag.repository");
const build_tag_inputs_1 = require("../../../test/fixtures/kasabe/tag/build.tag.inputs");
const merchant_category_entity_1 = require("../merchant_category/merchant_category.entity");
const build_merchant_category_inputs_1 = require("../../../test/fixtures/kasabe/merchant_category/build.merchant_category.inputs");
const rate_repository_1 = require("./rate.repository");
const merchant_repository_1 = require("../merchant/merchant.repository");
const heart_repository_1 = require("../heart/heart.repository");
const build_rate_inputs_1 = require("../../../test/fixtures/kasabe/rate/build.rate.inputs");
const article_entity_1 = require("../article/article.entity");
const build_article_inputs_1 = require("../../../test/fixtures/kasabe/article/build.article.inputs");
jest.setTimeout(90000);
describe("rate.repository.spec.ts", () => {
    let testUtils;
    let authService;
    let merchantRepository;
    let merchantCategoryRepository;
    let tagRepository;
    let rateRepository;
    let heartRepository;
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
                rate_repository_1.RateRepository,
                heart_repository_1.HeartRepository,
                auth_service_1.AuthService,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        authService = module.get(auth_service_1.AuthService);
        try {
            merchantRepository = testUtils.databaseService.connection.getCustomRepository(merchant_repository_1.MerchantRepository);
            merchantCategoryRepository = testUtils.databaseService.connection.getCustomRepository(merchant_category_repository_1.MerchantCategoryRepository);
            tagRepository = testUtils.databaseService.connection.getCustomRepository(tag_repository_1.TagRepository);
            rateRepository = module.get(rate_repository_1.RateRepository);
            heartRepository = module.get(heart_repository_1.HeartRepository);
        }
        catch (error) {
            console.error('merchantRepository| error>', error);
        }
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanEntities();
        }
        catch (error) {
            console.log('<<rate.repository.ts>> cleanEntities error: ', error);
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
    });
    describe("[b] build()", () => {
        it("[1] should create new Rate", async (done) => {
            const authCount = 2;
            const gAuths = [];
            for (const authInput of build_auth_inputs_1.CreateAuthInputs.slice(0, authCount)) {
                const gAuth = await authService.build(authInput);
                gAuths.push(gAuth);
            }
            expect(gAuths.length).toBe(2);
            const articleCount = 6;
            const gArticles = [];
            for (const articleInput of build_article_inputs_1.BuildArticleInputs.slice(0, articleCount)) {
                const nArticle = await article_entity_1.Article.of(articleInput);
                const gArticle = await article_entity_1.Article.save(nArticle);
                gArticles.push(gArticle);
            }
            expect(gArticles.length).toBe(articleCount);
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
            const rateCount = 1;
            const gRates = [];
            for (const rateInput of build_rate_inputs_1.BuildRateInputs.slice(0, rateCount)) {
                const gRate = await rateRepository.build(rateInput);
                gRates.push(gRate);
            }
            console.log("<b1| build| gRates>", gRates);
            expect(gRates.length).toBe(rateCount);
            expect(gRates[0]).toBeDefined();
            expect(gRates[0].rate_id).toEqual(1);
            expect(gRates[0].rate_text).toEqual(build_rate_inputs_1.BuildRateInputs[0].rate_text);
            done();
        }, 900000);
    });
    describe("[b] merchantCreate()", () => {
    });
    describe("[c] getMerchantRatesForAuth01()", () => {
    });
    describe("[d] getMerchantRatesForAuth02()", () => {
    });
    describe("[e] getMerchantRatesForAuth03()", () => {
    });
    describe("[f] getMerchantRatesForAuth04()", () => {
    });
    describe("[g] getMerchantRatesForAuth05()", () => {
    });
    describe("[h] getMerchantRatesForAuth06()", () => {
    });
    describe("[c] merchantGetById()", () => {
    });
    describe("[d] merchantUpdate()", () => {
    });
    describe("[e] merchantGetByRoomId()", () => {
    });
});
//# sourceMappingURL=rate.repository.spe.js.map