import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildMerchantInput } from './dto/create_merchant.input';
// import { AuthModule } from '../../../auth/auth.module';

import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Auth } from '../../../auth/auth/auth.entity';
import { Tag } from '../tag/tag.entity';
import { Article } from '../article/article.entity';
import { ArticleType } from '../article/article_type.enum';
import { Post } from '../post';
import { Comment } from '../comment';
import { Merchant } from '../merchant';
import { Rate } from '../rate';
import { async } from 'rxjs/internal/scheduler/async';
import { Heart } from '..';

export class FetchMerchantInput {

  merchant_id: number; //! 1
  auth_id: number; //! 2

  post_offset: number = 0; //! 3
  post_limit: number = 10; //! 4

  comment_offset: number = 0; //! 5
  comment_limit: number = 10; //! 6

  rate_offset: number = 0; //! 7
  rate_limit: number = 10; //! 8

  child_post_offset: number = 0; //! 9
  child_post_limit: number = 1; //! 10
  
  child_comment_offset: number = 0; //! 11
  child_comment_limit: number = 1; //! 12

  child_rate_offset: number = 0; //! 13
  child_rate_limit: number = 1; //! 14

  // merchant_offset: number = 0; //! 15
  // merchant_limit: number = 10; //! 16

}

@EntityRepository(Merchant)
export class MerchantRepository extends Repository<Merchant> {
  
  // private logger = new Logger('MerchantRepository');

  async build( rMerchant: BuildMerchantInput ): Promise<Merchant> {
    
    console.log('<MerchantRepository| build| rMerchant>', rMerchant);

    // get tag_titles from rMerchant and then delete it from rMerchant
    const rTitles = [...rMerchant?.tag_titles];
    delete rMerchant.tag_titles;

    // 🚧 check we have such a auth
    // 🤔 think: maybe it is better to use authService()
    const auth = await Auth.findOneOrFail(rMerchant.auth_id);

    //* article
    const nArticle = Article.of({
      article_type: ArticleType.MERCHANT_PROFILE,
    });


    // 🚧 gMerchant
    const nMerchant = Merchant.of(rMerchant);
    nMerchant.article = nArticle;

    const gMerchant = await Merchant.save(nMerchant);
    // console.log('<m.r.ts| gMerchant: >', gMerchant);

    // 🚧 gTag or fTag and set relation with gMerchant
    const query = this.createQueryBuilder()
      .relation(Merchant, 'tags')
      .of(gMerchant.merchant_id);

    for( const title of rTitles) {
      const tag = await Tag.findOne({ tag_title: title});
      
      try {
        if ( tag ) {
          //! add vs. set: set is only for ManyToOne and OneToOne
          const res = await query.add(tag.tag_id);
          console.log('<merchant.repository| res>', res);
        } else {
          const nTag = Tag.of({ tag_title: title });
          const gTag = await Tag.save(nTag);
          // const res = await query.set(gTag.tag_id);
          const res = await query.add(gTag.tag_id);
          console.log('<merchant.repository| res>', res);
        }
        
      } catch (error) {
        console.log('<merchant.repository| tag creating error>', error);
      }
    }
    
    return this.fetchById(gMerchant.merchant_id);
    
  }
  
