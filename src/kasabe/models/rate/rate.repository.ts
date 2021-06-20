import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Article } from '../article/article.entity';
import { ArticleType } from '../article/article_type.enum';
import { Comment, Post, Heart } from '..';
import { Rate } from './rate.entity';

@EntityRepository(Rate)
export class RateRepository extends Repository<Rate> {
  private logger = new Logger('RateRepository');

  async build( rRate: BuildRateInput ): Promise<Rate> {
    console.log('RateRepository rRate: ', rRate);

    const nArticle = Article.of({
      article_type: ArticleType.RATE,
    });

    const nRate = Rate.of(rRate);
    nRate.rate_article = nArticle;

    const gRate = await nRate.save();

    return this.fetchById(gRate.rate_id);

  }
  
  async rebuild( rRate: UpdateRateInput ): Promise<Rate> {
    console.log('RateRepository rData: ', rRate);

    const nRate = new Rate();
    
    try {
      await nRate.save();
      const fRate = await Rate.findOne(rRate.rate_id);
      console.log('fRate: ', fRate);
      return fRate;
    } catch (error) {
      this.logger.error(
        `!> Failed to update rate: ${JSON.stringify(rRate)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update rate',
        origin: '@rate.repository.ts',
        rate: rRate,
      });
    }
  }
  
  async fetchById( rId: number ): Promise<Rate> {
    console.log('RateRepository rId: ', rId);

    const fRate = await Rate.findOne({ 
      relations: ["auth", "rate_article", "audience_article"],
      where: { rate_id: rId },
    });

    console.log('<m.r.ts| fetchById| fRate>', fRate);
    return fRate;
  }

  // TODO: get all rate related to merchant-id 
  // TODO: with total of hearts for each rate 
  // TODO: with did auth-id heart each rate
  async getMerchantRatesForAuth01(rMerchantId: number, rUsrId: number ): Promise<Rate[]> {
    console.log('<getMerchantRatesForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* rate_data: ✅, merchant_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fRate = await Rate.find({ 
      relations: ["merchant"],
      where: { merchant_id: rMerchantId },
    });

    return fRate;
  }
  
  async getMerchantRatesForAuth02(rMerchantId: number, rUsrId: number ): Promise<Rate[]> {
    console.log('<getMerchantRatesForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* rate_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fRates: Rate[] = await Rate.createQueryBuilder("rate")
      .where("rate.merchant_id = :rMerchantId", { rMerchantId })
      .getMany();
    
    return fRates;
  }
  
  async getMerchantRatesForAuth03(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantRatesForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* rate_data: ✅, heart_data: ✅, heart_counts: ❌, liked: ❌
    const fRate = await Rate.createQueryBuilder("rate")
    .leftJoinAndSelect("rate.hearts", "heart")
    .getRawMany();


    return fRate;
  }
  
  async getMerchantRatesForAuth04(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantRatesForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* rate_data: ✅, heart_counts: ✅, liked: ❌
    // const fRates: Rate[] = await Rate.createQueryBuilder("rate")
    const fResult = await Rate.createQueryBuilder("rate")
    .leftJoinAndSelect("rate.hearts", "heart")
    .select("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .groupBy("rate.rate_id")
    .groupBy("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
    .where("rate.merchant_id = :rMerchantId", { rMerchantId })
    // .andWhere("heart.auth_id = :rUsrId", { rUsrId })
    .getRawMany();


    return fResult;
  }
  
  //! not-working
  async getMerchantRatesForAuth05(rMerchantId: number, rAuthId: number ): Promise<any[]> {
    console.log('<getMerchantRatesForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* rate_data: ✅, heart_counts: ✅,
    `SELECT 
    exists(select 1 from \`heart\` li where li.rateId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as rateId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.rateId = p.id) as heartd
    FROM
      auth u,
      rate p
    WHERE
      u.id = 2; `;
    const fResult = await Rate.createQueryBuilder("rate")
    .leftJoinAndSelect("rate.hearts", "heart")
    .select("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .addSelect("select COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from heart where heart.auth_id = :rAuthId", "did_i_heart")
    .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")

    .groupBy("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
    .where("rate.merchant_id = :rMerchantId", { rMerchantId })
    .setParameter("rAuthId", rAuthId)
    .getRawMany();
    // .getQueryAndParameters();


    return fResult;
  }
  
  //* Raw Query
  async getMerchantRatesForAuth06(rMerchantId: number, rAuthId: number ): Promise<Rate[]> {
    console.log('<getMerchantRatesForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* rate_data: ✅, heart_counts: ✅, liked: ✅
    `SELECT 
    exists(select 1 from \`heart\` li where li.rateId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as rateId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.rateId = p.id) as heartd
    FROM
      auth u,
      rate p
    WHERE
      u.id = 2; `;
    
    const query = 
    `
      SELECT 
        DISTINCT (rate.rate_id)
      , rate.merchant_id
      , rate.rate_text
      , rate.picture_urls
      , rate.created_at
      , rate.updated_at
      , (select count(heart.heart_id) from heart  where heart.rate_id = rate.rate_id) as heart_count
      , exists(select 1 from heart where heart.rate_id = rate.rate_id and heart.auth_id = $1 limit 1) as liked
      FROM
        rate LEFT JOIN heart on rate.rate_id = heart.rate_id
      WHERE
        rate.merchant_id = $2;
    `;
    const fResult = await Rate.query(query, [1, 1]);


    return fResult;
  }

  //* seperate query  ✅
  async getRateHeart( auth_id: number, rate_article_id: number): Promise<any> {

    //* heart_counts: ✅, liked: ✅
    const heart_data = await Heart.createQueryBuilder("heart")
      .select([])
      .addSelect("COUNT(*)", "heart_counts")
      .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
      .where("heart.article_id = :rate_article_id", {rate_article_id})
      .setParameter("auth_id", auth_id)
      .setParameter("rate_article_id", rate_article_id)
      .getRawOne(); 


    return heart_data;
  }
  
  //> OK
  async getRateCommentData(rate_article_id: number): Promise<any> {
    const auth_id = 1;

    //* 1st-comment: ✅, comment_count: ✅
    const comment_data = await Comment.createQueryBuilder("comment")
      // .select([])
      .addSelect(sq => {
        return sq.select("count(*)", "comment_comment_count") //$ should use double comment to be accessable in Entity
        .from("comment", "comment")
        .where("comment.audience_article_id = :rate_article_id", { rate_article_id })

      }, "comment_comment_count") //$ double comment
      .where("comment.audience_article_id = :rate_article_id", {rate_article_id})
      .setParameter("rate_article_id", rate_article_id)
      .orderBy("created_at", "DESC")
      .limit(1)
      // .getRawOne(); //! has comment_...  prefix
      .getOne(); //! comment_count is null
      // .getRawAndEntities(); //! comment_count is null


    return comment_data;
  }

  // todo: focus here
  //* todo: get heart data for rate with seperate query
  async fetch01( rate_id: number, auth_id: number): Promise<any> {

    const rate = await Rate.findOne({ 
      relations: ["rate_article"],
      where: { rate_id: rate_id },
      // order: {
      //   created_at: "DESC"
      // },
      // skip: 0,
      // take: 10,
      // catche: true,
    });
    
    console.warn("<rate.repo.ts| f01| rate:>", rate);

    rate.rate_article = {
      ... rate.rate_article,
      ... await Heart.createQueryBuilder("heart")
      .select([])
      .addSelect("COUNT(*)", "heart_counts")
      .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
      .where("heart.article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
      .setParameter("auth_id", auth_id)
      .setParameter("rate_article_id", rate.rate_article_id)
      .getRawOne(),

    } 

    // await Promise.all(promises);

    return rate;
    // return fResult;
  }





}

// export class RateRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
