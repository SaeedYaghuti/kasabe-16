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
const person_repository_1 = require("../person/person.repository");
const comment_repository_1 = require("./comment.repository");
const merchant_repository_1 = require("../merchant/merchant.repository");
const heart_repository_1 = require("../heart/heart.repository");
const post_repository_1 = require("../post/post.repository");
const article_repository_1 = require("../article/article.repository");
const rate_repository_1 = require("../rate/rate.repository");
const auth_credentials_dto_1 = require("../../../auth/dto/auth-credentials.dto");
const auth_type_enum_1 = require("../../../auth/auth/auth_type.enum");
jest.setTimeout(90000);
describe("comment.repository.spec.ts", () => {
    let testUtils;
    let authService;
    let articleRepository;
    let merchantRepository;
    let merchantCategoryRepository;
    let tagRepository;
    let postRepository;
    let commentRepository;
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
                person_repository_1.PersonRepository,
                merchant_repository_1.MerchantRepository,
                comment_repository_1.CommentRepository,
                rate_repository_1.RateRepository,
                heart_repository_1.HeartRepository,
                auth_service_1.AuthService,
            ]
        }).compile();
        testUtils = module.get(test_utils_1.TestUtils);
        authService = module.get(auth_service_1.AuthService);
        try {
            tagRepository = testUtils.databaseService.connection.getCustomRepository(tag_repository_1.TagRepository);
            articleRepository = testUtils.databaseService.connection.getCustomRepository(article_repository_1.ArticleRepository);
            merchantRepository = testUtils.databaseService.connection.getCustomRepository(merchant_repository_1.MerchantRepository);
            merchantCategoryRepository = testUtils.databaseService.connection.getCustomRepository(merchant_category_repository_1.MerchantCategoryRepository);
            commentRepository = testUtils.databaseService.connection.getCustomRepository(comment_repository_1.CommentRepository);
            postRepository = testUtils.databaseService.connection.getCustomRepository(post_repository_1.PostRepository);
            rateRepository = testUtils.databaseService.connection.getCustomRepository(rate_repository_1.RateRepository);
            heartRepository = testUtils.databaseService.connection.getCustomRepository(heart_repository_1.HeartRepository);
        }
        catch (error) {
            console.error('merchantRepository| error>', error);
        }
        done();
    });
    beforeEach(async (done) => {
        try {
            await testUtils.cleanDB();
        }
        catch (error) {
            console.log('<<comment.repository.ts>> cleanEntities error: ', error);
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
    describe("[b] loadSampleByCustomRepository", () => {
    });
    describe("[c] build and fetch comment", () => {
        it("[1] should biuld and fetch Comment with hearts, comments, rates(?)", async (done) => {
            let loadError;
            try {
                await testUtils.loadSampleByCustomRepository([
                    "Auth",
                    "Tag",
                    "Article",
                    "MerchantCategory",
                    "Merchant",
                    "Post",
                    "Comment",
                    "Rate",
                    "Heart",
                ]);
            }
            catch (error) {
                loadError = error;
                console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
            }
            expect(loadError).toBeUndefined();
            const authInput = {
                authname: "tayebat",
                password: "1234",
                auth_type: [auth_type_enum_1.AuthType.MERCHANT],
            };
            const bAuth = await authService.build(authInput);
            expect(bAuth.authname).toBe(authInput.authname);
            const tagInput = {
                tag_title: "customer-lover"
            };
            const bTag = await tagRepository.build(tagInput);
            expect(bTag.tag_title).toBe(tagInput.tag_title);
            const merchantInput = {
                auth_id: bAuth.auth_id,
                merchant_title: "Tayebat",
                tiny_description: "Painting, Structure tools, chalk, ...",
                long_description: "we will associate you while building",
                contact_name: "Abdorrahim Tayebat",
                instagram_url: "instagram.com/Tayebat",
                number_call: "09194846922",
                number_whatsapp: "09194846922",
                number_telegram: "09194846922",
                bank_card_number: "1111222233334444",
                bank_card_details: "mellat bank name of ibrahim shahbazi",
                avatar_url: "30966443811696465.jpeg",
                header_url: "30966443811696465.jpeg",
                note: "Call me only from 8am to 8pm",
                location: "hormud",
                merchant_category_id: 1,
                tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"]
            };
            const bMerchant = await merchantRepository.build(merchantInput);
            expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
            const postInput = {
                auth_id: bAuth.auth_id,
                merchant_id: bMerchant.merchant_id,
                picture_urls: ["30966443811696465.jpeg"],
                post_text: "Azadi Chalk recived...",
            };
            const bPost = await postRepository.build(postInput);
            expect(bPost.post_text).toBe(postInput.post_text);
            const commentInput = {
                auth_id: bAuth.auth_id,
                audience_article_id: bPost.post_article_id,
                comment_text: "hurmoud love Tayebat"
            };
            const bComment = await commentRepository.build(commentInput);
            expect(bComment.comment_text).toBe(commentInput.comment_text);
            const fPost = await postRepository.fetchById(bPost.post_id);
            `
      post_article: Article {
        article_id: 15,
        article_type: 'POST',
        comments: [ [Comment] ],
        hearts: [],
        rates: []
      },
      `;
            expect(fPost).toBeDefined();
            expect(fPost.post_article.comments).toBeDefined();
            expect(fPost.post_article.comments[0].comment_text).toBe(bComment.comment_text);
            done();
        });
    });
    describe("[b] build()", () => {
    });
    describe("[b] merchantCreate()", () => {
    });
    describe("[c] getMerchantCommentsForAuth01()", () => {
    });
    describe("[d] getMerchantCommentsForAuth02()", () => {
    });
    describe("[e] getMerchantCommentsForAuth03()", () => {
    });
    describe("[f] getMerchantCommentsForAuth04()", () => {
    });
    describe("[g] getMerchantCommentsForAuth05()", () => {
    });
    describe("[h] getMerchantCommentsForAuth06()", () => {
    });
    describe("[c] merchantGetById()", () => {
    });
    describe("[d] merchantUpdate()", () => {
    });
    describe("[e] merchantGetByRoomId()", () => {
    });
});
//# sourceMappingURL=comment.repository.spe.js.map