import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildPostInput } from './dto/create_post.input';
import { Post } from './post.entity';
import { UpdatePostInput } from './dto/update_post.input';
import { group } from 'console';
import { groupBy } from 'rxjs/operators';
import { Article } from '../article/article.entity';
import { ArticleType } from '../article/article_type.enum';
import { Merchant } from '../merchant/merchant.entity';
import { Heart } from '../heart';
import { Comment } from '../comment';
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository');

  async build( rPost: BuildPostInput ): Promise<Post> {
    console.log('PostRepository rPost: ', rPost);

    //* build article for post
    const nArticle = Article.of({
      article_type: ArticleType.POST,
    });

    //* fetch merchant-article-id
    const merchant = await Merchant.findOneOrFail({ 
      // select: ["article_id"],
      where: { merchant_id: rPost.merchant_id },
    });

    //$ user_id: should get from server

    
    const nPost = Post.of(rPost);
    nPost.post_article = nArticle;
    nPost.audience_article_id = merchant.article_id;

    const gPost = await nPost.save();

    return this.fetchById(gPost.post_id);

  }
  
  async rebuild( rPost: UpdatePostInput ): Promise<Post> {
    console.log('PostRepository rData: ', rPost);

    const nPost = new Post();
    
    try {
      await nPost.save();
      const fPost = await Post.findOne(rPost.post_id);
      console.log('fPost: ', fPost);
      return fPost;
    } catch (error) {
      this.logger.error(
        `!> Failed to update post: ${JSON.stringify(rPost)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update post',
        origin: '@post.repository.ts',
        post: rPost,
      });
    }
  }
  
  async fetchById( rId: number ): Promise<Post> {
    console.log('PostRepository rId: ', rId);

    const fPost = await Post.findOne({ 
      relations: [
        "post_article", 
        "post_article.comments", "post_article.hearts", "post_article.rates", 
        "auth", "audience_article"
      ],
      where: { post_id: rId },
    });

    console.log('<m.r.ts| fetchById| fPost>', fPost);
    return fPost;
  }

  // TODO: get all post related to merchant-id 
  // TODO: with total of hearts for each post 
  // TODO: with did auth-id heart each post
  async getMerchantPostsForAuth01(rMerchantId: number, rUsrId: number ): Promise<Post[]> {
    console.log('<getMerchantPostsForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* post_data: ✅, merchant_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fPost = await Post.find({ 
      relations: ["merchant"],
      where: { merchant_id: rMerchantId },
    });

    return fPost;
  }
  
  async getMerchantPostsForAuth02(rMerchantId: number, rUsrId: number ): Promise<Post[]> {
    console.log('<getMerchantPostsForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* post_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fPosts: Post[] = await Post.createQueryBuilder("post")
      .where("post.merchant_id = :rMerchantId", { rMerchantId })
      .getMany();
    
    return fPosts;
  }
  
  async getMerchantPostsForAuth03(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantPostsForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* post_data: ✅, heart_data: ✅, heart_counts: ❌, liked: ❌
    const fPost = await Post.createQueryBuilder("post")
    .leftJoinAndSelect("post.hearts", "heart")
    .getRawMany();


    return fPost;
  }
  
  async getMerchantPostsForAuth04(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantPostsForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* post_data: ✅, heart_counts: ✅, liked: ❌
    // const fPosts: Post[] = await Post.createQueryBuilder("post")
    const fResult = await Post.createQueryBuilder("post")
    .leftJoinAndSelect("post.hearts", "heart")
    .select("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .groupBy("post.post_id")
    .groupBy("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
    .where("post.merchant_id = :rMerchantId", { rMerchantId })
    // .andWhere("heart.auth_id = :rUsrId", { rUsrId })
    .getRawMany();


    return fResult;
  }
  
  //! not-working
  async getMerchantPostsForAuth05(rMerchantId: number, rAuthId: number ): Promise<any[]> {
    console.log('<getMerchantPostsForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* post_data: ✅, heart_counts: ✅,
    `SELECT 
    exists(select 1 from \`heart\` li where li.postId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as postId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.postId = p.id) as heartd
    FROM
      auth u,
      post p
    WHERE
      u.id = 2; `;
    const fResult = await Post.createQueryBuilder("post")
    .leftJoinAndSelect("post.hearts", "heart")
    .select("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .addSelect("select COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from heart where heart.auth_id = :rAuthId", "did_i_heart")
    .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")

    .groupBy("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
    .where("post.merchant_id = :rMerchantId", { rMerchantId })
    .setParameter("rAuthId", rAuthId)
    .getRawMany();
    // .getQueryAndParameters();


    return fResult;
  }
  
  //* Raw Query
  //$ not working: now heart is related to article not to post => instead use 07
  async getMerchantPostsForAuth06(rMerchantId: number, rAuthId: number ): Promise<Post[]> {
    console.log('<getMerchantPostsForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* post_data: ✅, heart_counts: ✅, liked: ✅
    `SELECT 
    exists(select 1 from \`heart\` li where li.postId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as postId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.postId = p.id) as heartd
    FROM
      auth u,
      post p
    WHERE
      u.id = 2; `;
    
    const query = 
    `
      SELECT 
        DISTINCT (post.post_id)
      , post.merchant_id
      , post.post_text
      , post.picture_urls
      , post.created_at
      , post.updated_at
      , (select count(heart.heart_id) from heart  where heart.post_id = post.post_id) as heart_count
      , exists(select 1 from heart where heart.post_id = post.post_id and heart.auth_id = $1 limit 1) as liked
      FROM
        post LEFT JOIN heart on post.post_id = heart.post_id
      WHERE
        post.merchant_id = $2;
    `;
    const fResult = await Post.query(query, [1, 1]);


    return fResult;
  }
  
  //* JOIN 
  async getMerchantPostsData( merchant_article_id: number, auth_id: number): Promise<Post[]> {
    //* post_data: ✅, heart_counts: ✅, liked: ✅
    const posts = await Post.createQueryBuilder("post")
      .leftJoinAndSelect("post.post_article", "article")
      .leftJoinAndSelect("article.hearts", "heart")
      .select("post.post_id, post.audience_article_id, post.post_text, post.picture_urls, post.created_at, post.updated_at") 
      .addSelect("exists(select 1 from heart where heart.article_id = post.post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")

      .addSelect("COUNT(heart.heart_id)", "heart_counts")
      .groupBy("post.post_id, post.audience_article_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
      .where("post.audience_article_id = :merchant_article_id", {merchant_article_id})
      .setParameter("auth_id", auth_id)
      .getRawMany(); 


    return posts;
  }
  
  //* seperate query  ✅
  async getPostHeart( auth_id: number, post_article_id: number): Promise<any> {

    //* heart_counts: ✅, liked: ✅
    const heart_data = await Heart.createQueryBuilder("heart")
      .select([])
      .addSelect("COUNT(*)", "heart_counts")
      .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
      .where("heart.article_id = :post_article_id", {post_article_id})
      .setParameter("auth_id", auth_id)
      .setParameter("post_article_id", post_article_id)
      .getRawOne(); 


    return heart_data;
  }
  
  //> OK
  async getPostCommentData(post_article_id: number): Promise<any> {
    const auth_id = 1;

    //* 1st-comment: ✅, comment_count: ✅
    const comment_data = await Comment.createQueryBuilder("comment")
      // .select([])
      .addSelect(sq => {
        return sq.select("count(*)", "comment_comment_count") //$ should use double comment to be accessable in Entity
        .from("comment", "comment")
        .where("comment.audience_article_id = :post_article_id", { post_article_id })

      }, "comment_comment_count") //$ double comment
      .where("comment.audience_article_id = :post_article_id", {post_article_id})
      .setParameter("post_article_id", post_article_id)
      .orderBy("created_at", "DESC")
      .limit(1)
      // .getRawOne(); //! has comment_...  prefix
      .getOne(); //! comment_count is null
      // .getRawAndEntities(); //! comment_count is null


    return comment_data;
  }

  //* todo: get heart data for post with seperate query
  async fetch01( post_id: number, auth_id: number): Promise<any> {

    const post = await Post.findOne({ 
      relations: ["post_article"],
      where: { post_id: post_id },
      order: {
        created_at: "DESC"
      },
      // skip: 0,
      // take: 10,
      // catche: true,
    });
    
    console.warn("<post.repo.ts| f01| post:>", post);

    post.post_article = {
      ... post.post_article,
      ... await Heart.createQueryBuilder("heart")
      .select([])
      .addSelect("COUNT(*)", "heart_counts")
      .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
      .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
      .setParameter("auth_id", auth_id)
      .setParameter("post_article_id", post.post_article_id)
      .getRawOne(),

    } 

    // await Promise.all(promises);

    return post;
    // return fResult;
  }



}

// export class PostRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
