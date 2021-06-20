import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RateService } from './rate.service';
import { BuildRateInput } from './dto/create_rate.input';
import { UpdateRateInput } from './dto/update_rate.input';
import { Rate } from './rate.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Rate')
export class RateResolver {
    // Constructor
    constructor(
        private rateService: RateService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async rateTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('rateTestQuery is running...');
        return await this.rateService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async rateTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('rateAdded', { rate: {id: 1, content: 'It is a message'} });
        return await this.rateService.testQuery(message);
    }
    
    //#endregion

    // Rate
    @Mutation(() => Rate)
    async build( @Args('rate') rate: BuildRateInput ): Promise<Rate> {
        console.log('mutation build() is running...');
        return await this.rateService.build(rate);
    }
    @Mutation(() => Rate)
    async rebuild( @Args('rate') rate: UpdateRateInput ): Promise<Rate> {
        console.log('mutation rebuild() is running...');
        return await this.rateService.rebuild(rate);
    }
    @Query(() => Rate)
    async fetchById (@Args('rate_id') rId: number): Promise<Rate> {
        return await this.rateService.fetchById(rId);
    }

}
