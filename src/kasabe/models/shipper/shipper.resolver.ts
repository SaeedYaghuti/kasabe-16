import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSubEngine  } from 'graphql-subscriptions';
import { Inject, BadRequestException } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { CreateShipperInput } from './dto/create_shipper.input';
import { UpdateShipperInput } from './dto/update_shipper.input';
import { Shipper } from './shipper.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Shipper')
export class ShipperResolver {
    // Constructor
    constructor(
        private shipperService: ShipperService,
    ) {}
    
    //#region  Test

    @Query(type => MessageType)
    async shipperTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('shipperTestQuery is running...');
        return await this.shipperService.testQuery(message);
    }
    
    @Mutation(type => MessageType)
    async shipperTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.shipperService.testQuery(message);
    }
    
    //#endregion

    // Shipper
    @Mutation(type => Shipper)
    async build( @Args('shipper') shipper: CreateShipperInput ): Promise<Shipper> {
        console.log('mutation build() is running...');
        return await this.shipperService.build(shipper);
    }
    @Mutation(type => Shipper)
    async rebuild( @Args('shipper') shipper: UpdateShipperInput ): Promise<Shipper> {
        console.log('mutation rebuild() is running...');
        return await this.shipperService.rebuild(shipper);
    }
    @Query(type => Shipper)
    async fetchById (@Args('shipper_id') shipper_id: number): Promise<Shipper> {
        
        const shipper = await this.shipperService.fetchById(shipper_id);
    
        if (!shipper) throw new BadRequestException(`There is no shipper with id ${shipper_id}`);

        return shipper;
    }

}
