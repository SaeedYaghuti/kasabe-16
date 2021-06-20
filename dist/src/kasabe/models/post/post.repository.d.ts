import { Repository } from 'typeorm';
import { BuildPostInput } from './dto/create_post.input';
import { Post } from './post.entity';
import { UpdatePostInput } from './dto/update_post.input';
export declare class PostRepository extends Repository<Post> {
    private logger;
    build(rPost: BuildPostInput): Promise<Post>;
    rebuild(rPost: UpdatePostInput): Promise<Post>;
    fetchById(rId: number): Promise<Post>;
    getMerchantPostsForAuth01(rMerchantId: number, rUsrId: number): Promise<Post[]>;
    getMerchantPostsForAuth02(rMerchantId: number, rUsrId: number): Promise<Post[]>;
    getMerchantPostsForAuth03(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantPostsForAuth04(rMerchantId: number, rUsrId: number): Promise<any[]>;
    getMerchantPostsForAuth05(rMerchantId: number, rAuthId: number): Promise<any[]>;
    getMerchantPostsForAuth06(rMerchantId: number, rAuthId: number): Promise<Post[]>;
    getMerchantPostsData(merchant_article_id: number, auth_id: number): Promise<Post[]>;
    getPostHeart(auth_id: number, post_article_id: number): Promise<any>;
    getPostCommentData(post_article_id: number): Promise<any>;
    fetch01(post_id: number, auth_id: number): Promise<any>;
}