  async rebuild( rMerchant: UpdateMerchantInput ): Promise<Merchant> {
    
    // console.log('MerchantRepository: Merchant => rData: ', rMerchant);

    const fMerchant = await Merchant.findOneOrFail(rMerchant.merchant_id)

    const tuMerchant = Object.assign(fMerchant, rMerchant);

    // console.log('<<uS>> tuMerchant:', tuMerchant);

    await Merchant.save(tuMerchant);

    const merchant = this.fetchById(rMerchant.merchant_id)

    return merchant;
    
    // try {
    //   const uMerchant = await Merchant.save(nMerchant);
    //   console.log('uMerchant: ', uMerchant);
    //   return this.fetchById(rMerchant.merchant_id);
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update merchant: ${JSON.stringify(rMerchant)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update merchant',
    //     origin: '@merchant.repository.ts',
    //     merchant: rMerchant,
    //     error: error.stack,
    //   });
    // }

  }

  //* orm return merchant: posts, comments, hearts, rates
  async fetchById( rId: number ): Promise<Merchant> {
    // console.log('MerchantRepository rId: ', rId);

    const fMerchant = await Merchant.findOne({ 
      relations: ["article","article.posts", "article.comments", "article.hearts", "article.rates", ],
      where: { merchant_id: rId },
    });

    console.log('<m.r.ts| fetchById| fMerchant>', fMerchant);
    return fMerchant;

  }
  
  //* raw return merchant: liked, post_count, comment_count, heart_count, rate_count, rate_avg
  async fetch01( i: FetchMerchantInput): Promise<Merchant> {
    // console.log('MerchantRepository rId: ', rId);
    //? we can mix rate-count and rate-avg to get better performance

    //* available data in main rawQuery: merchant LEFT JOIN article
    const merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = 
    `
      SELECT 
        *
      , (select * from post where post.audience_article_id = pt.post_article_id order by post.created_at desc offset $9 limit $10) as posts
      
      , exists(select 1 from heart where heart.article_id = pt.post_article_id and heart.auth_id = $2 limit 1) as liked

      , (select count(heart.heart_id) from heart  where heart.article_id = pt.post_article_id) as heart_count
      , (select count(comment.comment_id) from comment  where comment.audience_article_id = pt.post_article_id) as comment_count
      , (select count(rate.rate_id) from rate  where rate.audience_article_id = pt.post_article_id) as rate_count
      , (select avg(rate.rate_stars) from rate  where rate.audience_article_id = pt.post_article_id) as rate_avg
      FROM
        post pt
      WHERE
        post.audience_article_id = merchant.article_id
      ORDER BY post.created_at DESC
      OFFSET $3
      LIMIT $4
    `;
    //? some extra-field for comment: actually we don't need rate_count and rate_avg for comment 
    const merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = 
    `
      SELECT 
        *
      , (select * from comment where comment.audience_article_id = cmm.comment_article_id order by comment.created_at desc offset $11 limit $12) as comments
      
      , exists(select 1 from heart where heart.article_id = cmm.comment_article_id and heart.auth_id = $2 limit 1) as liked

      , (select count(heart.heart_id) from heart  where heart.article_id = cmm.comment_article_id) as heart_count
      , (select count(comment.comment_id) from comment  where comment.audience_article_id = cmm.comment_article_id) as comment_count
      , (select count(rate.rate_id) from rate  where rate.audience_article_id = cmm.comment_article_id) as rate_count
      , (select avg(rate.rate_stars) from rate  where rate.audience_article_id = cmm.comment_article_id) as rate_avg
      FROM
        comment cmm
      WHERE
        cmm.audience_article_id = merchant.article_id
      ORDER BY cmm.created_at DESC
      OFFSET $5
      LIMIT $6
    `;
    //? some extra-field for rate: actuallh we don't need comment_count, rate_count and rate_avg for rate 
    const merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = 
    `
      SELECT 
        *
      , (select * from rate where rate.audience_article_id = rt.rate_article_id order by rate.created_at desc offset $13 limit $14) as rates
      
      , exists(select 1 from heart where heart.article_id = rt.rate_article_id and heart.auth_id = $2 limit 1) as liked

      , (select count(heart.heart_id) from heart  where heart.article_id = rt.rate_article_id) as heart_count
      , (select count(comment.comment_id) from comment  where comment.audience_article_id = rt.rate_article_id) as comment_count
      , (select count(rate.rate_id) from rate  where rate.audience_article_id = rt.rate_article_id) as rate_count
      , (select avg(rate.rate_stars) from rate  where rate.audience_article_id = rt.rate_article_id) as rate_avg
      FROM
        rate rt
      WHERE
        rt.audience_article_id = merchant.article_id
      ORDER BY rt.created_at DESC
      OFFSET $7
      LIMIT $8
    `;

    const rawQuery = 
    `
      SELECT 
       DISTINCT (merchant.merchant_id)
      , merchant.merchant_id
      , merchant.auth_id
      , merchant.article_id
      , merchant.merchant_title
      , merchant.tiny_description
      , merchant.long_description
      , merchant.contact_name
      , merchant.instagram_url
      , merchant.number_call
      , merchant.number_telegram
      , merchant.bank_card_number
      , merchant.bank_card_details
      , merchant.avatar_url
      , merchant.header_url
      , merchant.note
      , merchant.location
      , merchant.created_at
      , merchant.updated_at
      
      , exists(select 1 from heart where heart.article_id = merchant.article_id and heart.auth_id = $2 limit 1) as liked

      , (select count(heart.heart_id) from heart  where heart.article_id = merchant.article_id) as heart_count
      , (select count(post.post_id) from post  where post.audience_article_id = merchant.article_id) as post_count
      , (select count(comment.comment_id) from comment  where comment.audience_article_id = merchant.article_id) as comment_count
      , (select count(rate.rate_id) from rate  where rate.audience_article_id = merchant.article_id) as rate_count
      , (select avg(rate.rate_id) from rate  where rate.audience_article_id = merchant.article_id) as rate_avg

      FROM
        merchant LEFT JOIN article on merchant.article_id = article.article_id
      WHERE
        merchant.merchant_id = $1;
    `;

    //! keep here; cause error: subquery must return only one column 
    `
      --, (${merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as posts
      --, (${merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as comments
      --, (${merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as rates
      
    `;
    //! const fResult = await Merchant.query(rawQuery, [i.merchant_id, i.auth_id, i.post_offset, i.post_limit, i.comment_offset, i.comment_limit, i.rate_offset, i.rate_limit, i.child_post_offset, i.child_post_limit, i.child_comment_offset, i.child_comment_limit, i.child_rate_offset, i.child_rate_limit]);
    const fResult = await Merchant.query(rawQuery, [i.merchant_id, i.auth_id]);

    return fResult;

  }
  
  //! understructure
  async fetch02( i: FetchMerchantInput): Promise<any> {

    // console.log('MerchantRepository rId: ', rId);
    // todo: merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    // todo: merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    // todo: merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    const fMerchant = await Merchant.findOne({ 
      relations: ["article","article.posts", "article.comments", "article.hearts", "article.rates", ],
      where: { merchant_id: i.merchant_id },
      // order: {},
      // skip: 0,
      // take: 10,
      // catche: true,
    });

