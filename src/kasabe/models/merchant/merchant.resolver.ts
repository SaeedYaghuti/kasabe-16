import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSubEngine  } from 'graphql-subscriptions';
import { Inject, BadRequestException } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { BuildMerchantInput } from './dto/create_merchant.input';
import { UpdateMerchantInput } from './dto/update_merchant.input';
import { Merchant } from './merchant.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Merchant')
export class MerchantResolver {
    // Constructor
    constructor(
        private merchantService: MerchantService,
    ) {}
    
    //#region  Test

    @Query(type => MessageType)
    async merchantTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('merchantTestQuery is running...');
        return await this.merchantService.testQuery(message);
    }
    
    @Mutation(type => MessageType)
    async merchantTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.merchantService.testQuery(message);
    }
    
    //#endregion

    // Merchant
    @Mutation(type => Merchant)
    async build( @Args('merchant') merchant: BuildMerchantInput ): Promise<Merchant> {
        console.log('mutation build() is running...');
        return await this.merchantService.build(merchant);
    }
    @Mutation(type => Merchant)
    async rebuild( @Args('merchant') merchant: UpdateMerchantInput ): Promise<Merchant> {
        console.log('mutation rebuild() is running...');
        return await this.merchantService.rebuild(merchant);
    }
    @Query(type => Merchant)
    async fetchById (@Args('merchant_id') merchant_id: number): Promise<Merchant> {
        
        const merchant = await this.merchantService.fetchById(merchant_id);
    
        if (!merchant) throw new BadRequestException(`There is no merchant with id ${merchant_id}`);

        return merchant;
    }

}
