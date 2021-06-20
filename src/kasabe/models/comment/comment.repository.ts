import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { BuildCommentInput } from './dto/create_comment.input';
import { Comment } from '../comment';
import { UpdateCommentInput } from './dto/update_comment.input';
import { group } from 'console';
import { groupBy } from 'rxjs/operators';
import { Article } from '../article/article.entity';
import { ArticleType } from '../article/article_type.enum';
import { Heart } from '../heart';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private logger = new Logger('CommentRepository');

  async build( rComment: BuildCommentInput ): Promise<Comment> {
    console.log('CommentRepository rComment: ', rComment);

    const nArticle = Article.of({
      article_type: ArticleType.COMMENT,
    });

    const nComment = Comment.of(rComment);
    nComment.comment_article = nArticle;

    const gComment = await nComment.save();

    return this.fetchById(gComment.comment_id);

  }
  
  async rebuild( rComment: UpdateCommentInput ): Promise<Comment> {
    console.log('CommentRepository rData: ', rComment);

    const nComment = new Comment();
    
    try {
      await nComment.save();
      const fComment = await Comment.findOne(rComment.comment_id);
      console.log('fComment: ', fComment);
      return fComment;
    } catch (error) {
      this.logger.error(
        `!> Failed to update comment: ${JSON.stringify(rComment)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update comment',
        origin: '@comment.repository.ts',
        comment: rComment,
      });
    }
  }
  
  async fetchById( rId: number ): Promise<Comment> {
    console.log('CommentRepository rId: ', rId);

    const fComment = await Comment.findOne({ 
      relations: ["auth", "comment_article", "audience_article"],
      where: { comment_id: rId },
    });

    console.log('<m.r.ts| fetchById| fComment>', fComment);
    return fComment;
  }

  // TODO: get all comment related to merchant-id 
  // TODO: with total of hearts for each comment 
  // TODO: with did auth-id heart each comment
  async getMerchantCommentsForAuth01(rMerchantId: number, rUsrId: number ): Promise<Comment[]> {
    console.log('<getMerchantCommentsForAuth01| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* comment_data: ✅, merchant_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fComment = await Comment.find({ 
      relations: ["merchant"],
      where: { merchant_id: rMerchantId },
    });

    return fComment;
  }
  
  async getMerchantCommentsForAuth02(rMerchantId: number, rUsrId: number ): Promise<Comment[]> {
    console.log('<getMerchantCommentsForAuth02| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* comment_data: ✅, heart_data: ❌, heart_counts: ❌, liked: ❌
    const fComments: Comment[] = await Comment.createQueryBuilder("comment")
      .where("comment.merchant_id = :rMerchantId", { rMerchantId })
      .getMany();
    
    return fComments;
  }
  
  async getMerchantCommentsForAuth03(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantCommentsForAuth03| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* comment_data: ✅, heart_data: ✅, heart_counts: ❌, liked: ❌
    const fComment = await Comment.createQueryBuilder("comment")
    .leftJoinAndSelect("comment.hearts", "heart")
    .getRawMany();


    return fComment;
  }
  
  async getMerchantCommentsForAuth04(rMerchantId: number, rUsrId: number ): Promise<any[]> {
    console.log('<getMerchantCommentsForAuth04| rMerchantId, rUsrId>', rMerchantId, rUsrId);

    //* comment_data: ✅, heart_counts: ✅, liked: ❌
    // const fComments: Comment[] = await Comment.createQueryBuilder("comment")
    const fResult = await Comment.createQueryBuilder("comment")
    .leftJoinAndSelect("comment.hearts", "heart")
    .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .groupBy("comment.comment_id")
    .groupBy("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
    .where("comment.merchant_id = :rMerchantId", { rMerchantId })
    // .andWhere("heart.auth_id = :rUsrId", { rUsrId })
    .getRawMany();


    return fResult;
  }
  
  //! not-working
  async getMerchantCommentsForAuth05(rMerchantId: number, rAuthId: number ): Promise<any[]> {
    console.log('<getMerchantCommentsForAuth05| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* comment_data: ✅, heart_counts: ✅,
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
    const fResult = await Comment.createQueryBuilder("comment")
    .leftJoinAndSelect("comment.hearts", "heart")
    .select("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")  
    .addSelect("COUNT(heart.heart_id)", "heart_counts")
    // .addSelect("select COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from `heart` l where l.auth_id = :rAuthId", "did_i_heart")
    // .addSelect("COUNT(heart.heart_id) from heart where heart.auth_id = :rAuthId", "did_i_heart")
    .addSelect('COUNT("heart".heart_id) from "heart" where "heart".auth_id = :rAuthId', "did_i_heart")

    .groupBy("comment.comment_id, comment.merchant_id, comment.comment_text, comment.picture_urls, comment.created_at, comment.updated_at")
    .where("comment.merchant_id = :rMerchantId", { rMerchantId })
    .setParameter("rAuthId", rAuthId)
    .getRawMany();
    // .getQueryAndParameters();


    return fResult;
  }
  
  //* Raw Query
  async getMerchantCommentsForAuth06(rMerchantId: number, rAuthId: number ): Promise<Comment[]> {
    console.log('<getMerchantCommentsForAuth06| rMerchantId, rUsrId>', rMerchantId, rAuthId);

    //* comment_data: ✅, heart_counts: ✅, liked: ✅
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
    
    const rawQuery = 
    `
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
    const fResult = await Comment.query(rawQuery, [1, 1]);


    return fResult;
  }

  //* todo: get heart data for comment with seperate query
  async fetch01( comment_id: number, auth_id: number): Promise<any> {

    const comment = await Comment.findOne({ 
      relations: ["comment_article"],
      where: { comment_id: comment_id },
      order: {
        created_at: "DESC"
      },
      // skip: 0,
      // take: 10,
      // catche: true,
    });
    
    console.warn("<comment.repo.ts| f01| comment:>", comment);

    comment.comment_article = {
      ... comment.comment_article,
      ... await Heart.createQueryBuilder("heart")
      .select([])
      .addSelect("COUNT(*)", "heart_counts")
      .addSelect("exists(select 1 from heart where heart.article_id = :comment_article_id and heart.auth_id = :auth_id  limit 1)", "liked")
      .where("heart.article_id = :comment_article_id", { comment_article_id: comment.comment_article_id })
      .setParameter("auth_id", auth_id)
      .setParameter("comment_article_id", comment.comment_article_id)
      .getRawOne(),

    } 

    // await Promise.all(promises);

    return comment;
    // return fResult;
  }




}

// export class CommentRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
