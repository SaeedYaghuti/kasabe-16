import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
// import { PubSubEngine  } from 'graphql-subscriptions';
// import { Inject } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierInput } from './dto/create_supplier.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { Supplier } from './supplier.entity';
// import { MessageType } from 'src/ecommerce/dto/message.type';
import { MessageType } from '../../../util/type/message.type';
import { BadRequestException } from '@nestjs/common';

const PONG_EVENT_NAME = 'pong';

@Resolver('Supplier')
export class SupplierResolver {
    // Constructor
    constructor(
        private supplierService: SupplierService,

        // @Inject('PUB_SUB') 
        // private pubSub: PubSubEngine,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async supplierTestQuery(@Args('message') message: string): Promise<MessageType> {
        return await this.supplierService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async supplierTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.supplierService.testQuery(message);
    }
    
    //#endregion

    // Supplier
    @Mutation(() => Supplier)
    async build( @Args('supplier') supplier: CreateSupplierInput ): Promise<Supplier> {
        console.log('mutation build() is running...');
        return await this.supplierService.build(supplier);
    }
    @Mutation(() => Supplier)
    async rebuild( @Args('supplier') supplier: UpdateSupplierInput ): Promise<Supplier> {
        console.log('mutation rebuild() is running...');
        return await this.supplierService.rebuild(supplier);
    }
    @Query(() => Supplier)
    async fetchById (@Args('supplier_id') supplier_id: number): Promise<Supplier> {
        const supplier = await this.supplierService.fetchById(supplier_id);

        if (!supplier) throw new BadRequestException(`There is no supplier with id ${supplier_id}`);

        return supplier;
    }

}
