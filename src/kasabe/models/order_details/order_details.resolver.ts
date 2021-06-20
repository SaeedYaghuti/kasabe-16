import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { OrderDetailsService } from './order_details.service';
import { MessageType } from '../../../util/type/message.type';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetails } from './order_details.entity';


@Resolver('OrderDetails')
export class OrderDetailsResolver {
    // Constructor
    constructor(
        private orderDetailsService: OrderDetailsService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async orderDetailsTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('orderDetailsTestQuery is running...');
        return await this.orderDetailsService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async orderDetailsTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.orderDetailsService.testQuery(message);
    }
    
    //#endregion

    // OrderDetails
    @Mutation(() => OrderDetails)
    async buildDetails( @Args('orderDetails') orderDetails: CreateOrderDetailsInput ): Promise<OrderDetails> {
        console.log('mutation buildDetails() is running...');
        return await this.orderDetailsService.buildDetails(orderDetails);
    }
    @Mutation(() => OrderDetails)
    async rebuildDetails( @Args('orderDetails') orderDetails: UpdateOrderDetailsInput ): Promise<OrderDetails> {
        console.log('mutation rebuildDetails() is running...');
        return await this.orderDetailsService.rebuildDetails(orderDetails);
    }
    @Query(() => OrderDetails)
    async getOrderDetailsById (@Args('orderDetails_id') rId: number): Promise<OrderDetails> {
        return await this.orderDetailsService.getOrderDetailsById(rId);
    }

}
