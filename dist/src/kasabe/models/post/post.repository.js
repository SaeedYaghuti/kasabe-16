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
const post_entity_1 = require("./post.entity");
const article_entity_1 = require("../article/article.entity");
const article_type_enum_1 = require("../article/article_type.enum");
const merchant_entity_1 = require("../merchant/merchant.entity");
const heart_1 = require("../heart");
const comment_1 = require("../comment");
let PostRepository = class PostRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('PostRepository');
    }
    async build(rPost) {
        console.log('PostRepository rPost: ', rPost);
        const nArticle = article_entity_1.Article.of({
            article_type: article_type_enum_1.ArticleType.POST,
        });
        const merchant = await merchant_entity_1.Merchant.findOneOrFail({
            where: { merchant_id: rPost.merchant_id },
        });
        const nPost = post_entity_1.Post.of(rPost);
        nPost.post_article = nArticle;
        nPost.audience_article_id = merchant.article_id;
        const gPost = await nPost.save();
        return this.fetchById(gPost.post_id);
    }
    async rebuild(rPost) {
        console.log('PostRepository rData: ', rPost);
        const nPost = new post_entity_1.Post();
        try {
            await nPost.save();
            const fPost = await post_entity_1.Post.findOne(rPost.post_id);
            console.log('fPost: ', fPost);
            return fPost;
        }
        catch (error) {
            this.logger.error(`!> Failed to update post: ${JSON.stringify(rPost)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update post',
                origin: '@post.repository.ts',
                post: rPost,
            });
        }
    }
    async fetchById(rId) {
        console.log('PostRepository rId: ', rId);
        const fPost = await post_entity_1.Post.findOne({
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
    async getMerchantPostsForAuth01(rMerchantId, rUsrId) {
        console.log('<getMerchantPostsForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fPost = await post_entity_1.Post.find({
            relations: ["merchant"],
            where: { merchant_id: rMerchantId },
        });
        return fPost;
    }
    async getMerchantPostsForAuth02(rMerchantId, rUsrId) {
        console.log('<getMerchantPostsForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fPosts = await post_entity_1.Post.createQueryBuilder("post")
            .where("post.merchant_id = :rMerchantId", { rMerchantId })
            .getMany();
        return fPosts;
    }
    async getMerchantPostsForAuth03(rMerchantId, rUsrId) {
        console.log('<getMerchantPostsForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fPost = await post_entity_1.Post.createQueryBuilder("post")
            .leftJoinAndSelect("post.hearts", "heart")
            .getRawMany();
        return fPost;
    }
    async getMerchantPostsForAuth04(rMerchantId, rUsrId) {
        console.log('<getMerchantPostsForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fResult = await post_entity_1.Post.createQueryBuilder("post")
            .leftJoinAndSelect("post.hearts", "heart")
            .select("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .groupBy("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .where("post.merchant_id = :rMerchantId", { rMerchantId })
            .getRawMany();
        return fResult;
    }
    async getMerchantPostsForAuth05(rMerchantId, rAuthId) {
        console.log('<getMerchantPostsForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);
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
        const fResult = await post_entity_1.Post.createQueryBuilder("post")
            .leftJoinAndSelect("post.hearts", "heart")
            .select("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")
            .groupBy("post.post_id, post.merchant_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .where("post.merchant_id = :rMerchantId", { rMerchantId })
            .setParameter("rAuthId", rAuthId)
            .getRawMany();
        return fResult;
    }
    async getMerchantPostsForAuth06(rMerchantId, rAuthId) {
        console.log('<getMerchantPostsForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);
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
        const query = `
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
        const fResult = await post_entity_1.Post.query(query, [1, 1]);
        return fResult;
    }
    async getMerchantPostsData(merchant_article_id, auth_id) {
        const posts = await post_entity_1.Post.createQueryBuilder("post")
            .leftJoinAndSelect("post.post_article", "article")
            .leftJoinAndSelect("article.hearts", "heart")
            .select("post.post_id, post.audience_article_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .addSelect("exists(select 1 from heart where heart.article_id = post.post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .groupBy("post.post_id, post.audience_article_id, post.post_text, post.picture_urls, post.created_at, post.updated_at")
            .where("post.audience_article_id = :merchant_article_id", { merchant_article_id })
            .setParameter("auth_id", auth_id)
            .getRawMany();
        return posts;
    }
    async getPostHeart(auth_id, post_article_id) {
        const heart_data = await heart_1.Heart.createQueryBuilder("heart")
            .select([])
            .addSelect("COUNT(*)", "heart_counts")
            .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .where("heart.article_id = :post_article_id", { post_article_id })
            .setParameter("auth_id", auth_id)
            .setParameter("post_article_id", post_article_id)
            .getRawOne();
        return heart_data;
    }
    async getPostCommentData(post_article_id) {
        const auth_id = 1;
        const comment_data = await comment_1.Comment.createQueryBuilder("comment")
            .addSelect(sq => {
            return sq.select("count(*)", "comment_comment_count")
                .from("comment", "comment")
                .where("comment.audience_article_id = :post_article_id", { post_article_id });
        }, "comment_comment_count")
            .where("comment.audience_article_id = :post_article_id", { post_article_id })
            .setParameter("post_article_id", post_article_id)
            .orderBy("created_at", "DESC")
            .limit(1)
            .getOne();
        return comment_data;
    }
    async fetch01(post_id, auth_id) {
        const post = await post_entity_1.Post.findOne({
            relations: ["post_article"],
            where: { post_id: post_id },
            order: {
                created_at: "DESC"
            },
        });
        console.warn("<post.repo.ts| f01| post:>", post);
        post.post_article = Object.assign(Object.assign({}, post.post_article), await heart_1.Heart.createQueryBuilder("heart")
            .select([])
            .addSelect("COUNT(*)", "heart_counts")
            .addSelect("exists(select 1 from heart where heart.article_id = :post_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .where("heart.article_id = :post_article_id", { post_article_id: post.post_article_id })
            .setParameter("auth_id", auth_id)
            .setParameter("post_article_id", post.post_article_id)
            .getRawOne());
        return post;
    }
};
PostRepository = __decorate([
    typeorm_1.EntityRepository(post_entity_1.Post)
], PostRepository);
exports.PostRepository = PostRepository;
//# sourceMappingURL=post.repository.js.map