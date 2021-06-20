import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { HeartService } from './heart.service';
import { BuildHeartInput } from './dto/create_heart.input';
import { UpdateHeartInput } from './dto/update_heart.input';
import { Heart } from './heart.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Heart')
export class HeartResolver {
    // Constructor
    constructor(
        private heartService: HeartService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async heartTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('heartTestQuery is running...');
        return await this.heartService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async heartTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.heartService.testQuery(message);
    }
    
    //#endregion

    // Heart
    @Mutation(() => Heart)
    async build( @Args('heart') heart: BuildHeartInput ): Promise<Heart> {
        console.log('mutation build() is running...');
        return await this.heartService.build(heart);
    }
    @Mutation(() => Heart)
    async rebuild( @Args('heart') heart: UpdateHeartInput ): Promise<Heart> {
        console.log('mutation rebuild() is running...');
        return await this.heartService.rebuild(heart);
    }
    @Query(() => Heart)
    async fetchById (@Args('heart_id') rId: number): Promise<Heart> {
        return await this.heartService.fetchById(rId);
    }

}
