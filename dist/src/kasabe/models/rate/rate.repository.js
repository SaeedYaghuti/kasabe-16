"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const article_entity_1 = require("../article/article.entity");
const article_type_enum_1 = require("../article/article_type.enum");
const __1 = require("..");
const rate_entity_1 = require("./rate.entity");
let RateRepository = class RateRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('RateRepository');
    }
    async build(rRate) {
        console.log('RateRepository rRate: ', rRate);
        const nArticle = article_entity_1.Article.of({
            article_type: article_type_enum_1.ArticleType.RATE,
        });
        const nRate = rate_entity_1.Rate.of(rRate);
        nRate.rate_article = nArticle;
        const gRate = await nRate.save();
        return this.fetchById(gRate.rate_id);
    }
    async rebuild(rRate) {
        console.log('RateRepository rData: ', rRate);
        const nRate = new rate_entity_1.Rate();
        try {
            await nRate.save();
            const fRate = await rate_entity_1.Rate.findOne(rRate.rate_id);
            console.log('fRate: ', fRate);
            return fRate;
        }
        catch (error) {
            this.logger.error(`!> Failed to update rate: ${JSON.stringify(rRate)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update rate',
                origin: '@rate.repository.ts',
                rate: rRate,
            });
        }
    }
    async fetchById(rId) {
        console.log('RateRepository rId: ', rId);
        const fRate = await rate_entity_1.Rate.findOne({
            relations: ["auth", "rate_article", "audience_article"],
            where: { rate_id: rId },
        });
        console.log('<m.r.ts| fetchById| fRate>', fRate);
        return fRate;
    }
    async getMerchantRatesForAuth01(rMerchantId, rUsrId) {
        console.log('<getMerchantRatesForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fRate = await rate_entity_1.Rate.find({
            relations: ["merchant"],
            where: { merchant_id: rMerchantId },
        });
        return fRate;
    }
    async getMerchantRatesForAuth02(rMerchantId, rUsrId) {
        console.log('<getMerchantRatesForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fRates = await rate_entity_1.Rate.createQueryBuilder("rate")
            .where("rate.merchant_id = :rMerchantId", { rMerchantId })
            .getMany();
        return fRates;
    }
    async getMerchantRatesForAuth03(rMerchantId, rUsrId) {
        console.log('<getMerchantRatesForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fRate = await rate_entity_1.Rate.createQueryBuilder("rate")
            .leftJoinAndSelect("rate.hearts", "heart")
            .getRawMany();
        return fRate;
    }
    async getMerchantRatesForAuth04(rMerchantId, rUsrId) {
        console.log('<getMerchantRatesForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fResult = await rate_entity_1.Rate.createQueryBuilder("rate")
            .leftJoinAndSelect("rate.hearts", "heart")
            .select("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .groupBy("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
            .where("rate.merchant_id = :rMerchantId", { rMerchantId })
            .getRawMany();
        return fResult;
    }
    async getMerchantRatesForAuth05(rMerchantId, rAuthId) {
        console.log('<getMerchantRatesForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);
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
        const fResult = await rate_entity_1.Rate.createQueryBuilder("rate")
            .leftJoinAndSelect("rate.hearts", "heart")
            .select("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")
            .groupBy("rate.rate_id, rate.merchant_id, rate.rate_text, rate.picture_urls, rate.created_at, rate.updated_at")
            .where("rate.merchant_id = :rMerchantId", { rMerchantId })
            .setParameter("rAuthId", rAuthId)
            .getRawMany();
        return fResult;
    }
    async getMerchantRatesForAuth06(rMerchantId, rAuthId) {
        console.log('<getMerchantRatesForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);
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
        const query = `
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
        const fResult = await rate_entity_1.Rate.query(query, [1, 1]);
        return fResult;
    }
    async getRateHeart(auth_id, rate_article_id) {
        const heart_data = await __1.Heart.createQueryBuilder("heart")
            .select([])
            .addSelect("COUNT(*)", "heart_counts")
            .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .where("heart.article_id = :rate_article_id", { rate_article_id })
            .setParameter("auth_id", auth_id)
            .setParameter("rate_article_id", rate_article_id)
            .getRawOne();
        return heart_data;
    }
    async getRateCommentData(rate_article_id) {
        const auth_id = 1;
        const comment_data = await __1.Comment.createQueryBuilder("comment")
            .addSelect(sq => {
            return sq.select("count(*)", "comment_comment_count")
                .from("comment", "comment")
                .where("comment.audience_article_id = :rate_article_id", { rate_article_id });
        }, "comment_comment_count")
            .where("comment.audience_article_id = :rate_article_id", { rate_article_id })
            .setParameter("rate_article_id", rate_article_id)
            .orderBy("created_at", "DESC")
            .limit(1)
            .getOne();
        return comment_data;
    }
    async fetch01(rate_id, auth_id) {
        const rate = await rate_entity_1.Rate.findOne({
            relations: ["rate_article"],
            where: { rate_id: rate_id },
        });
        console.warn("<rate.repo.ts| f01| rate:>", rate);
        rate.rate_article = Object.assign(Object.assign({}, rate.rate_article), await __1.Heart.createQueryBuilder("heart")
            .select([])
            .addSelect("COUNT(*)", "heart_counts")
            .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .where("heart.article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
            .setParameter("auth_id", auth_id)
            .setParameter("rate_article_id", rate.rate_article_id)
            .getRawOne());
        return rate;
    }
};
RateRepository = __decorate([
    typeorm_1.EntityRepository(rate_entity_1.Rate)
], RateRepository);
exports.RateRepository = RateRepository;
//# sourceMappingURL=rate.repository.js.map