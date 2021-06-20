import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSubEngine  } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { KasabeService } from '../../kasabe.service';
import { UpdateTagInput } from './dto/update_tag.input';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { MessageType } from '../../../util/type/message.type';
import { BuildTagInput } from './dto/create_tag.input';

const PONG_EVENT_NAME = 'pong';

@Resolver('Tag')
export class TagResolver {
    // Constructor
    constructor(
        private tagService: TagService,

        // @Inject('PUB_SUB') 
        // private pubSub: PubSubEngine,
    ) {}
    
    //#region  Test
    @Query(() => MessageType)
    async tagTestQuery(@Args('message') message: string): Promise<MessageType> {
        return await this.tagService.testQuery(message);
    }
    @Mutation(() => MessageType)
    async tagTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await {
            message: message
        };
    }
    //#endregion

    // Tag

    @Mutation(() => Tag)
    async build( @Args('tag') tag: BuildTagInput ): Promise<Tag> {
       
        const gTag = await this.tagService.build(tag);
        
        return gTag;
    }

    @Mutation(() => Tag)
    async rebuild( @Args('tag') tag: UpdateTagInput ): Promise<Tag> {
        // console.log('mutation rebuild() is running...');
        return await this.tagService.rebuild(tag);
    }

    @Query(() => Tag)
    async fetchById (@Args('tag_id') tag_id: number): Promise<Tag> {
        return await this.tagService.fetchById(tag_id);
    }
    
    // @Subscription('tagCreated')
    // tagCreated() {
    //     console.log('tagCreated Subscription');
    //     // return this.pubSub.asyncIterator('tagCreated');
    // }

}
