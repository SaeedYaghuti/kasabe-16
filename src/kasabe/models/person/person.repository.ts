import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreatePersonInput } from './dto/create_person.input';
import { Person } from './person.entity';
import { UpdatePersonInput } from './dto/update_person.input';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  private logger = new Logger('PersonRepository');

  // Person
  async build( rPerson: CreatePersonInput ): Promise<Person> {
    console.log('PersonRepository rData: ', rPerson);

    const person_role = rPerson.person_role;
    const person_name = rPerson.person_name;

    const nPerson = new Person();
    nPerson.person_role = person_role;
    nPerson.person_name = person_name;
    
    try {
      const gPerson = await nPerson.save();
      console.log('gPerson: ', gPerson);
      return gPerson;
    } catch (error) {
      this.logger.error(
        `!> Failed to save person: ${JSON.stringify(rPerson)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to save person',
        origin: '@person.repository.ts',
        person: rPerson,
      });
    }
  }
  
  async rebuild( rPerson: UpdatePersonInput ): Promise<Person> {
    console.log('PersonRepository rData: ', rPerson);

    const nPerson = new Person();
    nPerson.person_id = rPerson.person_id;
    nPerson.person_role = rPerson.person_role;
    nPerson.person_name = rPerson.person_name;
    
    try {
      await nPerson.save();
      const fPerson = await Person.findOne(rPerson.person_id);
      console.log('fPerson: ', fPerson);
      return fPerson;
    } catch (error) {
      this.logger.error(
        `!> Failed to update person: ${JSON.stringify(rPerson)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update person',
        origin: '@person.repository.ts',
        person: rPerson,
      });
    }
  }
  
  // Get
  async fetchById( rId: number ): Promise<Person> {
    console.log('PersonRepository rId: ', rId);

    try {
      const fPerson = await Person.findOne(rId);
      console.log('fPerson: ', fPerson);
      // const fcTree = await this.manager.getTreeRepository(Person).findTrees();
      // console.log('fcTree: ', fcTree);
      return fPerson;
    } catch (error) {
      this.logger.error(
        `!> Failed to fetch person by id: ${JSON.stringify(rId)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to fetch person',
        origin: '@person.repository.ts',
        person_id: rId,
      });
    }
  }


}

// export class PersonRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
