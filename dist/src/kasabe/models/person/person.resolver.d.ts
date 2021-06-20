import { PersonService } from './person.service';
import { CreatePersonInput } from './dto/create_person.input';
import { UpdatePersonInput } from './dto/update_person.input';
import { Person } from './person.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class PersonResolver {
    private personService;
    constructor(personService: PersonService);
    personTestQuery(message: string): Promise<MessageType>;
    personTestMutation(message: string): Promise<MessageType>;
    build(person: CreatePersonInput): Promise<Person>;
    rebuild(person: UpdatePersonInput): Promise<Person>;
    fetchById(rId: number): Promise<Person>;
}
