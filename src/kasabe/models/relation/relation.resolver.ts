import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RelationService } from './relation.service';
import { BuildRelationInput } from './dto/create_relation.input';
import { UpdateRelationInput } from './dto/update_relation.input';
import { Relation } from './relation.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Relation')
export class RelationResolver {
    // Constructor
    constructor(
        private relationService: RelationService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async relationTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('relationTestQuery is running...');
        return await this.relationService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async relationTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.relationService.testQuery(message);
    }
    
    //#endregion

    // Relation
    @Mutation(() => Relation)
    async build( @Args('relation') relation: BuildRelationInput ): Promise<Relation> {
        console.log('mutation build() is running...');
        return await this.relationService.build(relation);
    }
    @Mutation(() => Relation)
    async rebuild( @Args('relation') relation: UpdateRelationInput ): Promise<Relation> {
        console.log('mutation rebuild() is running...');
        return await this.relationService.rebuild(relation);
    }
    @Query(() => Relation)
    async fetchById (@Args('relation_id') rId: number): Promise<Relation> {
        return await this.relationService.fetchById(rId);
    }

}
