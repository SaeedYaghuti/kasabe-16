import { Repository } from 'typeorm';
import { BuildCommentInput } from './dto/create_comment.input';
import { Comment } from '../comment';
import { UpdateCommentInput } from './dto/update_comment.input';
export declare class CommentRepository extends Repository<Comment> {
    private logger;
    build(rComment: BuildCommentInput): Promise<Comment>;
    rebuild(rComment: UpdateCommentInput): Promise<Comment>;
    fetchById(rId: number): Promise<Comment>;
    getMerchantCommentsForAuth01(rMerchantId: number, rUsrId: number): Promise<Comment[]>;
    getMerchantCommentsForAuth02(rMerchantId: number, rUsrId: number): Promise<Comment[]>;
    getMerchantCommentsForAuth03(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantCommentsForAuth04(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantCommentsForAuth05(rMerchantId: number, rAuthId: number): Promise<any[]>;
    getMerchantCommentsForAuth06(rMerchantId: number, rAuthId: number): Promise<Comment[]>;
    fetch01(comment_id: number, auth_id: number): Promise<any>;
}
