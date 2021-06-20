import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { SeenService } from './seen.service';
import { BuildSeenInput } from './dto/create_seen.input';
import { UpdateSeenInput } from './dto/update_seen.input';
import { Seen } from './seen.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Seen')
export class SeenResolver {
    // Constructor
    constructor(
        private seenService: SeenService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async seenTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('seenTestQuery is running...');
        return await this.seenService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async seenTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.seenService.testQuery(message);
    }
    
    //#endregion

    // Seen
    @Mutation(() => Seen)
    async build( @Args('seen') seen: BuildSeenInput ): Promise<Seen> {
        console.log('mutation build() is running...');
        return await this.seenService.build(seen);
    }
    @Mutation(() => Seen)
    async rebuild( @Args('seen') seen: UpdateSeenInput ): Promise<Seen> {
        console.log('mutation rebuild() is running...');
        return await this.seenService.rebuild(seen);
    }
    @Query(() => Seen)
    async fetchById (@Args('seen_id') rId: number): Promise<Seen> {
        return await this.seenService.fetchById(rId);
    }

}
