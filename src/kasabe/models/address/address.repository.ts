import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateAddressInput } from './dto/create_address.input';
import { Address } from './address.entity';
import { Person } from '../person/person.entity';
import { UpdateAddressInput } from './dto/update_address.input';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
  private logger = new Logger('AddressRepository');
  
  // Address
  async build( rAddress: CreateAddressInput ): Promise<Address> {
    
    console.log('AddressRepository: Address => rData: ', rAddress);

    const fPerson = await Person.findOneOrFail(rAddress.person_id);
    
    const nAddress = new Address();

    Object.assign(nAddress, rAddress);

    nAddress.person = fPerson;

    const gAddress = await Address.save(nAddress);

    return gAddress; // includs Person

    // // wether we have such a person with person_id
    // try {
    //     const fPerson = await Person.findOne(rAddress.person_id);
    //     console.log('fPerson: ', fPerson);

    //     nAddress.person = fPerson;

    // } catch (error) {
    //     this.logger.error(
    //         `!> Failed to fetch person by id: ${JSON.stringify(rAddress.person_id)} ;`,
    //         error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //         message: '!> Failed to fetch person',
    //         origin: '@address.repository.ts',
    //         person_id: rAddress.person_id,
    //     });
    // }

    // nAddress.address_title = rAddress.address_title;
    // nAddress.address_line1 = rAddress.address_line1;
    // nAddress.address_line2 = rAddress.address_line2;
    // nAddress.location = rAddress.location;
    // nAddress.postal_code = rAddress.postal_code;
    // nAddress.city = rAddress.city;
    // nAddress.state = rAddress.state;
    // nAddress.country = rAddress.country;
    // nAddress.email = rAddress.email;
    // nAddress.phone = rAddress.phone;
    // nAddress.fax = rAddress.fax;
    
    // // save Address
    // try {
    //   const gAddress = await nAddress.save();
    //   console.log('gAddress: ', gAddress);
    //   return gAddress;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to save address: ${JSON.stringify(rAddress)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to save address',
    //     origin: '@address.repository.ts',
    //     address: rAddress,
    //     error: error.stack,
    //   });
    // }

  }
  
  // Get
  async fetchById( rId: number ): Promise<Address> {
    // console.log('AddressRepository rId: ', rId);

    const fAddress = await Address.findOne({ 
      relations: ["person"],
      where: { address_id: rId },
    });
    return fAddress;

    // try {
    //   const fAddress = await Address.findOne(rId);
    //   console.log('fAddress: ', fAddress);

    //   return fAddress;

    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch address by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch address',
    //     origin: '@address.repository.ts',
    //     address_id: rId,
    //   });
    // }


  } // Address End

  // Update
  async rebuild( rAddress: UpdateAddressInput ): Promise<Address> {
    
    // console.log('AddressRepository: Address => rData: ', rAddress);

    const fAddress = await Address.findOneOrFail(rAddress.address_id)

    const tuAddress = Object.assign(fAddress, rAddress);

    // console.log('<<uS>> tuAddress:', tuAddress);

    await Address.save(tuAddress);

    const address = this.fetchById(rAddress.address_id)

    return address;
    
    // nAddress.address_id = rAddress.address_id;
    // nAddress.address_title = rAddress.address_title;
    // nAddress.address_line1 = rAddress.address_line1;
    // nAddress.address_line2 = rAddress.address_line2;
    // nAddress.location = rAddress.location;
    // nAddress.postal_code = rAddress.postal_code;
    // nAddress.city = rAddress.city;
    // nAddress.state = rAddress.state;
    // nAddress.country = rAddress.country;
    // nAddress.email = rAddress.email;
    // nAddress.phone = rAddress.phone;
    // nAddress.fax = rAddress.fax;

    // update Address
    // try {
    //   await nAddress.save();

    //   const fAddress = await Address.findOne(rAddress.address_id);
    //   console.log('fAddress by Id after save: ', fAddress);
    //   return fAddress;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update address: ${JSON.stringify(rAddress)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update address',
    //     origin: '@address.repository.ts',
    //     address: rAddress,
    //     error: error.stack,
    //   });
    // }

  }

}

// export class AddressRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
