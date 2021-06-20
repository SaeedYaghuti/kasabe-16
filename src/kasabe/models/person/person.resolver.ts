import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { CreatePersonInput } from './dto/create_person.input';
import { UpdatePersonInput } from './dto/update_person.input';
import { Person } from './person.entity';
import { MessageType } from '../../../util/type/message.type';


@Resolver('Person')
export class PersonResolver {
    // Constructor
    constructor(
        private personService: PersonService,
    ) {}
    
    //#region  Test

    @Query(() => MessageType)
    async personTestQuery(@Args('message') message: string): Promise<MessageType> {
        console.log('personTestQuery is running...');
        return await this.personService.testQuery(message);
    }
    
    @Mutation(() => MessageType)
    async personTestMutation(@Args('message') message: string): Promise<MessageType> {
        // this.pubSub.publish('commentAdded', { comment: {id: 1, content: 'It is a message'} });
        return await this.personService.testQuery(message);
    }
    
    //#endregion

    // Person
    @Mutation(() => Person)
    async build( @Args('person') person: CreatePersonInput ): Promise<Person> {
        console.log('mutation build() is running...');
        return await this.personService.build(person);
    }
    @Mutation(() => Person)
    async rebuild( @Args('person') person: UpdatePersonInput ): Promise<Person> {
        console.log('mutation rebuild() is running...');
        return await this.personService.rebuild(person);
    }
    @Query(() => Person)
    async fetchById (@Args('person_id') rId: number): Promise<Person> {
        return await this.personService.fetchById(rId);
    }

}
