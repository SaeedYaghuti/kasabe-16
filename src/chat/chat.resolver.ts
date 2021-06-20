// import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
// import { PubSubEngine  } from 'graphql-subscriptions';
// import { Inject } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { Client } from './models/client/client.entity';
// // import { MessageType } from 'src/ecommerce/dto/message.type';
// import { MessageType } from '../ecommerce/dto/message.type';
// import { ClientCreateInput } from './models/client/dto/client_create.input';

// const PONG_EVENT_NAME = 'pong';

// TODO: un_comment
// @Resolver('Chat')
export class ChatResolver {
    // Constructor
    constructor(
        // private chatService: ChatService,

        // @Inject('PUB_SUB') 
        // private pubSub: PubSubEngine,
    ) {}
    
    //#region  Test
    // @Query(() => MessageType)
    // async testQuery(@Args('message') message: string): Promise<{ message: string}> {
    //     return await this.chatService.testQuery(message);
    // }
    // @Mutation(() => MessageType)
    // async testMutation(@Args('message') message: string): Promise<{ message: string}> {
    //     this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
    //     return await {
    //         message: message
    //     };
    // }
    //#endregion

    //#region  Ping Pong
    // @Mutation('ping')
    // async ping() {
    //     const pingId = Date.now();
    //     this.pubSub.publish(PONG_EVENT_NAME, { [PONG_EVENT_NAME]: { pingId } });
    //     return { id: pingId };
    // }

    // @Subscription(PONG_EVENT_NAME)
    // pong() {
    //     return this.pubSub.asyncIterator(PONG_EVENT_NAME);
    // }
    //#endregion

    //#region  Client
    //  @Mutation(() => Client)
    //  async clientCreate( @Args('client') client: ClientCreateInput ): Promise<Client> {
    //      console.log('mutation clientCreate() is running...');
    //      const gClient = await this.chatService.clientCreate(client);
    //     //  this.pubSub.publish('clientCreated', { clientCreated: gClient });
    //      return gClient;
    //  }
    //  @Mutation()
    //  async clientUpdate( @Args('client') client: ClientUpdateDto ): Promise<Client> {
    //      console.log('mutation clientUpdate() is running...');
    //      return await this.chatService.clientUpdate(client);
    //  }
    //  @Query()
    //  async clientGetById (@Args('client_id') rId: number): Promise<Client> {
    //      return await this.chatService.clientGetById(rId);
    //  }
    //  @Subscription('clientCreated')
    //  clientCreated() {
    //      console.log('clientCreated Subscription');
    //      return this.pubSub.asyncIterator('clientCreated');
    //  }
     //#endregion

}
