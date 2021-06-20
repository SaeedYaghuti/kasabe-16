import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";

import { Test } from "@nestjs/testing";
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
import { PersonRepository } from "../person/person.repository";
import { PostRepository } from './post.repository';
import { MerchantRepository } from '../merchant/merchant.repository';
import { Merchant } from '../merchant/merchant.entity';
import { Post } from './post.entity';
import { BuildPostInputs } from '../../../test/fixtures/kasabe/post/build.post.inputs';
import { BuildHeartInputs } from '../../../test/fixtures/kasabe/heart/build.heart.inputs';
import { HeartRepository } from '../heart/heart.repository';
import { Heart } from '../heart/heart.entity';
import { BuildAuthInputs } from '../../../test/fixtures/auth/build.auth.inputs';
import { BuildArticleInputs } from "../../../test/fixtures/kasabe/article/build.article.inputs";
import { BuildCommentInputs } from "../../../test/fixtures/kasabe/comment/build.comment.inputs";
import { BuildRateInputs } from "../../../test/fixtures/kasabe/rate/build.rate.inputs";
import { Comment } from "../comment/comment.entity";
import { RateRepository } from '../rate/rate.repository';
import { CommentRepository } from '../comment/comment.repository';
import { ArticleRepository } from '../article/article.repository';
import { Rate } from '../rate/rate.entity';

jest.setTimeout(90000);

