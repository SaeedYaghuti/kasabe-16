import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { PersonRole } from '../person/person_role.enum';
import { CreateShipperInput } from './dto/create_shipper.input';
// import { AuthModule } from '../../../auth/auth.module';
import { Shipper } from './shipper.entity';
import { Person } from '../person/person.entity';
import { UpdateShipperInput } from './dto/update_shipper.input';

@EntityRepository(Shipper)
export class ShipperRepository extends Repository<Shipper> {
  private logger = new Logger('ShipperRepository');

  // Shipper
  async build( rShipper: CreateShipperInput ): Promise<Shipper> {
    console.log('ShipperRepository: Shipper => rData: ', rShipper);

    // create new Person
    const nPerson = new Person();
    nPerson.person_role = PersonRole.SHIPPER;
    nPerson.person_name = rShipper.shipper_name;
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
            origin: '@shipper.repository.ts',
            person: nPerson,
            error: error.stack,
        });
    }

    const nShipper = new Shipper();
    nShipper.person = gPerson;
    nShipper.shipper_name = rShipper.shipper_name;
    nShipper.contact_name = rShipper.contact_name;
    nShipper.contact_title = rShipper.contact_title;
    nShipper.url = rShipper.url;
    nShipper.logo = rShipper.logo;
    nShipper.note = rShipper.note;
    nShipper.our_id = rShipper.our_id;
    
    try {
      const gShipper = await nShipper.save();
      console.log('gShipper: ', gShipper);
      return gShipper;
    } catch (error) {
      this.logger.error(
        `!> Failed to save shipper: ${JSON.stringify(rShipper)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to save shipper',
        origin: '@shipper.repository.ts',
        shipper: rShipper,
        error: error.stack,
      });
    }
  }
  
  
  // Shipper
  async rebuild( rShipper: UpdateShipperInput ): Promise<Shipper> {
    
    // console.log('ShipperRepository: Shipper => rData: ', rShipper);

    const fShipper = await Shipper.findOneOrFail(rShipper.shipper_id)

    const tuShipper = Object.assign(fShipper, rShipper);

    // console.log('<<uS>> tuShipper:', tuShipper);

    await Shipper.save(tuShipper);

    const shipper = this.fetchById(rShipper.shipper_id)

    return shipper;
    
    // try {
    //   const uShipper = await Shipper.save(nShipper);
    //   console.log('uShipper: ', uShipper);
    //   return this.fetchById(rShipper.shipper_id);
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update shipper: ${JSON.stringify(rShipper)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update shipper',
    //     origin: '@shipper.repository.ts',
    //     shipper: rShipper,
    //     error: error.stack,
    //   });
    // }

  }

  // Get_Shipper
  async fetchById( rId: number ): Promise<Shipper> {
    // console.log('ShipperRepository rId: ', rId);

    const fShipper = await Shipper.findOne({ 
      relations: ["person"],
      where: { shipper_id: rId },
    });
    return fShipper;

    // try {
    //   // fetch Shipper  
    //   const fShipper = await Shipper.findOne(rId);
    //   console.log('fShipper: ', fShipper);
      
    //   try {
    //     // fetch Person
    //     const fPerson = await Person.findOne(fShipper.person_id);
    //     fShipper.person = fPerson;
    // } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch person related to shipper! person_id: ${fShipper.person_id} ;`,
    //        error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //       message: '!> Failed to fetch person related to shipper',
    //       origin: '@shipper.repository.ts',
    //       person_id: fShipper.person_id,
    //       error: error.stack,
    //     });
    //   }
    //   return fShipper;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch shipper by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch shipper',
    //     origin: '@shipper.repository.ts',
    //     shipper_id: rId,
    //     error: error.stack,
    //   });
    // }


  }

}

// export class ShipperRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
