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
import { BuildAuthInputs } from '../../../test';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from "../tag/tag.entity";
import { TagRepository } from '../tag/tag.repository';
import { BuildTagInputs } from '../../../test/fixtures/kasabe/tag/build.tag.inputs';
import { MerchantCategory } from '../merchant_category/merchant_category.entity';
import { BuildMerchantCategoryInputs } from '../../../test/fixtures/kasabe/merchant_category/build.merchant_category.inputs';
import { PersonRepository } from "../person/person.repository";
import { SeenRepository } from './seen.repository';
import { MerchantRepository } from '../merchant/merchant.repository';
import { Merchant } from '../merchant/merchant.entity';
import { BuildSeenInputs } from '../../../test/fixtures/kasabe/seen/build.seen.inputs';
import { PostRepository } from "../post/post.repository";
import { Post } from '../post/post.entity';
import { BuildPostInputs } from '../../../test/fixtures/kasabe/post/build.post.inputs';
import { Seen } from './seen.entity';

jest.setTimeout(90000);

//$ not checked
describe("post.repository.spec.ts", () => {
  let testUtils: TestUtils;
  let authService: AuthService;

  let merchantRepository: MerchantRepository;
  let merchantCategoryRepository: MerchantCategoryRepository;
  let tagRepository: TagRepository;
  let postRepository: PostRepository;
  let seenRepository: SeenRepository;

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
        MerchantRepository,
        PostRepository,
        SeenRepository,
        
        AuthService,
      ]
    }).compile()

    testUtils = module.get<TestUtils>(TestUtils);
    authService = module.get<AuthService>(AuthService);

    try {
      merchantRepository = testUtils.databaseService.connection.getCustomRepository(MerchantRepository);
      merchantCategoryRepository = testUtils.databaseService.connection.getCustomRepository(MerchantCategoryRepository);
      tagRepository = testUtils.databaseService.connection.getCustomRepository(TagRepository);
      postRepository = module.get<PostRepository>(PostRepository);
      seenRepository = module.get<SeenRepository>(SeenRepository);
    } catch (error) {
      console.error('merchantRepository| error>', error);
    }
    
    // merchantRepository = testUtils.databaseService.connection.getCustomRepository(MerchantRepository);

    done();
  });

  beforeEach(async done => {
    try {
      // await testUtils.reloadAllSamples();
      await testUtils.cleanAllSamples();
      // await testUtils.reloadAllSamples();
    } catch (error) {
      console.log('<<seen.repository.ts>> cleanAllSamples error: ', error);
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
    
    // it("[6] seenRepository", async done => {
    //   expect(seenRepository).toBeDefined();
    //   expect(seenRepository).toBeInstanceOf(SeenRepository);
    //   done();
    // }, 20000);
    
    

  });

  describe("[b] seenCreate()", () => {

    // it("[1] should create new Seen", async done => {
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

    //   //* seen
    //   const seenCount = 2;
    //   const gSeens: Seen[] = [];
      
    //   for( const seenInput of BuildSeenInputs.slice(0, seenCount) ) {
    //     const gSeen = await seenRepository.build(seenInput);
    //     gSeens.push(gSeen);
    //   }
    //   // console.log("<b1| build| gSeens>", gSeens);
    //   expect(gSeens.length).toBe(seenCount);
    //   expect(gSeens[0]).toBeDefined();
    //   expect(gSeens[0].seen_id).toEqual(1);
    //   expect(gSeens[0].auth_id).toEqual(1);
    //   expect(gSeens[0].post_id).toEqual(1);

    //   done();
    // }, 20000);

  });
  
  describe("[c] seenCount()", () => {

    // it("[1] should count post seens", async done => {
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

    //   //* seen
    //   const seenCount = 2;
    //   const gSeens: Seen[] = [];
      
    //   for( const seenInput of BuildSeenInputs.slice(0, seenCount) ) {
    //     const gSeen = await seenRepository.build(seenInput);
    //     gSeens.push(gSeen);
    //   }
    //   // console.log("<b1| build| gSeens>", gSeens);
    //   expect(gSeens.length).toBe(seenCount);
    //   expect(gSeens[0]).toBeDefined();
    //   expect(gSeens[0].seen_id).toEqual(1);
    //   expect(gSeens[0].auth_id).toEqual(1);
    //   expect(gSeens[0].post_id).toEqual(1);
      
    //   //* seen-count
    //   const countSeen = await seenRepository.countPostSeen(1);

    //   expect(countSeen).toBe(2);

    //   done();
    // }, 20000);

  });
  
  describe("[d] did-I-seen()", () => {

    // it("[1] should return true", async done => {
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

    //   //* seen
    //   const seenCount = 2;
    //   const gSeens: Seen[] = [];
      
    //   for( const seenInput of BuildSeenInputs.slice(0, seenCount) ) {
    //     const gSeen = await seenRepository.build(seenInput);
    //     gSeens.push(gSeen);
    //   }
    //   // console.log("<b1| build| gSeens>", gSeens);
    //   expect(gSeens.length).toBe(seenCount);
    //   expect(gSeens[0]).toBeDefined();
    //   expect(gSeens[0].seen_id).toEqual(1);
    //   expect(gSeens[0].auth_id).toEqual(1);
    //   expect(gSeens[0].post_id).toEqual(1);
      
    //   //* seen-count
    //   const countSeen = await seenRepository.countPostSeen(1);

    //   expect(countSeen).toBe(2);
      
    //   //* didISeen
    //   const did = await seenRepository.didISeen(1, 1);

    //   expect(did).toBe(true);

    //   done();
    // }, 20000);

  });
  
  describe("[e] post relation with seen", () => {

    it("[1] post should contains all seen", async done => {
      //* auth
      const authCount = 2;
      const gAuths: Auth[] = [];
      
      for( const authInput of BuildAuthInputs.slice(0, authCount) ) {
        const gAuth = await authService.build(authInput);
        gAuths.push(gAuth);
      }
      // console.log("<b1| gAuths>", gAuths);
      expect(gAuths.length).toBe(2);

      //* tag
      const tagCount = 3;
      const gTags: Tag[] = [];
      
      for( const tagInput of BuildTagInputs.slice(0, tagCount) ) {
        const nTag = Tag.of(tagInput);
        const gTag = await Tag.save(nTag);
        gTags.push(gTag);
      }
      // console.log("<b1| gTags>", gTags);
      expect(gTags.length).toBe(3);
      
      //* merchantCategory
      const merchantCategoryCount = 2;
      const gMerchantCategorys: MerchantCategory[] = [];
      
      for( const merchantCategoryInput of BuildMerchantCategoryInputs.slice(0, merchantCategoryCount) ) {
        const nMerchantCategory = MerchantCategory.of(merchantCategoryInput);
        const gMerchantCategory = await MerchantCategory.save(nMerchantCategory);
        gMerchantCategorys.push(gMerchantCategory);
      }
      // console.log("<b1| gMerchantCategorys>", gMerchantCategorys);
      expect(gMerchantCategorys.length).toBe(merchantCategoryCount);
      
      //* merchant
      const merchantCount = 1;
      const gMerchants: Merchant[] = [];
      
      for( const merchantInput of BuildMerchantInputs.slice(0, merchantCount) ) {
        const gMerchant = await merchantRepository.build(merchantInput);
        gMerchants.push(gMerchant);
      }
      // console.log("<b1| build| gMerchants>", gMerchants);
      expect(gMerchants.length).toBe(merchantCount);
      expect(gMerchants[0]).toBeDefined();
      expect(gMerchants[0].merchant_id).toEqual(1);
      expect(gMerchants[0].merchant_title).toEqual(BuildMerchantInputs[0].merchant_title);
      
      //* post
      const postCount = 1;
      const gPosts: Post[] = [];
      
      for( const postInput of BuildPostInputs.slice(0, postCount) ) {
        const gPost = await postRepository.build(postInput);
        gPosts.push(gPost);
      }
      // console.log("<b1| build| gPosts>", gPosts);
      expect(gPosts.length).toBe(postCount);
      expect(gPosts[0]).toBeDefined();
      expect(gPosts[0].post_id).toEqual(1);
      expect(gPosts[0].post_text).toEqual(BuildPostInputs[0].post_text);

      //* merchant
      const fMerchant = await merchantRepository.fetchById(gMerchants[0].merchant_id);
      // console.log("<post.repository| b1 |fMerchant>", fMerchant);
      expect(fMerchant.article.posts).toBeInstanceOf(Array);
      expect(fMerchant.article.posts.length).toBe(1);
      expect(fMerchant.article.posts[0].post_id).toBe(1);
      expect(fMerchant.article.posts[0].post_text).toBe(BuildPostInputs[0].post_text);

      //* seen
      const seenCount = 2;
      const gSeens: Seen[] = [];
      
      for( const seenInput of BuildSeenInputs.slice(0, seenCount) ) {
        const gSeen = await seenRepository.build(seenInput);
        gSeens.push(gSeen);
      }
      // console.log("<b1| build| gSeens>", gSeens);
      expect(gSeens.length).toBe(seenCount);
      expect(gSeens[0]).toBeDefined();
      expect(gSeens[0].seen_id).toEqual(1);
      expect(gSeens[0].auth_id).toEqual(1);
      // expect(gSeens[0].post_id).toEqual(1);
      
      //* post and seen
      // const fPost = await postRepository.fetchById(1);
      // const fPost = await Post.findOne({ post_id: 1});
      const fPost = await Post.findOne({ 
        relations: ["seens"],
        where: { post_id: 1 },
      });

      console.log('<seen.repository| e1| fPost>', fPost);
      expect(fPost).toBeDefined();
      // expect(fPost.seens).toBeDefined();
      // expect(fPost.seens.length).toBe(seenCount);
      // expect(fPost.seen_id).toEqual(1);
      // expect(fPost.auth_id).toEqual(1);
      // expect(fPost.post_id).toEqual(1);

      done();
    }, 20000);

  });








  //! not-checked from down here
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