describe("post.repository.spec.ts", () => {
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
      //// await testUtils.cleanAllSamples();
      await testUtils.cleanEntities();
    } catch (error) {
      console.log('<<post.repository.ts>> cleanEntities error: ', error);
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
    
    // it("[6] postRepository", async done => {
    //   expect(postRepository).toBeDefined();
    //   expect(postRepository).toBeInstanceOf(PostRepository);
    //   done();
    // }, 20000);
    
    

  });

  //! reference
  describe("[b] loadSampleByCustomRepository()", () => {

    // it("[1] should load inputs by using customRepository successfully", async done => {
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
  
  describe("[c] fetch Post with hearts, comments, rates", () => {

    it("[1] should fetch Post with hearts, comments, rates", async done => {
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
        console.log('<post.repository.spec| loadSampleByCustomRepository| error>', error);
      }

      //* article, Article
      const articleCount = BuildArticleInputs.length;
      // const gArticle = await Article.findAndCount();
      const gArticle = await articleRepository.fetch();
      console.warn('<warn4| post.repository.spec| gArticle>', gArticle);
      //> post will meke some new articles
      expect(gArticle.length).toBeGreaterThanOrEqual(articleCount);
      

      //* post, Post
      const postCount = BuildPostInputs.length;
      const fPost = await postRepository.fetchById(1);
      console.log('<post.repository.spec| fPost>', fPost);

      expect(fPost).toBeDefined();
      expect(fPost.post_article).toBeDefined();
      expect(fPost.post_article.comments.length).toBe(2);
      expect(fPost.post_article.hearts.length).toBe(2);

      //* auth, Auth
      // const authCount = BuildAuthInputs.length;
      // const gAuth = await Auth.findAndCount();
      // // console.log('<merchant.repository.spec| gAuth>', gAuth);
      // expect(gAuth[1]).toBe(authCount);

      //* tag, Tag
      // const tagCount = BuildTagInputs.length;
      // const gTag = await Tag.findAndCount();
      // // console.log('<post.repository.spec| gTag>', gTag);
      // /// tag itself contain 3 element, but merchant make some new tags
      // expect(gTag[1]).toBeGreaterThanOrEqual(tagCount);
      
      //* merchantCategory, MerchantCategory
      // const merchantCategoryCount = BuildMerchantCategoryInputs.length;
      // const gMerchantCategory = await MerchantCategory.findAndCount();
      // /// console.log('<post.repository.spec| gMerchantCategory>', gMerchantCategory);
      // expect(gMerchantCategory[1]).toBe(merchantCategoryCount);
      
      //* merchant, Merchant
      // const merchantCount = BuildMerchantInputs.length;
      // const gMerchant = await Merchant.findAndCount();
      // console.log('<post.repository.spec| gMerchant>', gMerchant);
      // expect(gMerchant[1]).toBe(merchantCount);
    
      // //* post, Post
      // const postCount = BuildPostInputs.length;
      // const gPost = await Post.findAndCount();
      // console.log('<post.repository.spec| gPost>', gPost);
      // expect(gPost[1]).toBe(postCount);
      
      // //* comment, Comment
      // const commentCount = BuildCommentInputs.length;
      // const gComment = await Comment.findAndCount();
      // console.log('<comment.repository.spec| gComment>', gComment);
      // expect(gComment[1]).toBe(commentCount);
    
      // //* rate, Rate
      // const rateCount = BuildRateInputs.length;
      // const gRate = await Rate.findAndCount();
      // console.log('<rate.repository.spec| gRate>', gRate);
      // expect(gRate[1]).toBe(rateCount);
      
      // //* heart, Heart
      // const heartCount = BuildHeartInputs.length;
      // const gHeart = await Heart.findAndCount();
      // console.log('<heart.repository.spec| gHeart>', gHeart);
      // expect(gHeart[1]).toBe(heartCount);
    

      expect(loadError).toBeUndefined();

      done();
    });
    
  });
    
  describe("[b] build()", () => {

    // it("[1] should create new Post", async done => {

    //   //* samples
    //   // try {
    //   //   await testUtils.loadAllSamples();
    //   // } catch (error) {
    //   //   console.log('<post.repository.spec| loadAllSamples error>', error);
    //   // }

    //      //* auth
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
    // }, 900000);
    
  });
  
  describe("[b] merchantCreate()", () => {

    // it("[1] should create new Post", async done => {

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
      
    //   //* post
    //   const postCount = 1;
    //   const gPosts: Post[] = [];
      
    //   for( const postInput of BuildPostInputs.slice(0, postCount) ) {
    //     const gPost = await postRepository.build(postInput);
    //     gPosts.push(gPost);
    //   }
    //   // console.log("<b1| build| gPosts>", gPosts);
    //   expect(gPosts.length).toBe(postCount);
    //   expect(gPosts[0]).toBeDefined();
    //   expect(gPosts[0].post_id).toEqual(1);
    //   expect(gPosts[0].post_text).toEqual(BuildPostInputs[0].post_text);

    //   //* merchant
    //   const fMerchant = await merchantRepository.fetchById(gMerchants[0].merchant_id);
    //   // console.log("<post.repository| b1 |fMerchant>", fMerchant);
    //   expect(fMerchant.posts).toBeInstanceOf(Array);
    //   expect(fMerchant.posts.length).toBe(1);
    //   expect(fMerchant.posts[0].post_id).toBe(1);
    //   expect(fMerchant.posts[0].post_text).toBe(BuildPostInputs[0].post_text);

    //   done();
    // }, 20000);
    
  });
  
  describe("[c] getMerchantPostsForAuth01()", () => {

    // it("[1] post_data: ✅, merchant_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fPost = await postRepository.getMerchantPostsForAuth01(1,1);
    //   console.log('<getMerchantPostsForAuth01| fPost>', fPost);
    //   expect(fPost).toBeDefined();
    //   // expect(fPost).toBeInstanceOf(Array);

    //   done();
    // }, 20000);

  });
  
  describe("[d] getMerchantPostsForAuth02()", () => {

    // it("[1] post_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }

    //   const fPost = await postRepository.getMerchantPostsForAuth02(1,1);
    //   console.log('<getMerchantPostsForAuth02| fPost>', fPost);
    //   expect(fPost).toBeDefined();
    //   expect(fPost).toBeInstanceOf(Array);
    //   expect(fPost[0].merchant).toBeUndefined();

    //   done();
    // }, 20000);

  });
  
  describe("[e] getMerchantPostsForAuth03()", () => {

    // it("[1] post_data: ✅, heart_data: ✅, heart_counts: ❌, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }

    //   const fResult03 = await postRepository.getMerchantPostsForAuth03(1,1);
    //   console.log('<getMerchantPostsForAuth03| fResult03>', fResult03);
    //   expect(fResult03).toBeDefined();
    //   expect(fResult03).toBeInstanceOf(Array);
    //   expect(fResult03[0].heart_heart_id).toBe(1);

    //   done();

    // });
    
  });
  
  describe("[f] getMerchantPostsForAuth04()", () => {

    // it("[1] post_data: ✅, heart_data: ❌, heart_counts: ✅, liked: ❌", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fResult04 = await postRepository.getMerchantPostsForAuth04(1,1);
    //   console.log('<getMerchantPostsForAuth04| fResult04>', fResult04);
    //   expect(fResult04).toBeDefined();
    //   expect(fResult04).toBeInstanceOf(Array);
    //   expect(fResult04[0].heart_counts).toBe("0");
      
    //   done();
    // }, 20000);

  });
 
  describe("[g] getMerchantPostsForAuth05()", () => {
    //! not-working
    // it("[1] should only return post released by merchant-id 1", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   //// not working
    //   //// const fResult05 = await postRepository.getMerchantPostsForAuth05(1,1);
    //   //// console.log('<getMerchantPostsForAuth05| fResult05>', fResult05);
    //   //// expect(fResult05).toBeDefined();
    //   //// expect(fResult05).toBeInstanceOf(Array);
    //   ////expect(fResult05[0].merchant).toBeUndefined();
      

    //   done();
    // }, 20000);

  });
  
  describe("[h] getMerchantPostsForAuth06()", () => {

    // it("[1] post_data: ✅, heart_counts: ✅, liked: ✅,", async done => {

    //   try {
    //     await testUtils.loadAllSamples();
    //   } catch (error) {
    //     console.log('<post.repository.spec| loadAllSamples error>', error);
    //   }
      
    //   const fResult06: Post[] = await postRepository.getMerchantPostsForAuth06(1,1);
    //   console.log('<getMerchantPostsForAuth06| fResult06>', fResult06);
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
