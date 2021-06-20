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
import { CommentRepository } from './comment.repository';
import { MerchantRepository } from '../merchant/merchant.repository';
import { Merchant } from '../merchant/merchant.entity';
import { Comment } from './comment.entity';
import { BuildHeartInputs } from '../../../test/fixtures/kasabe/heart/build.heart.inputs';
import { HeartRepository } from '../heart/heart.repository';
import { Heart } from '../heart/heart.entity';
import { BuildCommentInputs } from '../../../test/fixtures/kasabe/comment/build.comment.inputs';
import { Article } from '../article/article.entity';
import { BuildArticleInputs } from '../../../test/fixtures/kasabe/article/build.article.inputs';
import { PostRepository } from '../post/post.repository';
import { ArticleRepository } from '../article/article.repository';
import { RateRepository } from '../rate/rate.repository';
import { BuildPostInputs } from '../../../test/fixtures/kasabe/post/build.post.inputs';
import { BuildRateInputs } from '../../../test/fixtures/kasabe/rate/build.rate.inputs';
import { Rate } from '../rate/rate.entity';
import { BuildAuthInputs } from '../../../test/fixtures/auth/build.auth.inputs';
import { Post } from '../post/post.entity';
import { BuildCommentInput } from './dto/create_comment.input';
import { BuildAuthInput } from '../../../auth/dto/build.auth.input';
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import { AuthType } from '../../../auth/auth/auth_type.enum';
import { CreateAuthInput } from '../../../auth/auth/dto/create.auth.input';
import { BuildTagInput } from '../tag/dto/create_tag.input';
import { BuildMerchantCategoryInput } from '../merchant_category/dto/create_merchant_category.input';
import { BuildMerchantInput } from '../merchant/dto/create_merchant.input';
import { BuildPostInput } from '../post/dto/create_post.input';

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
    
    it("[1] testUtils", async done => {
      expect(testUtils).toBeDefined();
      done();
    }, 20000);

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
  describe("[c] build and fetch comment", () => {

    it("[1] should biuld and fetch Comment with hearts, comments, rates(?)", async done => {
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
        console.log('<comment.repository.spec| loadSampleByCustomRepository| error>', error);
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
      
      //* Post, post
      const postInput: BuildPostInput = {
        auth_id: bAuth.auth_id,
        merchant_id: bMerchant.merchant_id,
        picture_urls: ["30966443811696465.jpeg"],
        post_text: "Azadi Chalk recived...",
      };
      const bPost = await postRepository.build(postInput);
      // console.log("<build| bPost>", bPost);
      expect(bPost.post_text).toBe(postInput.post_text);
      
      //* Comment, comment
      const commentInput: BuildCommentInput = {
        auth_id: bAuth.auth_id,
        audience_article_id: bPost.post_article_id,
        comment_text: "hurmoud love Tayebat"
      };
      const bComment = await commentRepository.build(commentInput);
      // console.log("<build| bComment>", bComment);
      expect(bComment.comment_text).toBe(commentInput.comment_text);

      //* check result
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
      // console.log("<build| fPost>", fPost);
      // console.log("<build| fPost.post_article.comments[0]>", fPost.post_article.comments[0]);
      expect(fPost).toBeDefined();
      expect(fPost.post_article.comments).toBeDefined();
      expect(fPost.post_article.comments[0].comment_text).toBe(bComment.comment_text);
      

      done();
    });
    
  });
    

  //$ not checked
  describe("[b] build()", () => {

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
