import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { MerchantCategoryService } from './merchant_category.service';
import { BuildMerchantCategoryInput } from './dto/create_merchant_category.input';
import { UpdateMerchantCategoryInput } from './dto/update_merchant_category.input';
import { MerchantCategory } from './merchant_category.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('MerchantCategory')
export class MerchantCategoryResolver {
    // Constructor
    constructor(
        private merchantCategoryService: MerchantCategoryService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async merchantCategoryTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('merchantCategoryTestQuery is running...');
        return await this.merchantCategoryService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async merchantCategoryTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.merchantCategoryService.testQuery(message);
    }
    
    //#endregion

    // Merchant_Category
    @Mutation(() => MerchantCategory)
    async build( @Args('merchantCategory') merchantCategory: BuildMerchantCategoryInput ): Promise<MerchantCategory> {
        console.log('mutation build() is running...');
        return await this.merchantCategoryService.build(merchantCategory);
    }
    @Query(() => MerchantCategory)
    async fetchById(@Args('merchantCategory_id') merchantCategory_id: number): Promise<MerchantCategory> {
        return await this.merchantCategoryService.fetchById(merchantCategory_id);
    }
    @Mutation(() => MerchantCategory)
    async rebuild( @Args('merchantCategory') merchantCategory: UpdateMerchantCategoryInput ): Promise<MerchantCategory> {
        console.log('mutation rebuild() is running...');
        return await this.merchantCategoryService.rebuild(merchantCategory);
    }
    

}
