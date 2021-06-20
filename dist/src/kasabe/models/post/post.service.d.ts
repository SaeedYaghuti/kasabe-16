import { BuildPostInput } from './dto/create_post.input';
import { UpdatePostInput } from './dto/update_post.input';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
export declare class PostService {
    private postRepository;
    constructor(postRepository: PostRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(post: BuildPostInput): Promise<Post>;
    rebuild(post: UpdatePostInput): Promise<Post>;
    fetchById(rId: number): Promise<Post>;
}
