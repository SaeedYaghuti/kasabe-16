import { CommentService } from './comment.service';
import { BuildCommentInput } from './dto/create_comment.input';
import { UpdateCommentInput } from './dto/update_comment.input';
import { Comment } from './comment.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class CommentResolver {
    private commentService;
    constructor(commentService: CommentService);
    commentTestQuery(message: string): Promise<MessageType>;
    commentTestMutation(message: string): Promise<MessageType>;
    build(comment: BuildCommentInput): Promise<Comment>;
    rebuild(comment: UpdateCommentInput): Promise<Comment>;
    fetchById(rId: number): Promise<Comment>;
}
