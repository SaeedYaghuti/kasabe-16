"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("../../../auth/auth/auth.entity");
const tag_entity_1 = require("../tag/tag.entity");
const article_entity_1 = require("../article/article.entity");
const article_type_enum_1 = require("../article/article_type.enum");
const post_1 = require("../post");
const comment_1 = require("../comment");
const merchant_1 = require("../merchant");
const rate_1 = require("../rate");
const __1 = require("..");
class FetchMerchantInput {
    constructor() {
        this.post_offset = 0;
        this.post_limit = 10;
        this.comment_offset = 0;
        this.comment_limit = 10;
        this.rate_offset = 0;
        this.rate_limit = 10;
        this.child_post_offset = 0;
        this.child_post_limit = 1;
        this.child_comment_offset = 0;
        this.child_comment_limit = 1;
        this.child_rate_offset = 0;
        this.child_rate_limit = 1;
    }
}
exports.FetchMerchantInput = FetchMerchantInput;
let MerchantRepository = class MerchantRepository extends typeorm_1.Repository {
    async build(rMerchant) {
        var _a;
        console.log('<MerchantRepository| build| rMerchant>', rMerchant);
        const rTitles = [...(_a = rMerchant) === null || _a === void 0 ? void 0 : _a.tag_titles];
        delete rMerchant.tag_titles;
        const auth = await auth_entity_1.Auth.findOneOrFail(rMerchant.auth_id);
        const nArticle = article_entity_1.Article.of({
            article_type: article_type_enum_1.ArticleType.MERCHANT_PROFILE,
        });
        const nMerchant = merchant_1.Merchant.of(rMerchant);
        nMerchant.article = nArticle;
        const gMerchant = await merchant_1.Merchant.save(nMerchant);
        const query = this.createQueryBuilder()
            .relation(merchant_1.Merchant, 'tags')
            .of(gMerchant.merchant_id);
        for (const title of rTitles) {
            const tag = await tag_entity_1.Tag.findOne({ tag_title: title });
            try {
                if (tag) {
                    const res = await query.add(tag.tag_id);
                    console.log('<merchant.repository| res>', res);
                }
                else {
                    const nTag = tag_entity_1.Tag.of({ tag_title: title });
                    const gTag = await tag_entity_1.Tag.save(nTag);
                    const res = await query.add(gTag.tag_id);
                    console.log('<merchant.repository| res>', res);
                }
            }
            catch (error) {
                console.log('<merchant.repository| tag creating error>', error);
            }
        }
        return this.fetchById(gMerchant.merchant_id);
    }
    async rebuild(rMerchant) {
        const fMerchant = await merchant_1.Merchant.findOneOrFail(rMerchant.merchant_id);
        const tuMerchant = Object.assign(fMerchant, rMerchant);
        await merchant_1.Merchant.save(tuMerchant);
        const merchant = this.fetchById(rMerchant.merchant_id);
        return merchant;
    }
    async fetchById(rId) {
        const fMerchant = await merchant_1.Merchant.findOne({
            relations: ["article", "article.posts", "article.comments", "article.hearts", "article.rates",],
            where: { merchant_id: rId },
        });
        console.log('<m.r.ts| fetchById| fMerchant>', fMerchant);
        return fMerchant;
    }
    async fetch01(i) {
        const merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = `
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
        const merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = `
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
        const merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg = `
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
        const rawQuery = `
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
        `
      --, (${merchant_posts_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as posts
      --, (${merchant_comments_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as comments
      --, (${merchant_rates_allcolumn_firstcomment_liked_heartcount_commentcount_ratecount_rateavg}) as rates
      
    `;
        const fResult = await merchant_1.Merchant.query(rawQuery, [i.merchant_id, i.auth_id]);
        return fResult;
    }
    async fetch02(i) {
        const fMerchant = await merchant_1.Merchant.findOne({
            relations: ["article", "article.posts", "article.comments", "article.hearts", "article.rates",],
            where: { merchant_id: i.merchant_id },
        });
        console.warn("<f02| merchants:>", fMerchant);
        return fMerchant;
    }
    async fetch03(i) {
        const merchants = await merchant_1.Merchant.find({
            relations: ["article"],
            where: { merchant_id: i.merchant_id },
            order: {
                created_at: "DESC"
            },
            skip: 0,
            take: 10,
        });
        console.warn("<f03| merchant:>", merchants);
        const promises = merchants.map(async (merchant) => {
            merchant.article.comments = await comment_1.Comment.createQueryBuilder("comment")
                .where("comment.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
                .getMany();
            merchant.article.posts = await post_1.Post.createQueryBuilder("post")
                .where("post.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
                .getMany();
            merchant.article.rates = await rate_1.Rate.createQueryBuilder("rate")
                .where("rate.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
                .getMany();
        });
        await Promise.all(promises);
        return merchants;
    }
    async fetch04(i) {
        const merchant = await merchant_1.Merchant.findOne({
            relations: ["article"],
            where: { merchant_id: i.merchant_id },
        });
        merchant.article.posts = await post_1.Post.createQueryBuilder("post")
            .where("post.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
            .leftJoinAndSelect("post.post_article", "article")
            .orderBy("created_at", "DESC")
            .offset(i.post_offset)
            .limit(i.post_limit)
            .getMany();
        const postsPromises = merchant.article.posts.map(async (post) => {
            post.post_article = Object.assign(Object.assign(Object.assign({}, post.post_article), await __1.Heart.createQueryBuilder("heart")
                .select([])
                .addSelect("COUNT(*)", "heart_counts")
                .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
                .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
                .setParameter("auth_id", i.auth_id)
                .setParameter("post_article_id", post.post_article_id)
                .getRawOne()), { comments: await comment_1.Comment.createQueryBuilder("comment")
                    .addSelect(sq => {
                    return sq.select("count(*)", "comment_comment_count")
                        .from("comment", "comment")
                        .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id });
                }, "comment_comment_count")
                    .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })
                    .setParameter("post_article_id", post.post_article_id)
                    .orderBy("created_at", "DESC")
                    .limit(1)
                    .getOne() });
        });
        await Promise.all(postsPromises);
        return merchant;
    }
    async fetch05(i) {
        let merchant = await merchant_1.Merchant.findOne({
            relations: ["article"],
            where: { merchant_id: i.merchant_id },
        });
        merchant.article.posts = await post_1.Post.createQueryBuilder("post")
            .where("post.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
            .leftJoinAndSelect("post.post_article", "article")
            .orderBy("created_at", "DESC")
            .offset(i.post_offset)
            .limit(i.post_limit)
            .getMany();
        const postsPromises = merchant.article.posts.map(async (post) => {
            post.post_article = Object.assign(Object.assign(Object.assign({}, post.post_article), await __1.Heart.createQueryBuilder("heart")
                .select([])
                .addSelect("COUNT(*)", "heart_counts")
                .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
                .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
                .setParameter("auth_id", i.auth_id)
                .setParameter("post_article_id", post.post_article_id)
                .getRawOne()), { comments: await comment_1.Comment.createQueryBuilder("comment")
                    .addSelect(sq => {
                    return sq.select("count(*)", "comment_comment_count")
                        .from("comment", "comment")
                        .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id });
                }, "comment_comment_count")
                    .where("comment.audience_article_id = :post_article_id", { post_article_id: post.post_article_id })
                    .setParameter("post_article_id", post.post_article_id)
                    .orderBy("created_at", "DESC")
                    .limit(1)
                    .getOne() });
        });
        merchant = Object.assign(Object.assign({}, merchant), await rate_1.Rate.createQueryBuilder("rate")
            .select([])
            .addSelect("COUNT(*)", "rate_count")
            .addSelect("AVG(rate_stars)", "rate_avg")
            .where("rate.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
            .getRawOne());
        merchant.article.rates = await rate_1.Rate.createQueryBuilder("rate")
            .where("rate.audience_article_id = :merchant_article_id", { merchant_article_id: merchant.article_id })
            .leftJoinAndSelect("rate.rate_article", "article")
            .orderBy("created_at", "DESC")
            .offset(i.rate_offset)
            .limit(i.rate_limit)
            .getMany();
        const ratesPromises = merchant.article.rates.map(async (rate) => {
            rate.rate_article = Object.assign(Object.assign(Object.assign({}, rate.rate_article), await __1.Heart.createQueryBuilder("heart")
                .select([])
                .addSelect("COUNT(*)", "heart_counts")
                .addSelect("exists(select 1 from heart where heart.article_id = :rate_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
                .where("heart.article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
                .setParameter("auth_id", i.auth_id)
                .setParameter("rate_article_id", rate.rate_article_id)
                .getRawOne()), { comments: await comment_1.Comment.createQueryBuilder("comment")
                    .addSelect(sq => {
                    return sq.select("count(*)", "comment_comment_count")
                        .from("comment", "comment")
                        .where("comment.audience_article_id = :rate_article_id", { rate_article_id: rate.rate_article_id });
                }, "comment_comment_count")
                    .where("comment.audience_article_id = :rate_article_id", { rate_article_id: rate.rate_article_id })
                    .setParameter("rate_article_id", rate.rate_article_id)
                    .orderBy("created_at", "DESC")
                    .limit(1)
                    .getOne() });
        });
        await Promise.all(postsPromises);
        await Promise.all(ratesPromises);
        console.warn("merchant.repo| fetch05| merchant", JSON.stringify(merchant, null, 2));
        return merchant;
    }
};
MerchantRepository = __decorate([
    typeorm_1.EntityRepository(merchant_1.Merchant)
], MerchantRepository);
exports.MerchantRepository = MerchantRepository;
//# sourceMappingURL=merchant.repository.js.map