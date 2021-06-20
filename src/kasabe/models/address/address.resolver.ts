import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create_address.input';
import { UpdateAddressInput } from './dto/update_address.input';
import { Address } from './address.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Address')
export class AddressResolver {
    // Constructor
    constructor(
        private addressService: AddressService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async addressTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('addressTestQuery is running...');
        return await this.addressService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async addressTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.addressService.testQuery(message);
    }
    
    //#endregion

    // Address
    @Mutation(() => Address)
    async build( @Args('address') address: CreateAddressInput ): Promise<Address> {
        console.log('mutation build() is running...');
        const gAddress = await this.addressService.build(address);
        console.log('<resolver| gAddress>', gAddress);
        return gAddress;
    }
    @Mutation(() => Address)
    async rebuild( @Args('address') address: UpdateAddressInput ): Promise<Address> {
        console.log('mutation rebuild() is running...');
        return await this.addressService.rebuild(address);
    }
    @Query(() => Address)
    async fetchById (@Args('address_id') address_id: number): Promise<Address> {
        return await this.addressService.fetchById(address_id);
    }

}
