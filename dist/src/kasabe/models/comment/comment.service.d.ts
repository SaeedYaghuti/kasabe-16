import { BuildCommentInput } from './dto/create_comment.input';
import { UpdateCommentInput } from './dto/update_comment.input';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
export declare class CommentService {
    private commentRepository;
    constructor(commentRepository: CommentRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(comment: BuildCommentInput): Promise<Comment>;
    rebuild(comment: UpdateCommentInput): Promise<Comment>;
    fetchById(rId: number): Promise<Comment>;
}
