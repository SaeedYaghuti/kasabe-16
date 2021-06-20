import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { Test } from "@nestjs/testing";
import { AccessControlModule } from "nest-access-control";

import { ArticleRepository, BuildTagInput, TagRepository, BuildCommentInput, BuildMerchantInput, BuildPostInput, CommentRepository, HeartRepository, MerchantCategoryRepository, MerchantRepository, PersonRepository, PostRepository, RateRepository, BuildRateInput, BuildHeartInput, Comment, Rate } from "../models";
import { AuthModule, AuthService, roles, AuthRepository, CreateAuthInput, AuthType } from "../../auth";
import { DatabaseModule, DatabaseService } from "../../database";
import { TestUtils } from "../../test";
import { FetchMerchantInput } from '../models/merchant/merchant.repository';
import { Length } from 'class-validator';


jest.setTimeout(90000);

describe("comment.repository.spec.ts", () => {
  let testUtils: TestUtils;
  let authService: AuthService;

  let articleRepository: ArticleRepository;
  let merchantRepository: MerchantRepository;
  let merchantCategoryRepository: MerchantCategoryRepository;
  let tagRepository: TagRepository;
  let postRepository: PostRepository;
  let commentRepository: CommentRepository;
  let rateRepository: RateRepository;
  let heartRepository: HeartRepository;

  beforeEach(async done => {
    const module = await Test.createTestingModule({
      imports: [
        AccessControlModule.forRoles(roles),
        DatabaseModule,
        AuthModule,
      ],
      providers: [
        DatabaseService, 
        TestUtils, 

        AuthRepository,
        TagRepository,
        PersonRepository,
        MerchantRepository,
        CommentRepository,
        RateRepository,
        HeartRepository,
        
        AuthService,
      ]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);
    authService = module.get<AuthService>(AuthService);

    try {
      tagRepository = testUtils.databaseService.connection.getCustomRepository(TagRepository);
      articleRepository = testUtils.databaseService.connection.getCustomRepository(ArticleRepository);
      merchantRepository = testUtils.databaseService.connection.getCustomRepository(MerchantRepository);
      merchantCategoryRepository = testUtils.databaseService.connection.getCustomRepository(MerchantCategoryRepository);
      commentRepository = testUtils.databaseService.connection.getCustomRepository(CommentRepository);
      postRepository = testUtils.databaseService.connection.getCustomRepository(PostRepository);
      rateRepository = testUtils.databaseService.connection.getCustomRepository(RateRepository);
      heartRepository = testUtils.databaseService.connection.getCustomRepository(HeartRepository);
    } catch (error) {
      console.error('merchantRepository| error>', error);
    }
    
    // merchantRepository = testUtils.databaseService.connection.getCustomRepository(MerchantRepository);

    done();
  });

  beforeEach(async done => {
    try {
      // await testUtils.cleanEntities();
      await testUtils.cleanDB();
    } catch (error) {
      console.log('<<comment.repository.ts>> cleanEntities error: ', error);
    }
    done();
  });
 
  afterEach(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] Variables()", () => {
    
    // it("[1] testUtils", async done => {
    //   expect(testUtils).toBeDefined();
    //   done();
    // }, 20000);

    // it("[2] authService", async done => {
    //   expect(authService).toBeDefined();
    //   expect(authService).toBeInstanceOf(AuthService);
    //   done();
    // }, 20000);
    
    // it("[3] merchantRepository", async done => {
    //   expect(merchantRepository).toBeDefined();
    //   expect(merchantRepository).toBeInstanceOf(MerchantRepository);
    //   done();
    // }, 20000);
 
    // it("[4] merchantCategoryRepository", async done => {
    //   expect(merchantCategoryRepository).toBeDefined();
    //   expect(merchantCategoryRepository).toBeInstanceOf(MerchantCategoryRepository);
    //   done();
    // }, 20000);

    // it("[5] tagRepository", async done => {
    //   expect(tagRepository).toBeDefined();
    //   expect(tagRepository).toBeInstanceOf(TagRepository);
    //   done();
    // }, 20000);
    
    // it("[6] commentRepository", async done => {
    //   expect(commentRepository).toBeDefined();
    //   expect(commentRepository).toBeInstanceOf(CommentRepository);
    //   done();
    // }, 20000);
    
    

  });

  //! reference
  describe("[b] loadSampleByCustomRepository", () => {

    // it("[1] should loadSampleByCustomRepository", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",

    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }

    //   //* auth, Auth
    //   const authCount = BuildAuthInputs.length;
    //   const gAuth = await Auth.findAndCount();
    //   // console.log('<merchant.repository.spec| gAuth>', gAuth);
    //   expect(gAuth[1]).toBe(authCount);

    //   //* article, Article
    //   const articleCount = BuildArticleInputs.length;
    //   // const gArticle = await Article.findAndCount();
    //   const gArticle = await articleRepository.fetch();
    //   console.log('<log4| comment.repository.spec| gArticle>', gArticle);
    //   //> post will meke some new articles
    //   expect(gArticle.length).toBeGreaterThanOrEqual(articleCount);
      

    //   //* tag, Tag
    //   const tagCount = BuildTagInputs.length;
    //   const gTag = await Tag.findAndCount();
    //   // console.log('<comment.repository.spec| gTag>', gTag);
    //   //> tag itself contain 3 element, but merchant make some new tags
    //   expect(gTag[1]).toBeGreaterThanOrEqual(tagCount);
      
    //   //* merchantCategory, MerchantCategory
    //   const merchantCategoryCount = BuildMerchantCategoryInputs.length;
    //   const gMerchantCategory = await MerchantCategory.findAndCount();
    //   /// console.log('<comment.repository.spec| gMerchantCategory>', gMerchantCategory);
    //   expect(gMerchantCategory[1]).toBe(merchantCategoryCount);
      
    //   //* merchant, Merchant
    //   const merchantCount = BuildMerchantInputs.length;
    //   const gMerchant = await Merchant.findAndCount();
    //   // console.log('<comment.repository.spec| gMerchant>', gMerchant);
    //   expect(gMerchant[1]).toBe(merchantCount);
    
    //   //* post, Post
    //   const postCount = BuildPostInputs.length;
    //   const gPost = await Post.findAndCount();
    //   // console.log('<comment.repository.spec| gPost>', gPost);
    //   expect(gPost[1]).toBe(postCount);
      
    //   //* comment, Comment
    //   const commentCount = BuildCommentInputs.length;
    //   const gComment = await Comment.findAndCount();
    //   // console.log('<comment.repository.spec| gComment>', gComment);
    //   expect(gComment[1]).toBe(commentCount);
    
    //   //* rate, Rate
    //   const rateCount = BuildRateInputs.length;
    //   const gRate = await Rate.findAndCount();
    //   // console.log('<rate.repository.spec| gRate>', gRate);
    //   expect(gRate[1]).toBe(rateCount);
      
    //   //* heart, Heart
    //   const heartCount = BuildHeartInputs.length;
    //   const gHeart = await Heart.findAndCount();
    //   // console.log('<heart.repository.spec| gHeart>', gHeart);
    //   expect(gHeart[1]).toBe(heartCount);
    

    //   expect(loadError).toBeUndefined();

    //   done();
    // });
    
  });
    
  //! reference: build manually
  describe("[c] build and fetch Comment", () => {

    // it("[1] should biuld and fetch Comment with hearts, comments, rates(?)", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",

    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* check result
    //   const fPost = await postRepository.fetchById(bPost.post_id);
    //   `
    //   post_article: Article {
    //     article_id: 15,
    //     article_type: 'POST',
    //     comments: [ [Comment] ],
    //     hearts: [],
    //     rates: []
    //   },
    //   `;
    //   // console.log("<build| fPost>", fPost);
    //   // console.log("<build| fPost.post_article.comments[0]>", fPost.post_article.comments[0]);
    //   expect(fPost).toBeDefined();
    //   expect(fPost.post_article.comments).toBeDefined();
    //   expect(fPost.post_article.comments[0].comment_text).toBe(bComment.comment_text);
      

    //   done();
    // });
    
  });
    
  describe("[d] build and fetch Rate", () => {

    // it("[1] should biuld and fetch rate with hearts, comments, rates(?)", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",

    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Post, post for merchant
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment for post
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);
      
    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* check result
    //   const fMerchant = await merchantRepository.fetchById(bMerchant.merchant_id);
    //   `
    //   article: Article {
    //     article_id: 14,
    //     article_type: 'MERCHANT_PROFILE',
    //     posts: [ [Post] ],
    //     comments: [],
    //     hearts: [],
    //     rates: [ [Rate] ]
    //   }
    //   `;
    //   console.log("<build| fMerchant>", fMerchant);
    //   expect(fMerchant.article.rates[0]).toBeDefined();
    //   expect(fMerchant.article.rates[0].rate_text).toBe(rateInput.rate_text);

    //   done();
    // });
    
  });
    
  describe("[e] fetch Comment", () => {

    // it("[1] should biuld and fetch Comment with hearts, comments, rates(?)", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",

    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* check result
    //   const fPost = await postRepository.fetchById(bPost.post_id);
    //   `
    //   post_article: Article {
    //     article_id: 15,
    //     article_type: 'POST',
    //     comments: [ [Comment] ],
    //     hearts: [],
    //     rates: []
    //   },
    //   `;
    //   // console.log("<build| fPost>", fPost);
    //   // console.log("<build| fPost.post_article.comments[0]>", fPost.post_article.comments[0]);
    //   expect(fPost).toBeDefined();
    //   expect(fPost.post_article.comments).toBeDefined();
    //   expect(fPost.post_article.comments[0].comment_text).toBe(bComment.comment_text);
      

    //   done();
    // });
    
  });
   
  //? only get merchant with computed data like count; not ralations
  describe("[f] fetch01 Merchant completely", () => {

    // it("[1] should biuld and fetch01 Merchant completely", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch01| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    
    //   //* check result
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   const fResult = await merchantRepository.fetch01(i);
    //   console.warn("<warn6| build| fResult>", fResult);
    //   // console.log("<build| fResult.post_article.comments[0]>", fResult.post_article.comments[0]);
    //   expect(fResult).toBeDefined();
    //   // expect(fResult.post_article.comments).toBeDefined();
    //   // expect(fResult.post_article.comments[0].comment_text).toBe(bComment.comment_text);
      

    //   done();
    // });
    
  });
  
  //! underconstructure
  describe("[g] fetch02 Merchant completely", () => {

    // it("[1] should biuld and fetch02 Merchant completely", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    
    //   //* check result
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fResult;
    //   let fError;
    //   try {
    //     fResult = await merchantRepository.fetch02(i);
    //   } catch (error) {
    //     fError = error;
    //     console.error('<fetch02| error>', error);
    //   }

    //   console.warn("<warn6| build| fResult>", fResult);
    //   // console.log("<build| fResult.post_article.comments[0]>", fResult.post_article.comments[0]);
    //   expect(fResult).toBeDefined();
    //   // expect(fResult.post_article.comments).toBeDefined();
    //   // expect(fResult.post_article.comments[0].comment_text).toBe(bComment.comment_text);
      

    //   done();
    // });
    
  });
  
  //> OK: should add computed column
  describe("[h] fetch03 Merchant relation by orm seperate query", () => {

    // it("[1] fetch03 should get Merchant relation by orm seperate query", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    
    //   //* check result
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fResult;
    //   let fError;
    //   try {
    //     fResult = await merchantRepository.fetch03(i);
    //   } catch (error) {
    //     fError = error;
    //     console.error('<fetch03| error>', error);
    //   }

    //   console.warn("<f03| build| fResult>", fResult);
    //   `
    //   article: Article {
    //     article_id: 14,
    //     article_type: 'MERCHANT_PROFILE',
    //     comments: [],
    //     posts: [Array],
    //     rates: [Array]
    //   }
    //   `
    //   console.warn("<wx| build| fResult[0].article>", fResult[0].article);
    //   expect(fResult).toBeDefined();
    //   expect(fResult[0].article.comments).toBeInstanceOf(Array);
    //   expect(fResult[0].article.posts).toBeInstanceOf(Array);
    //   expect(fResult[0].article.posts.length).toBe(1);
    //   expect(fResult[0].article.posts[0].post_text).toBe(bPost.post_text);
    //   expect(fResult[0].article.rates).toBeInstanceOf(Array);
    //   expect(fResult[0].article.rates.length).toBe(1);
    //   expect(fResult[0].article.rates[0].rate_stars).toBe(bRate.rate_stars);
      

    //   done();
    // });
    
  });
   
  //> OK
  describe("[i] postRepository.getPostHeart", () => {

    // it("[1] getPostHeart should get liked and heart_counts by orm seperate query", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //* get heart-data for post: heart-count,liked by seperate query
    //   let fHeartData;
    //   let fHError;
    //   try {
    //     fHeartData = await postRepository.getPostHeart(bAuth.auth_id, bPost.post_article_id);
    //   } catch (error) {
    //     fHError = error;
    //     console.error('<fHeartData| fHError>', fHError);
    //   }

    //   console.log("<kasabe.spec| fHeartData>", fHeartData);
    //   expect(fHError).toBeUndefined();
    //   expect(fHeartData).toBeDefined();
    //   expect(fHeartData.liked).toBe(true);
    //   expect(fHeartData.heart_counts).toBe("3"); //$ bigInt is string
      
     

    //   done();
    // });
    
  });
   
  //> OK
  describe("[ii] rateRepository.getRateHeart", () => {

    // it("[1] getRateHeart should get liked and heart_counts by orm seperate query", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }
      
    //   //* 3 comment for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: bAuth.auth_id,
    //       audience_article_id: bPost.post_article_id,
    //       comment_text: "hurmoud love Tayebat"
    //     };
        
        
    //     try {
    //       const bComment = await commentRepository.build(commentInput);
    //       // console.log("<build| bComment>", bComment);
    //       expect(bComment.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //* get heart-data for rate: heart-count,liked by seperate query
    //   let fHeartData;
    //   let fHError;
    //   try {
    //     fHeartData = await rateRepository.getRateHeart(bAuth.auth_id, bRate.rate_article_id);
    //   } catch (error) {
    //     fHError = error;
    //     console.error('<fHeartData| fHError>', fHError);
    //   }

    //   console.warn("<wrh| kasabe.spec| fHeartData>", JSON.stringify(fHeartData, null, 2));
    //   expect(fHError).toBeUndefined();
    //   expect(fHeartData).toBeDefined();
    //   expect(fHeartData.liked).toBe(true);
    //   expect(fHeartData.heart_counts).toBe("3"); //$ bigInt is string

    //   done();
    // });
    
  });
   
  //> OK
  describe("[j] postRepository.getPostCommentData", () => {

    // it("[1] getPostComment should get liked, heart_counts, (?) 1th-comment by orm seperate query", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* 3 comment for Post
    //   let bComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bPost.post_article_id,
    //       comment_text: `hurmoud love Tayebat ${auth_id} times`
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //* get heart-data for comment: heart_count,liked by seperate query
    //   let fCommentData: Comment;
    //   let fCError;
    //   try {
    //     fCommentData = await postRepository.getPostCommentData(bPost.post_article_id);
    //   } catch (error) {
    //     fCError = error;
    //     console.error('<fCommentData| fCError>', fCError);
    //   }

    //   console.warn("<wcmm| kasabe.spec| fCommentData>", fCommentData);
    //   expect(fCError).toBeUndefined();
    //   expect(fCommentData).toBeDefined();
    //   expect(fCommentData.comment_count).toBe("3"); 
     

    //   done();
    // });
    
  });
   
  //> OK
  describe("[jj] rateRepository.getRateCommentData", () => {

    // it("[1] getRateCommentData should get liked, heart_counts, (?) 1th-comment by orm seperate query", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* 3 comment for Post
    //   let bComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bPost.post_article_id,
    //       comment_text: `hurmoud love Tayebat ${auth_id} times`
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* 3 comment for Rate
    //   let bRateComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bRate.rate_article_id,
    //       comment_text: `${auth_id} times I said your rate is not fair!`,
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bRateComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //> get comment-data for rate: comment_count, 1st_comment
    //   let fRateData;
    //   let fRateError;
    //   try {
    //     fRateData = await rateRepository.getRateCommentData(bRate.rate_article_id);
    //   } catch (error) {
    //     fRateError = error;
    //     console.error('<fRateData| fRateError>', fRateError);
    //   }

    //   console.warn("<wcmm| kasabe.spec| fRateData>", fRateData);
    //   expect(fRateError).toBeUndefined();
    //   expect(fRateData).toBeDefined();
    //   expect(fRateData.comment_count).toBe("3"); 
     
    //   done();
    // });
    
  });
   
  //> OK
  describe("[k] postRepository.fetch01", () => {

    // it("[1] should get Post, liked, heart_counts, (?) comment_counts, 1th_comment", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //?:1 get post-data: posts, posts.heart-count, posts.liked, ...
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fPost;
    //   let fError;
    //   try {
    //     fPost = await postRepository.fetch01(bPost.post_id, bAuth.auth_id);
    //   } catch (error) {
    //     fError = error;
    //     console.error('<fetch05| error>', error);
    //   }

    //   console.warn("<kasabe.spec|f01| fPost>", fPost);

    //   `
    //   post_article: {
    //     article_id: 15,
    //     article_type: 'POST',
    //     heart_counts: '3',
    //     liked: true
    //   }
    //   `;
    //   // console.warn("<kasabe.spec| fPost[0]?.post_article>", fPost[0]?.article);
    //   expect(fPost).toBeDefined();
    //   expect(fPost.post_article).toBeDefined();
    //   expect(fPost.post_article.heart_counts).toBe('3');
    //   expect(fPost.post_article.liked).toBe(true);
    //   done();
    // });
    
  });
  
  //> OK
  describe("[kk] commentRepository.fetch01", () => {

    // it("[1] should get Comment, liked, heart_counts, (?) comment_counts, 1th_comment", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* post has 3 heart
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* Comment, comment
    //   const commentInput: BuildCommentInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bPost.post_article_id,
    //     comment_text: "hurmoud love Tayebat"
    //   };
    //   const bComment = await commentRepository.build(commentInput);
    //   // console.log("<build| bComment>", bComment);
    //   expect(bComment.comment_text).toBe(commentInput.comment_text);

    //   //* comment has 3 heart
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* rate has 3 heart
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //?:1 get post-data: posts, posts.heart-count, posts.liked, ...
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fComment;
    //   let fError;
    //   try {
    //     fComment = await commentRepository.fetch01(bComment.comment_id, bAuth.auth_id);
    //   } catch (error) {
    //     fError = error;
    //     console.error('<comment.rep| fetch01| error>', error);
    //   }

    //   console.warn("<kasabe.spec| comment.rep| f01| fComment>", fComment);

    //   `
    //   post_article: {
    //     article_id: 15,
    //     article_type: 'POST',
    //     heart_counts: '3',
    //     liked: true
    //   }
    //   `;
    //   // console.warn("<kasabe.spec| fComment[0]?.post_article>", fComment[0]?.article);
    //   expect(fComment).toBeDefined();
    //   expect(fComment.comment_article).toBeDefined();
    //   expect(fComment.comment_article.heart_counts).toBe('3');
    //   expect(fComment.comment_article.liked).toBe(true);
    //   done();
    // });
    
  });
   
  //> OK
  describe("[kkk] rateRepository.fetch01", () => {

    // it("[1] should get Rate, liked, heart_counts, (?) comment_counts, 1th_comment", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* 3 comment for Post
    //   let bComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bPost.post_article_id,
    //       comment_text: `hurmoud love Tayebat ${auth_id} times`
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* 3 comment for Rate
    //   let bRateComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bRate.rate_article_id,
    //       comment_text: `${auth_id} times I said your rate is not fair!`,
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bRateComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }


    
    //   //* check result

    //   //?:1 get rate-data: rates, rates.heart-count, rates.liked, ...
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fRate;
    //   let fRateError;
    //   try {
    //     fRate = await rateRepository.fetch01(bRate.rate_id, bAuth.auth_id);
    //   } catch (error) {
    //     fRateError = error;
    //     console.error('<rate.rep| fetch01| error>', error);
    //   }

    //   console.warn("<kasabe.spec| rate.rep| f01| fRate>", fRate);

    //   // console.warn("<kasabe.spec| fRate[0]?.post_article>", fRate[0]?.article);
    //   expect(fRate).toBeDefined();
    //   expect(fRate.rate_article).toBeDefined();
    //   expect(fRate.rate_article.heart_counts).toBe('3');
    //   expect(fRate.rate_article.liked).toBe(true);
    //   done();
    // });
    
  });
   
  //> OK return merchant includes: posts {post_data, liked, heart_count, comments: {1st_comment, comment_count}}
  //? support for rate
  describe("[l] merchantRepository.fetch04()", () => {

    // it("[1] should fetch Merchant with 10-post, post.liked, post.heart-count, post.1st-comment, post.comment-count", async done => {
    //   let loadError;
    //   try {
    //     await testUtils.loadSampleByCustomRepository([
    //       "Auth",
    //       "Tag",
    //       "Article",
    //       "MerchantCategory",
    //       "Merchant",
    //       "Post",
    //       "Comment",
    //       "Rate",
    //       "Heart",
    //     ]);
    //   } catch (error) {
    //     loadError = error;
    //     console.log('<kasabe.repository.spec| e| fetch02| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();

    //   //* auth, Auth
    //   const authInput: CreateAuthInput = {
    //     authname: "tayebat",
    //     password: "1234",
    //     auth_type: [AuthType.MERCHANT],
    //   };
    //   const bAuth = await authService.build(authInput);
    //   // console.log("<build| bAuth>", bAuth);
    //   expect(bAuth.authname).toBe(authInput.authname);

    //   //* tag, Tag
    //   const tagInput: BuildTagInput = {
    //     tag_title: "customer-lover"
    //   };
    //   const bTag = await tagRepository.build(tagInput);
    //   // console.log("<build| bTag>", bTag);
    //   expect(bTag.tag_title).toBe(tagInput.tag_title);
      
    //   //* merchantCategory, MerchantCategory
    //   // const merchantCategoryInput: BuildMerchantCategoryInput = {
    //   //   category_name: "Doors and Windows",
    //   //   category_description: "make iron doors and windows",
    //   //   // flag_merchant_id: "",
    //   //   parentId: 2,
    //   //   isActive: true,
    //   //   picture_url: ".jpg",
    //   // };
    //   // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
    //   // console.log("<build| bMerchantCategory>", bMerchantCategory);
    //   // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

    //   //* Merchant, merchant
    //   const merchantInput: BuildMerchantInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_title: "Tayebat",
    //     tiny_description: "Painting, Structure tools, chalk, ...",
    //     long_description: "we will associate you while building",
    //     contact_name: "Abdorrahim Tayebat",
    //     instagram_url: "instagram.com/Tayebat",
    //     number_call: "09194846922",
    //     number_whatsapp: "09194846922",
    //     number_telegram: "09194846922",
    //     bank_card_number:"1111222233334444",
    //     bank_card_details: "mellat bank name of ibrahim shahbazi",
    //     avatar_url: "30966443811696465.jpeg",
    //     header_url: "30966443811696465.jpeg",
    //     note: "Call me only from 8am to 8pm",
    //     location: "hormud",
    //     merchant_category_id: 1,
    //     tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
    //   };
    //   const bMerchant = await merchantRepository.build(merchantInput);
    //   // console.log("<build| bMerchant>", bMerchant);
    //   expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
    //   //* Heart, heart
    //   const heartInput: BuildHeartInput = {
    //     auth_id: bAuth.auth_id,
    //     article_id: bMerchant.article_id,
    //   };
    //   const bHeart = await heartRepository.build(heartInput);
    //   // console.log("<build| bHeart>", bHeart);
    //   expect(bHeart.article_id).toBe(heartInput.article_id);
      
    //   //* Post, post
    //   const postInput: BuildPostInput = {
    //     auth_id: bAuth.auth_id,
    //     merchant_id: bMerchant.merchant_id,
    //     picture_urls: ["30966443811696465.jpeg"],
    //     post_text: "1| Azadi Chalk recived...",
    //   };
    //   const bPost = await postRepository.build(postInput);
    //   // console.log("<build| bPost>", bPost);
    //   expect(bPost.post_text).toBe(postInput.post_text);

    //   //* another 10 post for bMerchant
    //   for(let i = 0; i<3; ++i ) {
    //     const postInput: BuildPostInput = {
    //       auth_id: bAuth.auth_id,
    //       merchant_id: bMerchant.merchant_id,
    //       picture_urls: ["30966443811696465.jpeg"],
    //       post_text: `${i+2}| Azadi Chalk recived...`,
    //     };

    //     try {
    //       const bPost = await postRepository.build(postInput);
    //       // console.log("<build| bPost>", bPost);
    //       expect(bPost.post_text).toBe(postInput.post_text);
    //     } catch (error) { }
        
    //   }

    //   //* 3 heart for post
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bPost.post_article_id,
    //     };

    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }
        
    //   }
      
    //   //* 3 comment for Post
    //   let bComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bPost.post_article_id,
    //       comment_text: `hurmoud love Tayebat ${auth_id} times`
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    //   //* 3 heart for comment
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bComment.comment_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* Rate, rate for merchant
    //   const rateInput: BuildRateInput = {
    //     auth_id: bAuth.auth_id,
    //     audience_article_id: bMerchant.article_id,
    //     rate_text: "You deserve 50 star",
    //     rate_stars: 5
    //   };
    //   const bRate = await rateRepository.build(rateInput);
    //   // console.log("<build| bRate>", bRate);
    //   expect(bRate.rate_text).toBe(rateInput.rate_text);

    //   //* another 10 rate for bMerchant
    //   for(let i = 0; i<3; ++i ) {
    //     const rateInput: BuildRateInput = {
    //       auth_id: bAuth.auth_id,
    //       audience_article_id: bMerchant.article_id,
    //       rate_text: "You deserve 50 star",
    //       rate_stars: 5
    //     };

    //     try {
    //       const bRat = await rateRepository.build(rateInput);
    //       // console.log("<build| bRat>", bRat);
    //       expect(bRat.rate_text).toBe(rateInput.rate_text);
    //     } catch (error) { }
        
    //   }

    //   //* 3 heart for rate
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const heartInput: BuildHeartInput = {
    //       auth_id: auth_id,
    //       article_id: bRate.rate_article_id,
    //     };
        
    //     try {
    //       const bHeart = await heartRepository.build(heartInput);
    //       expect(bHeart.article_id).toBe(heartInput.article_id);
    //     } catch (error) { }

    //   }

    //   //* 3 comment for Rate
    //   let bRateComment;
    //   for( const auth_id of [1, 2, bAuth.auth_id] ) {
    //     const commentInput: BuildCommentInput = {
    //       auth_id: auth_id,
    //       audience_article_id: bRate.rate_article_id,
    //       comment_text: `${auth_id} times I said your rate is not fair!`,
    //     };
        
    //     try {
    //       const bComent = await commentRepository.build(commentInput);
    //       if( auth_id === bAuth.auth_id) bRateComment = bComent; 
    //       expect(bComent.comment_text).toBe(commentInput.comment_text);
    //     } catch (error) { }

    //   }

    
    //   //* check result

    //   //?:1 get merchant-data: posts, posts.heart-count, posts.liked, ...
    //   const i: FetchMerchantInput = new FetchMerchantInput();
    //   i.auth_id = bAuth.auth_id;
    //   i.merchant_id = bMerchant.merchant_id;

    //   let fPosts;
    //   let fError;
    //   try {
    //     fPosts = await merchantRepository.fetch04(i);
    //   } catch (error) {
    //     fError = error;
    //     console.error('<fetch04| error>', error);
    //   }

    //   console.warn("<kasabe.spec|f04| fPosts>", JSON.stringify(fPosts, null, 2));
      
    //   // console.warn("<kasabe.spec| fPosts[0]?.post_article>", fPosts[0]?.article);
    //   expect(fPosts).toBeDefined();
    //   // expect(fPosts[0]?.post_article).toBeDefined();
    //   // expect(fResult[0].article.comments).toBeInstanceOf(Array);
    //   // expect(fResult[0].article.posts).toBeInstanceOf(Array);
    //   // expect(fResult[0].article.posts.length).toBe(1);
    //   // expect(fResult[0].article.posts[0].post_text).toBe(bPost.post_text);
    //   // expect(fResult[0].article.rates).toBeInstanceOf(Array);
    //   // expect(fResult[0].article.rates.length).toBe(1);
    //   // expect(fResult[0].article.rates[0].rate_stars).toBe(bRate.rate_stars);
      

    //   done();
    // });
    
  });
   
  // todo: adding rate computed column
  //? support for rate
  //> return merchant includes: posts {post_data, liked, heart_count, comments: {1st_comment, comment_count}}
  describe("[ll] merchantRepository.fetch05()", () => {

    it("[1] should fetch Merchant with 10-post, post.liked, post.heart-count, post.1st-comment, post.comment-count", async done => {
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
      } catch (error) {
        loadError = error;
        console.log('<kasabe.repository.spec| e| fetch02| error>', error);
      }
      expect(loadError).toBeUndefined();

      //* auth, Auth
      const authInput: CreateAuthInput = {
        authname: "tayebat",
        password: "1234",
        auth_type: [AuthType.MERCHANT],
      };
      const bAuth = await authService.build(authInput);
      // console.log("<build| bAuth>", bAuth);
      expect(bAuth.authname).toBe(authInput.authname);

      //* tag, Tag
      const tagInput: BuildTagInput = {
        tag_title: "customer-lover"
      };
      const bTag = await tagRepository.build(tagInput);
      // console.log("<build| bTag>", bTag);
      expect(bTag.tag_title).toBe(tagInput.tag_title);
      
      //* merchantCategory, MerchantCategory
      // const merchantCategoryInput: BuildMerchantCategoryInput = {
      //   category_name: "Doors and Windows",
      //   category_description: "make iron doors and windows",
      //   // flag_merchant_id: "",
      //   parentId: 2,
      //   isActive: true,
      //   picture_url: ".jpg",
      // };
      // const bMerchantCategory = await merchantCategoryRepository.build(merchantCategoryInput);
      // console.log("<build| bMerchantCategory>", bMerchantCategory);
      // expect(bMerchantCategory.category_name).toBe(merchantCategoryInput.category_name);
      

      //* Merchant, merchant
      const merchantInput: BuildMerchantInput = {
        auth_id: bAuth.auth_id,
        merchant_title: "Tayebat",
        tiny_description: "Painting, Structure tools, chalk, ...",
        long_description: "we will associate you while building",
        contact_name: "Abdorrahim Tayebat",
        instagram_url: "instagram.com/Tayebat",
        number_call: "09194846922",
        number_whatsapp: "09194846922",
        number_telegram: "09194846922",
        bank_card_number:"1111222233334444",
        bank_card_details: "mellat bank name of ibrahim shahbazi",
        avatar_url: "30966443811696465.jpeg",
        header_url: "30966443811696465.jpeg",
        note: "Call me only from 8am to 8pm",
        location: "hormud",
        merchant_category_id: 1,
        tag_titles: ["scaffolding", "painting", "chalk", "cement", "faramasons"] 
      };
      const bMerchant = await merchantRepository.build(merchantInput);
      // console.log("<build| bMerchant>", bMerchant);
      expect(bMerchant.merchant_title).toBe(merchantInput.merchant_title);
      
      //* Heart, heart
      const heartInput: BuildHeartInput = {
        auth_id: bAuth.auth_id,
        article_id: bMerchant.article_id,
      };
      const bHeart = await heartRepository.build(heartInput);
      // console.log("<build| bHeart>", bHeart);
      expect(bHeart.article_id).toBe(heartInput.article_id);
      
      //* Post, post
      const postInput: BuildPostInput = {
        auth_id: bAuth.auth_id,
        merchant_id: bMerchant.merchant_id,
        picture_urls: ["30966443811696465.jpeg"],
        post_text: "1| Azadi Chalk recived...",
      };
      const bPost = await postRepository.build(postInput);
      // console.log("<build| bPost>", bPost);
      expect(bPost.post_text).toBe(postInput.post_text);

      //* another 10 post for bMerchant
      for(let i = 0; i<3; ++i ) {
        const postInput: BuildPostInput = {
          auth_id: bAuth.auth_id,
          merchant_id: bMerchant.merchant_id,
          picture_urls: ["30966443811696465.jpeg"],
          post_text: `${i+2}| Azadi Chalk recived...`,
        };

        try {
          const bPost = await postRepository.build(postInput);
          // console.log("<build| bPost>", bPost);
          expect(bPost.post_text).toBe(postInput.post_text);
        } catch (error) { }
        
      }

      //* 3 heart for post
      for( const auth_id of [1, 2, bAuth.auth_id] ) {
        const heartInput: BuildHeartInput = {
          auth_id: auth_id,
          article_id: bPost.post_article_id,
        };

        try {
          const bHeart = await heartRepository.build(heartInput);
          expect(bHeart.article_id).toBe(heartInput.article_id);
        } catch (error) { }
        
      }
      
      //* 3 comment for Post
      let bComment;
      for( const auth_id of [1, 2, bAuth.auth_id] ) {
        const commentInput: BuildCommentInput = {
          auth_id: auth_id,
          audience_article_id: bPost.post_article_id,
          comment_text: `hurmoud love Tayebat ${auth_id} times`
        };
        
        try {
          const bComent = await commentRepository.build(commentInput);
          if( auth_id === bAuth.auth_id) bComment = bComent; 
          expect(bComent.comment_text).toBe(commentInput.comment_text);
        } catch (error) { }

      }

      //* 3 heart for comment
      for( const auth_id of [1, 2, bAuth.auth_id] ) {
        const heartInput: BuildHeartInput = {
          auth_id: auth_id,
          article_id: bComment.comment_article_id,
        };
        
        try {
          const bHeart = await heartRepository.build(heartInput);
          expect(bHeart.article_id).toBe(heartInput.article_id);
        } catch (error) { }

      }

      //* Rate, rate for merchant
      const rateInput: BuildRateInput = {
        auth_id: bAuth.auth_id,
        audience_article_id: bMerchant.article_id,
        rate_text: "You deserve 50 star",
        rate_stars: 5
      };
      const bRate = await rateRepository.build(rateInput);
      // console.log("<build| bRate>", bRate);
      expect(bRate.rate_text).toBe(rateInput.rate_text);

      //* another 10 rate for bMerchant
      for(let i = 0; i<3; ++i ) {
        const rateInput: BuildRateInput = {
          auth_id: bAuth.auth_id,
          audience_article_id: bMerchant.article_id,
          rate_text: "You deserve 50 star",
          rate_stars: 5
        };

        try {
          const bRat = await rateRepository.build(rateInput);
          // console.log("<build| bRat>", bRat);
          expect(bRat.rate_text).toBe(rateInput.rate_text);
        } catch (error) { }
        
      }

      //* 3 heart for rate
      for( const auth_id of [1, 2, bAuth.auth_id] ) {
        const heartInput: BuildHeartInput = {
          auth_id: auth_id,
          article_id: bRate.rate_article_id,
        };
        
        try {
          const bHeart = await heartRepository.build(heartInput);
          expect(bHeart.article_id).toBe(heartInput.article_id);
        } catch (error) { }

      }

      //* 3 comment for Rate
      let bRateComment;
      for( const auth_id of [1, 2, bAuth.auth_id] ) {
        const commentInput: BuildCommentInput = {
          auth_id: auth_id,
          audience_article_id: bRate.rate_article_id,
          comment_text: `${auth_id} times I said your rate is not fair!`,
        };
        
        try {
          const bComent = await commentRepository.build(commentInput);
          if( auth_id === bAuth.auth_id) bRateComment = bComent; 
          expect(bComent.comment_text).toBe(commentInput.comment_text);
        } catch (error) { }

      }

    
      //* check result

      //?:1 get merchant-data: posts, posts.heart-count, posts.liked, ...
      const i: FetchMerchantInput = new FetchMerchantInput();
      i.auth_id = bAuth.auth_id;
      i.merchant_id = bMerchant.merchant_id;

      let fPosts;
      let fError;
      try {
        fPosts = await merchantRepository.fetch05(i);
      } catch (error) {
        fError = error;
        console.error('<fetch05| error>', error);
      }

      console.warn("<kasabe.spec|f05| fPosts>", JSON.stringify(fPosts, null, 2));
      
      // console.warn("<kasabe.spec| fPosts[0]?.post_article>", fPosts[0]?.article);
      expect(fPosts).toBeDefined();
      // expect(fPosts[0]?.post_article).toBeDefined();
      // expect(fResult[0].article.comments).toBeInstanceOf(Array);
      // expect(fResult[0].article.posts).toBeInstanceOf(Array);
      // expect(fResult[0].article.posts.length).toBe(1);
      // expect(fResult[0].article.posts[0].post_text).toBe(bPost.post_text);
      // expect(fResult[0].article.rates).toBeInstanceOf(Array);
      // expect(fResult[0].article.rates.length).toBe(1);
      // expect(fResult[0].article.rates[0].rate_stars).toBe(bRate.rate_stars);
      

      done();
    }, 90000);
    
  });
   

  //$ not checked
  describe("[o] build()", () => {

    // it("[1] should create new Comment", async done => {

    //   //* samples
    //   // try {
    //   //   await testUtils.loadAllSamples();
    //   // } catch (error) {
    //   //   console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   // }

    //   //* auth
    //   const authCount = 2;
    //   const gAuths: Auth[] = [];
      
    //   for( const authInput of CreateAuthInputs.slice(0, authCount) ) {
    //     const gAuth = await authService.build(authInput);
    //     gAuths.push(gAuth);
    //   }
    //   // console.log("<b1| gAuths>", gAuths);
    //   expect(gAuths.length).toBe(2);
      
    //   //* article
    //   const articleCount = 6;
    //   const gArticles: Article[] = [];
      
    //   for( const articleInput of BuildArticleInputs.slice(0, articleCount) ) {
    //     const nArticle = await Article.of(articleInput);
    //     const gArticle = await Article.save(nArticle);
    //     gArticles.push(gArticle);
    //   }
    //   // console.log("<b1| gArticles>", gArticles);
    //   expect(gArticles.length).toBe(articleCount);

    //   //* tag
    //   const tagCount = 3;
    //   const gTags: Tag[] = [];
      
    //   for( const tagInput of BuildTagInputs.slice(0, tagCount) ) {
    //     const nTag = Tag.of(tagInput);
    //     const gTag = await Tag.save(nTag);
    //     gTags.push(gTag);
    //   }
    //   // console.log("<b1| gTags>", gTags);
    //   expect(gTags.length).toBe(3);
      
    //   //* merchantCategory
    //   const merchantCategoryCount = 2;
    //   const gMerchantCategorys: MerchantCategory[] = [];
      
    //   for( const merchantCategoryInput of BuildMerchantCategoryInputs.slice(0, merchantCategoryCount) ) {
    //     const nMerchantCategory = MerchantCategory.of(merchantCategoryInput);
    //     const gMerchantCategory = await MerchantCategory.save(nMerchantCategory);
    //     gMerchantCategorys.push(gMerchantCategory);
    //   }
    //   // console.log("<b1| gMerchantCategorys>", gMerchantCategorys);
    //   expect(gMerchantCategorys.length).toBe(merchantCategoryCount);
      
    //   //* merchant
    //   const merchantCount = 1;
    //   const gMerchants: Merchant[] = [];
      
    //   for( const merchantInput of BuildMerchantInputs.slice(0, merchantCount) ) {
    //     const gMerchant = await merchantRepository.build(merchantInput);
    //     gMerchants.push(gMerchant);
    //   }
    //   // console.log("<b1| build| gMerchants>", gMerchants);
    //   expect(gMerchants.length).toBe(merchantCount);
    //   expect(gMerchants[0]).toBeDefined();
    //   expect(gMerchants[0].merchant_id).toEqual(1);
    //   expect(gMerchants[0].merchant_title).toEqual(BuildMerchantInputs[0].merchant_title);
    

    //   //* comment
    //   const commentCount = 1;
    //   const gComments: Comment[] = [];
      
    //   for( const commentInput of BuildCommentInputs.slice(0, commentCount) ) {
    //     const gComment = await commentRepository.build(commentInput);
    //     gComments.push(gComment);
    //   }
    //   console.log("<b1| build| gComments>", gComments);
    //   expect(gComments.length).toBe(commentCount);
    //   expect(gComments[0]).toBeDefined();
    //   expect(gComments[0].comment_id).toEqual(1);
    //   expect(gComments[0].comment_text).toEqual(BuildCommentInputs[0].comment_text);
    //   // expect(gComments[0].article).toBeDefined();
    //   // expect(gComments[0].article_id).toEqual(1);

    //   done();
    // }, 900000);
    
  });
  
  describe("[b] merchantCreate()", () => {

    // it("[1] should create new Comment", async done => {

    //   //* auth
    //   const authCount = 2;
    //   const gAuths: Auth[] = [];
      
    //   for( const authInput of CreateAuthInputs.slice(0, authCount) ) {
    //     const gAuth = await authService.build(authInput);
    //     gAuths.push(gAuth);
    //   }
    //   // console.log("<b1| gAuths>", gAuths);
    //   expect(gAuths.length).toBe(2);

    //   //* tag
    //   const tagCount = 3;
    //   const gTags: Tag[] = [];
      
    //   for( const tagInput of BuildTagInputs.slice(0, tagCount) ) {
    //     const nTag = Tag.of(tagInput);
    //     const gTag = await Tag.save(nTag);
    //     gTags.push(gTag);
    //   }
    //   // console.log("<b1| gTags>", gTags);
    //   expect(gTags.length).toBe(3);
      
    //   //* merchantCategory
    //   const merchantCategoryCount = 2;
    //   const gMerchantCategorys: MerchantCategory[] = [];
      
    //   for( const merchantCategoryInput of BuildMerchantCategoryInputs.slice(0, merchantCategoryCount) ) {
    //     const nMerchantCategory = MerchantCategory.of(merchantCategoryInput);
    //     const gMerchantCategory = await MerchantCategory.save(nMerchantCategory);
    //     gMerchantCategorys.push(gMerchantCategory);
    //   }
    //   // console.log("<b1| gMerchantCategorys>", gMerchantCategorys);
    //   expect(gMerchantCategorys.length).toBe(merchantCategoryCount);
      
    //   //* merchant
    //   const merchantCount = 1;
    //   const gMerchants: Merchant[] = [];
      
    //   for( const merchantInput of BuildMerchantInputs.slice(0, merchantCount) ) {
    //     const gMerchant = await merchantRepository.build(merchantInput);
    //     gMerchants.push(gMerchant);
    //   }
    //   // console.log("<b1| build| gMerchants>", gMerchants);
    //   expect(gMerchants.length).toBe(merchantCount);
    //   expect(gMerchants[0]).toBeDefined();
    //   expect(gMerchants[0].merchant_id).toEqual(1);
    //   expect(gMerchants[0].merchant_title).toEqual(BuildMerchantInputs[0].merchant_title);
      
    //   //* comment
    //   const commentCount = 1;
    //   const gComments: Comment[] = [];
      
    //   for( const commentInput of BuildCommentInputs.slice(0, commentCount) ) {
    //     const gComment = await commentRepository.build(commentInput);
    //     gComments.push(gComment);
    //   }
    //   // console.log("<b1| build| gComments>", gComments);
    //   expect(gComments.length).toBe(commentCount);
    //   expect(gComments[0]).toBeDefined();
    //   expect(gComments[0].comment_id).toEqual(1);
    //   expect(gComments[0].comment_text).toEqual(BuildCommentInputs[0].comment_text);

    //   //* merchant
    //   const fMerchant = await merchantRepository.fetchById(gMerchants[0].merchant_id);
    //   // console.log("<comment.repository| b1 |fMerchant>", fMerchant);
    //   expect(fMerchant.comments).toBeInstanceOf(Array);
    //   expect(fMerchant.comments.length).toBe(1);
    //   expect(fMerchant.comments[0].comment_id).toBe(1);
    //   expect(fMerchant.comments[0].comment_text).toBe(BuildCommentInputs[0].comment_text);

    //   done();
    // }, 20000);
    
  });
  
  describe("[c] getMerchantCommentsForAuth01()", () => {

    // it("[1] comment_data: ✅, merchant_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fComment = await commentRepository.getMerchantCommentsForAuth01(1,1);
    //   console.log('<getMerchantCommentsForAuth01| fComment>', fComment);
    //   expect(fComment).toBeDefined();
    //   // expect(fComment).toBeInstanceOf(Array);

    //   done();
    // }, 20000);

  });
  
  describe("[d] getMerchantCommentsForAuth02()", () => {

    // it("[1] comment_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }

    //   const fComment = await commentRepository.getMerchantCommentsForAuth02(1,1);
    //   console.log('<getMerchantCommentsForAuth02| fComment>', fComment);
    //   expect(fComment).toBeDefined();
    //   expect(fComment).toBeInstanceOf(Array);
    //   expect(fComment[0].merchant).toBeUndefined();

    //   done();
    // }, 20000);

  });
  
  describe("[e] getMerchantCommentsForAuth03()", () => {

    // it("[1] comment_data: ✅, heart_data: ✅, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }

    //   const fResult03 = await commentRepository.getMerchantCommentsForAuth03(1,1);
    //   console.log('<getMerchantCommentsForAuth03| fResult03>', fResult03);
    //   expect(fResult03).toBeDefined();
    //   expect(fResult03).toBeInstanceOf(Array);
    //   expect(fResult03[0].heart_heart_id).toBe(1);

    //   done();

    // });
    
  });
  
  describe("[f] getMerchantCommentsForAuth04()", () => {

    // it("[1] comment_data: ✅, heart_data: ❌, heart_counts: ✅, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fResult04 = await commentRepository.getMerchantCommentsForAuth04(1,1);
    //   console.log('<getMerchantCommentsForAuth04| fResult04>', fResult04);
    //   expect(fResult04).toBeDefined();
    //   expect(fResult04).toBeInstanceOf(Array);
    //   expect(fResult04[0].heart_counts).toBe("0");
      
    //   done();
    // }, 20000);

  });
 
  describe("[g] getMerchantCommentsForAuth05()", () => {
    //! not-working
    // it("[1] should only return comment released by merchant-id 1", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   //// not working
    //   //// const fResult05 = await commentRepository.getMerchantCommentsForAuth05(1,1);
    //   //// console.log('<getMerchantCommentsForAuth05| fResult05>', fResult05);
    //   //// expect(fResult05).toBeDefined();
    //   //// expect(fResult05).toBeInstanceOf(Array);
    //   ////expect(fResult05[0].merchant).toBeUndefined();
      

    //   done();
    // }, 20000);

  });
  
  describe("[h] getMerchantCommentsForAuth06()", () => {

    // it("[1] comment_data: ✅, heart_counts: ✅, liked: ✅,", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<comment.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fResult06: Comment[] = await commentRepository.getMerchantCommentsForAuth06(1,1);
    //   console.log('<getMerchantCommentsForAuth06| fResult06>', fResult06);
    //   expect(fResult06).toBeDefined();
    //   expect(fResult06).toBeInstanceOf(Array);
    //   expect(fResult06[0].heart_count).toBe('2');
    //   expect(fResult06[0].liked).toBe(true);

    //   done();
    // }, 20000);

  });

  //! not-check below here
  describe("[c] merchantGetById()", () => {

    // it("[1] CR.merchantGetById(1) should return data", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('2|cgbi error: ', error);
    //     expect(error).toBeUndefined();
    //   }
      

    //   const fMerchant = await merchantRepository.merchantGetById(1);
    //   expect(fMerchant).toBeDefined();
    //   expect(fMerchant.merchant_fname).toEqual('saeid');
    //   done();
    // }, 20000);

    // it("[2] CR.merchantGetById(10) should return undefined", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('3|cgbi error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const fMerchant = await merchantRepository.merchantGetById(10);
    //   expect(fMerchant).toBeUndefined();

    //   done();
    // }, 20000);
    
  });
  
  describe("[d] merchantUpdate()", () => {

    // it("[1] should update", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('1|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const toUpdateMerchant: MerchantUpdateDto = {
    //     merchant_id: 1,
    //     merchant_fname: "updated saeid",
    //   };
      
    //   let uMerchant;
    //   try {
    //     uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   } catch (error) {
    //     console.log('1|su Error: ', error);
    //     expect(error).toBeUndefined();
    //   }
      
    //   expect(uMerchant).toBeDefined();
    //   expect(uMerchant.merchant_fname).toEqual('updated saeid');
    //   done();
    // }, 20000);
    
    // it("[2] merchant_id is invalid hence should throw error", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('2|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const toUpdateMerchant: MerchantUpdateDto = {
    //     merchant_id: 10,
    //     merchant_fname: "update saeid",
    //   };
      
    //   let uMerchant;
    //   try {
    //     uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   } catch (error) {
    //     expect(error).toBeDefined();
    //     // 🎯  TODO: import EntityNotFoundError
    //     expect(error).toBeInstanceOf(EntityNotFoundError);
    //     expect(error.message).toEqual(`Could not find any entity of type "Merchant" matching: ${toUpdateMerchant.merchant_id}`);
    //   }
      
    //   expect(uMerchant).toBeUndefined();

    //   done();
    // }, 20000);
    
    // it("[3] merchant_fname is invalid hence should throw error", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('3|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const toUpdateMerchant: MerchantUpdateDto = {
    //     merchant_id: 1,
    //     merchant_fname: "",
    //   };
      
    //   let uMerchant;
    //   try {
    //     uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   } catch (error) {
    //     expect(error).toBeDefined();
    //     expect(error).toBeInstanceOf(BadRequestException);
    //     expect(error.message).toEqual(`Validation failed!`);
    //   }
      
    //   expect(uMerchant).toBeUndefined();
    //   done();
    // }, 20000);
    
    // it("[4] merchant_mname is invalid hence should throw error", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('3|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const toUpdateMerchant: MerchantUpdateDto = {
    //     merchant_id: 1,
    //     merchant_mname: "",
    //   };
      
    //   let uMerchant;
    //   try {
    //     uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   } catch (error) {
    //     expect(error).toBeDefined();
    //     expect(error).toBeInstanceOf(BadRequestException);
    //     expect(error.message).toEqual(`Validation failed!`);
    //   }
      
    //   expect(uMerchant).toBeUndefined();
    //   done();
    // }, 20000);
    
    // it("[5] 🎯 phone is invalid hence should throw error", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('3|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   // const toUpdateMerchant: MerchantUpdateDto = {
    //   //   merchant_id: 1,
    //   //   merchant_mname: "",
    //   // };
      
    //   // let uMerchant;
    //   // try {
    //   //   uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   // } catch (error) {
    //   //   expect(error).toBeDefined();
    //   //   expect(error).toBeInstanceOf(BadRequestException);
    //   //   expect(error.message).toEqual(`Validation failed!`);
    //   // }
      
    //   // expect(uMerchant).toBeUndefined();
    //   done();
    // }, 20000);

    // it("[6] email is invalid hence should throw error", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('3|cu error: ', error);
    //     expect(error).toBeUndefined();
    //   }

    //   const toUpdateMerchant: MerchantUpdateDto = {
    //     merchant_id: 1,
    //     email: "saeid@gmailcom",
    //   };
      
    //   let uMerchant;
    //   try {
    //     uMerchant = await merchantRepository.merchantUpdate(toUpdateMerchant);
    //   } catch (error) {
    //     expect(error).toBeDefined();
    //     expect(error).toBeInstanceOf(BadRequestException);
    //     expect(error.message).toEqual(`Validation failed!`);
    //   }
      
    //   expect(uMerchant).toBeUndefined();
    //   done();
    // }, 20000);
    
  });

  describe("[e] merchantGetByRoomId()", () => {

    // it("[1] CR.merchantsGetByRoomId(1) should return []", async done => {

    //   try {
    //     // await testUtils.reloadAllSamples();
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('2|cgbi error: ', error.message);
    //     expect(error).toBeUndefined();
    //   }
      
    //   const fMerchants = await merchantRepository.merchantsGetByRoomId(1);
    //   expect(fMerchants).toBeDefined();
    //   expect(fMerchants.length).toEqual(3);
    //   expect(fMerchants[0].merchant_fname).toEqual("saeid");
    //   expect(fMerchants[1].merchant_fname).toEqual("hamid");
    //   expect(fMerchants[2].merchant_fname).toEqual("asity");

      
    //   done();
    // }, 20000);
    
    // it("[2] CR.merchantsGetByRoomId(1) should return []", async done => {
      
    //   const fMerchants = await merchantRepository.merchantsGetByRoomId(1);
    //   expect(fMerchants).toEqual([]);
      
    //   done();
    // }, 20000);
    
  });



})
