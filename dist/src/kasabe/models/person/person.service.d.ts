import { CreatePersonInput } from './dto/create_person.input';
import { UpdatePersonInput } from './dto/update_person.input';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';
export declare class PersonService {
    private personRepository;
    constructor(personRepository: PersonRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(person: CreatePersonInput): Promise<Person>;
    rebuild(person: UpdatePersonInput): Promise<Person>;
    fetchById(rId: number): Promise<Person>;
}
