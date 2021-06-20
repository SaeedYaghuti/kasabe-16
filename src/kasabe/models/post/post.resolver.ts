import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PostService } from './post.service';
import { BuildPostInput } from './dto/create_post.input';
import { UpdatePostInput } from './dto/update_post.input';
import { Post } from './post.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Post')
export class PostResolver {
    // Constructor
    constructor(
        private postService: PostService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async postTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('postTestQuery is running...');
        return await this.postService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async postTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.postService.testQuery(message);
    }
    
    //#endregion

    // Post
    @Mutation(() => Post)
    async build( @Args('post') post: BuildPostInput ): Promise<Post> {
        console.log('mutation build() is running...');
        return await this.postService.build(post);
    }
    @Mutation(() => Post)
    async rebuild( @Args('post') post: UpdatePostInput ): Promise<Post> {
        console.log('mutation rebuild() is running...');
        return await this.postService.rebuild(post);
    }
    @Query(() => Post)
    async fetchById (@Args('post_id') rId: number): Promise<Post> {
        return await this.postService.fetchById(rId);
    }

}
