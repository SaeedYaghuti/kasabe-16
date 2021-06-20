import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Test } from "@nestjs/testing";
import { MerchantRepository } from "./merchant.repository";
import { DatabaseService } from '../../../database/database.service';
import { DatabaseModule } from '../../../database/database.module';
import { TestUtils } from '../../../test/test.utils';
import { EntitiesSeed } from '../../../test/fixtures/_entities';
import { BadRequestException } from "@nestjs/common";
import { AuthModule } from '../../../auth/auth.module';
import { AuthService } from '../../../auth/auth.service';
import { AuthRepository } from "../../../auth/auth/auth.repository";
import { AccessControlModule } from 'nest-access-control';
import { roles } from '../../../auth/auth.roles';
import { MerchantCategoryRepository } from '../merchant_category/merchant_category.repository';
import { BuildMerchantInputs } from '../../../test/fixtures/kasabe/merchant/build.merchant.inputs';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from "../tag/tag.entity";
import { TagRepository } from '../tag/tag.repository';
import { BuildTagInputs } from '../../../test/fixtures/kasabe/tag/build.tag.inputs';
import { MerchantCategory } from '../merchant_category/merchant_category.entity';
import { BuildMerchantCategoryInputs } from '../../../test/fixtures/kasabe/merchant_category/build.merchant_category.inputs';
import { Merchant } from './merchant.entity';
import { PersonRepository } from "../person/person.repository";
import { CommentRepository } from '../comment/comment.repository';
import { RateRepository } from '../rate/rate.repository';
import { HeartRepository } from '../heart/heart.repository';
import { Post } from '../post/post.entity';
import { BuildPostInputs } from "../../../test/fixtures/kasabe/post/build.post.inputs";
import { PostRepository } from '../post/post.repository';
import { BuildAuthInputs } from '../../../test/fixtures/auth/build.auth.inputs';
import { Article } from '../article/article.entity';
import { BuildArticleInputs } from '../../../test/fixtures/kasabe/article/build.article.inputs';
import { Comment } from '../comment/comment.entity';
import { BuildCommentInputs } from '../../../test/fixtures/kasabe/comment/build.comment.inputs';
import { ArticleRepository } from '../article/article.repository';
import { BuildRateInputs } from '../../../test/fixtures/kasabe/rate/build.rate.inputs';
import { Rate } from '../rate/rate.entity';
import { BuildHeartInputs } from '../../../test/fixtures/kasabe/heart/build.heart.inputs';
import { Heart } from '../heart/heart.entity';

jest.setTimeout(90000);

