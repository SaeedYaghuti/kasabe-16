import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create_customer.input';
import { UpdateCustomerInput } from './dto/update_customer.input';
import { Customer } from './customer.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Customer')
export class CustomerResolver {
    // Constructor
    constructor(
        private customerService: CustomerService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async customerTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('customerTestQuery is running...');
        return await this.customerService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async customerTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.customerService.testQuery(message);
    }
    
    //#endregion

    // Customer
    @Mutation(() => Customer)
    async build( @Args('customer') customer: CreateCustomerInput ): Promise<Customer> {
        console.log('mutation build() is running...');
        return await this.customerService.build(customer);
    }
    @Query(() => Customer)
    async fetchById (@Args('customer_id') rId: number): Promise<Customer> {
        return await this.customerService.fetchById(rId);
    }
    @Mutation(() => Customer)
    async rebuild( @Args('customer') customer: UpdateCustomerInput ): Promise<Customer> {
        console.log('mutation rebuild() is running...');
        return await this.customerService.rebuild(customer);
    }
    

}
