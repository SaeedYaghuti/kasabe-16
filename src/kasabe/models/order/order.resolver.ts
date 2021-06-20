import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create_order.input';
import { UpdateOrderInput } from './dto/update_order.input';
import { Order } from './order.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Order')
export class OrderResolver {
    // Constructor
    constructor(
        private orderService: OrderService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async orderTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('orderTestQuery is running...');
        return await this.orderService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async orderTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.orderService.testQuery(message);
    }
    
    //#endregion

    // Order
    @Mutation(() => Order)
    async build( @Args('order') order: CreateOrderInput ): Promise<Order> {
        console.log('<OrderResolver => build() is running...>');
        return await this.orderService.build(order);
    }
    @Query(() => Order)
    async fetchById (@Args('order_id') rId: number): Promise<Order> {
        return await this.orderService.fetchById(rId);
    }
    @Mutation(() => Order)
    async rebuild( @Args('order') order: UpdateOrderInput ): Promise<Order> {
        console.log('mutation rebuild() is running...');
        return await this.orderService.rebuild(order);
    }
    

}
