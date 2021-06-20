import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonInput } from './dto/create_person.input';
import { UpdatePersonInput } from './dto/update_person.input';
import { Person } from './person.entity';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
    constructor(
        // Person
        @InjectRepository(PersonRepository)
        private personRepository: PersonRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Person
    async build(person: CreatePersonInput): Promise<Person> {
        console.log('service build() is running');
        const gPerson = await this.personRepository.build(person);
        console.log('service build() db resutlt person:> ');
        console.log(gPerson);
        return gPerson;
    }
    async rebuild(person: UpdatePersonInput): Promise<Person> {
        console.log('service rebuild() is running');
        const gPerson = await this.personRepository.rebuild(person);
        console.log('service rebuild() db resutlt person:> ');
        console.log(gPerson);
        return gPerson;
    }
    async fetchById ( rId: number ): Promise<Person> {
        console.log('service fetchById() is running');
        const fPerson = await this.personRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fPerson:> ');
        console.log(fPerson);
        return fPerson;
    }
    //#endregion
 
}
