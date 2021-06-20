import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { BuildCommentInput } from './dto/create_comment.input';
import { UpdateCommentInput } from './dto/update_comment.input';
import { Comment } from './comment.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Comment')
export class CommentResolver {
    // Constructor
    constructor(
        private commentService: CommentService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async commentTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('commentTestQuery is running...');
        return await this.commentService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async commentTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.commentService.testQuery(message);
    }
    
    //#endregion

    // Comment
    @Mutation(() => Comment)
    async build( @Args('comment') comment: BuildCommentInput ): Promise<Comment> {
        console.log('mutation build() is running...');
        return await this.commentService.build(comment);
    }
    @Mutation(() => Comment)
    async rebuild( @Args('comment') comment: UpdateCommentInput ): Promise<Comment> {
        console.log('mutation rebuild() is running...');
        return await this.commentService.rebuild(comment);
    }
    @Query(() => Comment)
    async fetchById (@Args('comment_id') rId: number): Promise<Comment> {
        return await this.commentService.fetchById(rId);
    }

}