describe("merchant.repository.spec.ts", () => {
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
      // await testUtils.cleanAllSamples();
      await testUtils.cleanDB();
    } catch (error) {
      console.log('<<c.r.s>> cleanDB error: ', error);
    }
    done();
  });
 
  afterEach(async done => {
    await testUtils.closeDbConnection();
    done();
  });

  describe("[a] Variables()", () => {
    //#region  passed
    // it("[1] testUtils", async done => {
    //   expect(testUtils).toBeDefined();

    //   done();
    // }, 20000);
    
    // it("[2] merchantRepository", async done => {
    //   expect(merchantRepository).toBeDefined();
    //   expect(merchantRepository).toBeInstanceOf(MerchantRepository);

    //   done();
    // }, 20000);
 
    // it("[3] merchantCategoryRepository", async done => {
    //   expect(merchantCategoryRepository).toBeDefined();
    //   expect(merchantCategoryRepository).toBeInstanceOf(MerchantCategoryRepository);

    //   done();
    // }, 20000);

    // it("[4] tagRepository", async done => {
    //   expect(tagRepository).toBeDefined();
    //   expect(tagRepository).toBeInstanceOf(TagRepository);

    //   done();
    // }, 20000);
   
    // it("[5] commentRepository", async done => {
    //   expect(commentRepository).toBeDefined();
    //   expect(commentRepository).toBeInstanceOf(CommentRepository);
    //   done();
    // }, 20000);
    
    // it("[6] rateRepository", async done => {
    //   expect(rateRepository).toBeDefined();
    //   expect(rateRepository).toBeInstanceOf(RateRepository);
    //   done();
    // }, 20000);
    
    // it("[7] heartRepository", async done => {
    //   expect(heartRepository).toBeDefined();
    //   expect(heartRepository).toBeInstanceOf(HeartRepository);
    //   done();
    // }, 20000);
    
    // it("[5] authService", async done => {
    //   expect(authService).toBeDefined();
    //   expect(authService).toBeInstanceOf(AuthService);

    //   done();
    // }, 20000);

  });

  //! reference
  describe("[b] loadSampleByCustomRepository()", () => {

    // it("[1] should load custom inputs successfully", async done => {
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
    //     console.log('<post.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }

    //   //* auth, Auth
    //   const authCount = BuildAuthInputs.length;
    //   const gAuth = await Auth.findAndCount();
    //   // console.log('<merchant.repository.spec| gAuth>', gAuth);
    //   expect(gAuth[1]).toBe(authCount);

    //   //* tag, Tag
    //   const tagCount = BuildTagInputs.length;
    //   const gTag = await Tag.findAndCount();
    //   // console.log('<post.repository.spec| gTag>', gTag);
    //   /// tag itself contain 3 element, but merchant make some new tags
    //   expect(gTag[1]).toBeGreaterThanOrEqual(tagCount);
      
      
    //   //* article, Article
    //   const articleCount = BuildArticleInputs.length;
    //   // const gArticle = await Article.findAndCount();
    //   const gArticle = await articleRepository.fetch();
    //   console.warn('<post.repository.spec| gArticle>', gArticle);
    //   //> post will meke some new articles
    //   expect(gArticle.length).toBeGreaterThanOrEqual(articleCount);
      
    //   //* merchantCategory, MerchantCategory
    //   const merchantCategoryCount = BuildMerchantCategoryInputs.length;
    //   const gMerchantCategory = await MerchantCategory.findAndCount();
    //   /// console.log('<post.repository.spec| gMerchantCategory>', gMerchantCategory);
    //   expect(gMerchantCategory[1]).toBe(merchantCategoryCount);
      
    //   //* merchant, Merchant
    //   const merchantCount = BuildMerchantInputs.length;
    //   const gMerchant = await Merchant.findAndCount();
    //   console.log('<post.repository.spec| gMerchant>', gMerchant);
    //   expect(gMerchant[1]).toBe(merchantCount);
    
    //   //* post, Post
    //   const postCount = BuildPostInputs.length;
    //   const gPost = await Post.findAndCount();
    //   console.log('<post.repository.spec| gPost>', gPost);
    //   expect(gPost[1]).toBe(postCount);
      
    //   //* comment, Comment
    //   const commentCount = BuildCommentInputs.length;
    //   const gComment = await Comment.findAndCount();
    //   console.log('<comment.repository.spec| gComment>', gComment);
    //   expect(gComment[1]).toBe(commentCount);
    
    //   //* rate, Rate
    //   const rateCount = BuildRateInputs.length;
    //   const gRate = await Rate.findAndCount();
    //   console.log('<rate.repository.spec| gRate>', gRate);
    //   expect(gRate[1]).toBe(rateCount);
      
    //   //* heart, Heart
    //   const heartCount = BuildHeartInputs.length;
    //   const gHeart = await Heart.findAndCount();
    //   console.log('<heart.repository.spec| gHeart>', gHeart);
    //   expect(gHeart[1]).toBe(heartCount);
    

    //   expect(loadError).toBeUndefined();

    //   done();
    // });
    
  });
  
  describe("[c] build()", () => {

    // it("[1] should create new Merchant", async done => {

    //   //* auth
    //   const authCount = 2;
    //   const gAuths: Auth[] = [];
      
    //   for( const authInput of BuildAuthInputs.slice(0, authCount) ) {
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

    //   //* post
    //   const postCount = 1;
    //   const gPosts: Post[] = [];
    
    //   for( const postInput of BuildPostInputs.slice(0, postCount) ) {
    //     const gPost = await postRepository.build(postInput);
    //     gPosts.push(gPost);
    //   }
    //   console.log("<b1| build| gPosts>", gPosts);
    //   expect(gPosts.length).toBe(postCount);
    //   expect(gPosts[0]).toBeDefined();
    //   expect(gPosts[0].post_id).toEqual(1);
    //   expect(gPosts[0].post_text).toEqual(BuildPostInputs[0].post_text);
    //   expect(gPosts[0].article).toBeDefined();
    //   expect(gPosts[0].article_id).toEqual(1);

    //   done();
    // }, 20000);
    
  });

  describe("[d] fetchById()", () => {

    // it("[1] should load customRepository inputs successfully", async done => {
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
    //     console.log('<post.repository.spec| loadSampleByCustomRepository| error>', error);
    //   }
    //   expect(loadError).toBeUndefined();
      
    //   //* article, Article
    //   const articleCount = BuildArticleInputs.length;
    //   // const gArticle = await Article.findAndCount();
    //   const gArticle = await articleRepository.fetch();
    //   console.warn('<post.repository.spec| gArticle>', gArticle);
    //   //> post will meke some new articles
    //   expect(gArticle.length).toBeGreaterThanOrEqual(articleCount);
      
    //   //* merchant, Merchant
    //   const merchantCount = BuildMerchantInputs.length;
    //   const fMerchants = await merchantRepository.fetchById(1);
    //   console.log('<post.repository.spec| gMerchant>', fMerchants);
   
    //   expect(fMerchants).toBeDefined();

    //   expect(fMerchants.tags).toBeDefined();
    //   expect(fMerchants.tags.length).toBe(2);

    //   expect(fMerchants.article).toBeDefined();
    //   expect(fMerchants.article.posts).toBeDefined();
    //   expect(fMerchants.article.posts.length).toBe(2);
    
    //   done();
    // });
  
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