    console.warn("<f02| merchants:>", fMerchant);

    // todo: merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    // const promises = merchants.map(async merchant => {
    //   merchant.article.comments = await Comment.createQueryBuilder("comment")
    //   .where("comment.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    //   .getMany(); 
    // });
    // const promises = merchants.map(async merchant => {
    //   merchant.article.comments = await Comment.createQueryBuilder("comment")
    //   .where("comment.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    //   .getMany(); 
    // });

    // await Promise.all(promises);
    return fMerchant;
  }
  
  //* add simple relation by seperate orm query
  async fetch03( i: FetchMerchantInput): Promise<any> {

    // console.log('MerchantRepository rId: ', rId);
    // todo: merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    // todo: merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    // todo: merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    const merchants = await Merchant.find({ 
      relations: ["article"],
      // where: { merchant_id: i.merchant_id },
      where: { merchant_id: i.merchant_id },
      order: {
        created_at: "DESC"
      },
      skip: 0,
      take: 10,
      // catche: true,
    });
    
    // const merchant = await this.fetchById(merchant_id)

    console.warn("<f03| merchant:>", merchants);


    // todo: merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg
    const promises = merchants.map(async merchant => {

      merchant.article.comments = await Comment.createQueryBuilder("comment")
      .where("comment.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
      .getMany();

      merchant.article.posts = await Post.createQueryBuilder("post")
      .where("post.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
      .getMany(); 
      
      merchant.article.rates = await Rate.createQueryBuilder("rate")
      .where("rate.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
      .getMany(); 
    });

    await Promise.all(promises);

    return merchants;
  }
  
  
  //> return merchant includes: posts {post_data, liked, heart_count, comments: {1st_comment, comment_count}}
  async fetch04( i: FetchMerchantInput): Promise<any> {

    //?:1 get merchant by id
    const merchant = await Merchant.findOne({ 
      relations: ["article"],
      // where: { merchant_id: i.merchant_id },
      where: { merchant_id: i.merchant_id },
      // order: {
      //   created_at: "DESC"
      // },
      // skip: 0,
      // take: 10,
      // catche: true,
    });

    //* posts
    //?:p1 fetch 10-post of merchant
    merchant.article.posts = await Post.createQueryBuilder("post")
    .where("post.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    .leftJoinAndSelect("post.post_article", "article")
    .orderBy("created_at", "DESC")
    .offset(i.post_offset)
    .limit(i.post_limit)
    .getMany();

    //?:p2 add each post: heart_count, liked,  
    //?:p3 add each post: comment_count, 1st_comment,  
    const postsPromises = merchant.article.posts.map(async post => {
      post.post_article = {
        //! ref: postRepository.fetch01()
        ... post.post_article,
        ... await Heart.createQueryBuilder("heart")
        .select([])
        .addSelect("COUNT(*)", "heart_counts")
        .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
        .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
        .setParameter("auth_id", i.auth_id)
        .setParameter("post_article_id", post.post_article_id)
        .getRawOne(),

        //! ref: postRepository.getPostCommentData()
        comments: await Comment.createQueryBuilder("comment")
      // .select([])
        .addSelect(sq => {
          return sq.select("count(*)", "comment_comment_count") //$ should use double comment to be accessable in Entity
          .from("comment", "comment")
          .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })

        }, "comment_comment_count") //$ double comment
        .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })
        .setParameter("post_article_id", post.post_article_id)
        .orderBy("created_at", "DESC")
        .limit(1)
        // .getRawOne(); //! has comment_...  prefix
        .getOne(), //! comment_count is null
        // .getRawAndEntities(); //! comment_count is null
      }
    });
    
    //* comments: we don't allow comment for merchant

    //* rates: 
    //?:r1 fetch merchate.rates: rate_count, rate_avg,   
    // todo: ...
    await Promise.all(postsPromises);

    return merchant;

    // merchant.article.comments = await Comment.createQueryBuilder("comment")
    // // .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")  
    // .select("comment.*")  
    // .addSelect("exists(select 1 from heart where heart.article_id = comment.comment_article_id and heart.auth_id = :auth_id limit 1)", "liked")
    // .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .leftJoinAndSelect("comment.comment_article", "article")
    // .leftJoinAndSelect("article.hearts", "heart")
    // .groupBy("comment.*, article.article_id, heart.heart_id, comment.comment_id")
    // .where("comment.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    // .setParameter("auth_id", i.auth_id)
    // .getMany();
    
    // merchant.article.rates = await Rate.createQueryBuilder("rate")
    // .where("rate.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    // .getMany(); 

    
    // await Promise.all(promises);
    
    // const promises = merchants.map(async merchant => {

    //   merchant.article.posts = await Post.createQueryBuilder("post")
    //   .select("post.*")  
    //   .addSelect("exists(select 1 from heart where heart.article_id = post.post_article_id and heart.auth_id = :auth_id limit 1)", "liked")
    //   .addSelect("COUNT(heart.heart_id)", "heart_counts")
    //   .leftJoinAndSelect("post.post_article", "article")
    //   .leftJoinAndSelect("article.hearts", "heart")
    //   .groupBy("post.*, article.article_id, heart.heart_id, post.post_id")
    //   .where("post.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    //   .setParameter("auth_id", i.auth_id)
    //   .getMany(); 

    //   // merchant.article.comments = await Comment.createQueryBuilder("comment")
    //   // // .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")  
    //   // .select("comment.*")  
    //   // .addSelect("exists(select 1 from heart where heart.article_id = comment.comment_article_id and heart.auth_id = :auth_id limit 1)", "liked")
    //   // .addSelect("COUNT(heart.heart_id)", "heart_counts")
    //   // .leftJoinAndSelect("comment.comment_article", "article")
    //   // .leftJoinAndSelect("article.hearts", "heart")
    //   // .groupBy("comment.*, article.article_id, heart.heart_id, comment.comment_id")
    //   // .where("comment.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    //   // .setParameter("auth_id", i.auth_id)
    //   // .getMany();
      
    //   // merchant.article.rates = await Rate.createQueryBuilder("rate")
    //   // .where("rate.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    //   // .getMany(); 

    // });
    
    // await Promise.all(promises);

    // return merchants;
    // return fResult;
  }
 
  
  //! reference: big refrence, big logic
  //> return merchant includes: merchant_date, rate_count, rate_avg, rates{rate_data, liked, heart_count, comments: {1st_comment, comment_count}},posts {post_data, liked, heart_count, comments: {1st_comment, comment_count}}
  async fetch05( i: FetchMerchantInput): Promise<any> {

    //* merchant: get by id
    let merchant = await Merchant.findOne({ 
      relations: ["article"],
      // where: { merchant_id: i.merchant_id },
      where: { merchant_id: i.merchant_id },
      // order: {
      //   created_at: "DESC"
      // },
      // skip: 0,
      // take: 10,
      // catche: true,
    });

    //* posts
    //> fetch 10-post of merchant
    merchant.article.posts = await Post.createQueryBuilder("post")
    .where("post.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    .leftJoinAndSelect("post.post_article", "article")
    .orderBy("created_at", "DESC")
    .offset(i.post_offset)
    .limit(i.post_limit)
    .getMany();

    //> add each post: heart_count, liked,  
    //> add each post: comment_count, 1st_comment,  
    const postsPromises = merchant.article.posts.map(async post => {
      post.post_article = {
        //> ref: postRepository.fetch01()
        ... post.post_article,
        ... await Heart.createQueryBuilder("heart")
        .select([])
        .addSelect("COUNT(*)", "heart_counts")
        .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
        .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
        .setParameter("auth_id", i.auth_id)
        .setParameter("post_article_id", post.post_article_id)
        .getRawOne(),

        //> ref: postRepository.getPostCommentData()
        comments: await Comment.createQueryBuilder("comment")
        // .select([])
        .addSelect(sq => {
          return sq.select("count(*)", "comment_comment_count") //! should use double comment to be accessable in Entity
          .from("comment", "comment")
          .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })

        }, "comment_comment_count") //! double comment
        .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })
        .setParameter("post_article_id", post.post_article_id)
        .orderBy("created_at", "DESC")
        .limit(1)
        // .getRawOne(); // has comment_...  prefix
        .getOne(), // comment_count is null
        // .getRawAndEntities(); // comment_count is null
      }
    });
    
    //* comments: 
    //> we don't allow comment for merchant

    //* rates: 
    //> merchate: rate_count, rate_avg,
    merchant = {
      ... merchant,
      ... await Rate.createQueryBuilder("rate")
      .select([])
      .addSelect("COUNT(*)", "rate_count")
      .addSelect("AVG(rate_stars)", "rate_avg")
      .where("rate.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
      .getRawOne(),

    }

    //> fetch 10-rate of merchant
    merchant.article.rates = await Rate.createQueryBuilder("rate")
    .where("rate.audience_article_id = :merchant_article_id", {merchant_article_id: merchant.article_id})
    .leftJoinAndSelect("rate.rate_article", "article")
    .orderBy("created_at", "DESC")
    .offset(i.rate_offset)
    .limit(i.rate_limit)
    .getMany();

    //> add each post: heart_count, liked,  
    //> add each post: comment_count, 1st_comment,  
    const ratesPromises = merchant.article.rates.map(async rate => {
      rate.rate_article = {
        //> ref: rateRepository.fetch01()
        ... rate.rate_article,
        ... await Heart.createQueryBuilder("heart")
        .select([])
        .addSelect("COUNT(*)", "heart_counts")
        .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
        .where("heart.article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
        .setParameter("auth_id", i.auth_id)
        .setParameter("rate_article_id", rate.rate_article_id)
        .getRawOne(),

        //> ref: postRepository.getPostCommentData()
        comments: await Comment.createQueryBuilder("comment")
        // .select([])
        .addSelect(sq => {
          return sq.select("count(*)", "comment_comment_count") //! should use double comment to be accessable in Entity
          .from("comment", "comment")
          .where("comment.audience_article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })

        }, "comment_comment_count") //! double comment
        .where("comment.audience_article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
        .setParameter("rate_article_id", rate.rate_article_id)
        .orderBy("created_at", "DESC")
        .limit(1)
        // .getRawOne(), // has comment_...  prefix
        .getOne(), // comment_count is null
        // .getRawAndEntities(), // comment_count is null
      }
    });


    await Promise.all(postsPromises);
    await Promise.all(ratesPromises);

    console.warn("merchant.repo| fetch05| merchant", JSON.stringify(merchant, null, 2));

    return merchant;

   
  }

}

// export class MerchantRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
