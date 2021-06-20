import { PostService } from './post.service';
import { BuildPostInput } from './dto/create_post.input';
import { UpdatePostInput } from './dto/update_post.input';
import { Post } from './post.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class PostResolver {
    private postService;
    constructor(postService: PostService);
    postTestQuery(message: string): Promise<MessageType>;
    postTestMutation(message: string): Promise<MessageType>;
    build(post: BuildPostInput): Promise<Post>;
    rebuild(post: UpdatePostInput): Promise<Post>;
    fetchById(rId: number): Promise<Post>;
}
