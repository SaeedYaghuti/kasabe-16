import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { PersonRole } from '../person/person_role.enum';
import { CreateCustomerInput } from './dto/create_customer.input';
import { Customer } from './customer.entity';
import { Person } from '../person/person.entity';
import { UpdateCustomerInput } from './dto/update_customer.input';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
    private logger = new Logger('CustomerRepository');

  // Customer
  async build( rCustomer: CreateCustomerInput ): Promise<Customer> {
    console.log('PersonRepository: Customer => rData: ', rCustomer);

    // create new Person
    const nPerson = new Person();
    nPerson.person_role = PersonRole.CUSTOMER;
    nPerson.person_name = rCustomer.customer_name;
    let gPerson;

    try {
        gPerson = await nPerson.save();
        console.log('gPerson: ', gPerson);
    } catch (error) {
        this.logger.error(
            `!> Failed to save person: ${JSON.stringify(nPerson)} ;`,
            error.stack,
        );
        throw new InternalServerErrorException({
            message: '!> Failed to save person',
            origin: '@customer.repository.ts',
            person: nPerson,
        });
    }

    const nCustomer = new Customer();
    nCustomer.person = gPerson;
    nCustomer.customer_name = rCustomer.customer_name;
    nCustomer.password = rCustomer.password;
    
    try {
      const gCustomer = await nCustomer.save();
      console.log('gCustomer: ', gCustomer);
      return gCustomer;
    } catch (error) {
      this.logger.error(
        `!> Failed to save customer: ${JSON.stringify(rCustomer)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to save customer',
        origin: '@customer.repository.ts',
        customer: rCustomer,
      });
    }
  }


  // Get_Customer
  async fetchById( rId: number ): Promise<Customer> {
    console.log('CustomerRepository rId: ', rId);

    const fCustomer = await Customer.findOne({ 
      where: { customer_id: rId },
      // relations: ["person", "order"],
      relations: ["person"],
    });
    return fCustomer;

    // try {
    
    //   // fetch Customer  
    //   const fCustomer = await Customer.findOne(rId);
    //   console.log('fCustomer: ', fCustomer);
      
    //   try {
    //     // fetch Person
    //     const fPerson = await Person.findOne(fCustomer.person_id);
    //     fCustomer.person = fPerson;
    // } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch person related to customer! person_id: ${fCustomer.person_id} ;`,
    //        error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //       message: '!> Failed to fetch person related to customer',
    //       origin: '@customer.repository.ts',
    //       person_id: fCustomer.person_id,
    //     });
    //   }
    //   return fCustomer;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch customer by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch customer',
    //     origin: '@customer.repository.ts',
    //     customer_id: rId,
    //   });
    // }


  }
  
  
  // Customer
  async rebuild( rCustomer: UpdateCustomerInput ): Promise<Customer> {
    
    // console.log('CustomerRepository: Customer => rData: ', rCustomer);

    const fCustomer = await Customer.findOneOrFail(rCustomer.customer_id)

    const tuCustomer = Object.assign(fCustomer, rCustomer);

    // console.log('<<uS>> tuCustomer:', tuCustomer);

    await Customer.save(tuCustomer);

    const customer = this.fetchById(rCustomer.customer_id)

    return customer;
    
    // console.log('PersonRepository: Customer => rData: ', rCustomer);

    // const nCustomer = new Customer();
    // nCustomer.customer_id = rCustomer.customer_id;
    // nCustomer.customer_name = rCustomer.customer_name;
    // nCustomer.password = rCustomer.password;
    
    // try {
    //   await nCustomer.save();
    //   const fCustomer = await Customer.findOne(rCustomer.customer_id);
    //   console.log('fCustomer: ', fCustomer);
    //   return fCustomer;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update customer: ${JSON.stringify(rCustomer)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update customer',
    //     origin: '@customer.repository.ts',
    //     customer: rCustomer,
    //   });
    // }

  }


}

// export class CustomerRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
