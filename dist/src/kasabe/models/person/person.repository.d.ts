import { Repository } from 'typeorm';
import { CreatePersonInput } from './dto/create_person.input';
import { Person } from './person.entity';
import { UpdatePersonInput } from './dto/update_person.input';
export declare class PersonRepository extends Repository<Person> {
    private logger;
    build(rPerson: CreatePersonInput): Promise<Person>;
    rebuild(rPerson: UpdatePersonInput): Promise<Person>;
    fetchById(rId: number): Promise<Person>;
}
