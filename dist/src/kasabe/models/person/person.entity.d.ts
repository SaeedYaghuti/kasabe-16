import { BaseEntity } from 'typeorm';
import { PersonRole } from './person_role.enum';
import { CreatePersonInput } from './dto/create_person.input';
export declare class Person extends BaseEntity {
    person_id: number;
    person_role: PersonRole;
    person_name: string;
    static of(rPerson: CreatePersonInput): Person;
    checkDataValidation(): Promise<void>;
}
