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
const comment_1 = require("../comment");
const article_entity_1 = require("../article/article.entity");
const article_type_enum_1 = require("../article/article_type.enum");
const heart_1 = require("../heart");
let CommentRepository = class CommentRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CommentRepository');
    }
    async build(rComment) {
        console.log('CommentRepository rComment: ', rComment);
        const nArticle = article_entity_1.Article.of({
            article_type: article_type_enum_1.ArticleType.COMMENT,
        });
        const nComment = comment_1.Comment.of(rComment);
        nComment.comment_article = nArticle;
        const gComment = await nComment.save();
        return this.fetchById(gComment.comment_id);
    }
    async rebuild(rComment) {
        console.log('CommentRepository rData: ', rComment);
        const nComment = new comment_1.Comment();
        try {
            await nComment.save();
            const fComment = await comment_1.Comment.findOne(rComment.comment_id);
            console.log('fComment: ', fComment);
            return fComment;
        }
        catch (error) {
            this.logger.error(`!> Failed to update comment: ${JSON.stringify(rComment)} ;`, error.stack);
            throw new common_1.InternalServerErrorException({
                message: '!> Failed to update comment',
                origin: '@comment.repository.ts',
                comment: rComment,
            });
        }
    }
    async fetchById(rId) {
        console.log('CommentRepository rId: ', rId);
        const fComment = await comment_1.Comment.findOne({
            relations: ["auth", "comment_article", "audience_article"],
            where: { comment_id: rId },
        });
        console.log('<m.r.ts| fetchById| fComment>', fComment);
        return fComment;
    }
    async getMerchantCommentsForAuth01(rMerchantId, rUsrId) {
        console.log('<getMerchantCommentsForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fComment = await comment_1.Comment.find({
            relations: ["merchant"],
            where: { merchant_id: rMerchantId },
        });
        return fComment;
    }
    async getMerchantCommentsForAuth02(rMerchantId, rUsrId) {
        console.log('<getMerchantCommentsForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fComments = await comment_1.Comment.createQueryBuilder("comment")
            .where("comment.merchant_id = :rMerchantId", { rMerchantId })
            .getMany();
        return fComments;
    }
    async getMerchantCommentsForAuth03(rMerchantId, rUsrId) {
        console.log('<getMerchantCommentsForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fComment = await comment_1.Comment.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.hearts", "heart")
            .getRawMany();
        return fComment;
    }
    async getMerchantCommentsForAuth04(rMerchantId, rUsrId) {
        console.log('<getMerchantCommentsForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);
        const fResult = await comment_1.Comment.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.hearts", "heart")
            .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .groupBy("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
            .where("comment.merchant_id = :rMerchantId", { rMerchantId })
            .getRawMany();
        return fResult;
    }
    async getMerchantCommentsForAuth05(rMerchantId, rAuthId) {
        console.log('<getMerchantCommentsForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);
        `SELECT 
    exists(select 1 from \`heart\` li where li.commentId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as commentId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.commentId = p.id) as heartd
    FROM
      auth u,
      comment p
    WHERE
      u.id = 2; `;
        const fResult = await comment_1.Comment.createQueryBuilder("comment")
            .leftJoinAndSelect("comment.hearts", "heart")
            .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
            .addSelect("COUNT(heart.heart_id)", "heart_counts")
            .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")
            .groupBy("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
            .where("comment.merchant_id = :rMerchantId", { rMerchantId })
            .setParameter("rAuthId", rAuthId)
            .getRawMany();
        return fResult;
    }
    async getMerchantCommentsForAuth06(rMerchantId, rAuthId) {
        console.log('<getMerchantCommentsForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);
        `SELECT 
    exists(select 1 from \`heart\` li where li.commentId = p.id and li.authId = u.id limit 1) as heartd
    , u.authname
    , p.id as commentId
    , p.text
    , (select count(distinct l.authId) from \`heart\` l where l.commentId = p.id) as heartd
    FROM
      auth u,
      comment p
    WHERE
      u.id = 2; `;
        const rawQuery = `
      SELECT 
        DISTINCT (comment.comment_id)
      , comment.merchant_id
      , comment.comment_text
      , comment.picture_urls
      , comment.created_at
      , comment.updated_at
      , (select count(heart.heart_id) from heart  where heart.comment_id = comment.comment_id) as heart_count
      , exists(select 1 from heart where heart.comment_id = comment.comment_id and heart.auth_id = $1 limit 1) as liked
      FROM
        comment LEFT JOIN heart on comment.comment_id = heart.comment_id
      WHERE
        comment.merchant_id = $2;
    `;
        const fResult = await comment_1.Comment.query(rawQuery, [1, 1]);
        return fResult;
    }
    async fetch01(comment_id, auth_id) {
        const comment = await comment_1.Comment.findOne({
            relations: ["comment_article"],
            where: { comment_id: comment_id },
            order: {
                created_at: "DESC"
            },
        });
        console.warn("<comment.repo.ts| f01| comment:>", comment);
        comment.comment_article = Object.assign(Object.assign({}, comment.comment_article), await heart_1.Heart.createQueryBuilder("heart")
            .select([])
            .addSelect("COUNT(*)", "heart_counts")
            .addSelect("exists(select 1 from heart where heart.article_id = :comment_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
            .where("heart.article_id = :comment_article_id", { comment_article_id: comment.comment_article_id })
            .setParameter("auth_id", auth_id)
            .setParameter("comment_article_id", comment.comment_article_id)
            .getRawOne());
        return comment;
    }
};
CommentRepository = __decorate([
    typeorm_1.EntityRepository(comment_1.Comment)
], CommentRepository);
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=comment.repository.js.map