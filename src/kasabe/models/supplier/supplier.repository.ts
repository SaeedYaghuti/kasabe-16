import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { PersonRole } from '../person/person_role.enum';
import { CreateSupplierInput } from './dto/create_supplier.input';
// import { AuthModule } from '../../../auth/auth.module';
import { Supplier } from './supplier.entity';
import { Person } from '../person/person.entity';
import { UpdateSupplierInput } from './dto/update_supplier.input';

@EntityRepository(Supplier)
export class SupplierRepository extends Repository<Supplier> {
  private logger = new Logger('SupplierRepository');

  // Supplier
  async build( rSupplier: CreateSupplierInput ): Promise<Supplier> {
    // console.log('SupplierRepository: Supplier => rData: ', rSupplier);

    // create new Person
    const nPerson = new Person();
    nPerson.person_role = PersonRole.SUPPLIER;
    nPerson.person_name = rSupplier.supplier_name;
    const gPerson = await nPerson.save();

    // try {
    //     gPerson = await nPerson.save();
    //     console.log('gPerson: ', gPerson);
    // } catch (error) {
    //     this.logger.error(
    //         `!> Failed to save person: ${JSON.stringify(nPerson)} ;`,
    //         error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //         message: '!> Failed to save person',
    //         origin: '@supplier.repository.ts',
    //         person: nPerson,
    //         error: error.stack,
    //     });
    // }

    const nSupplier = new Supplier();
    nSupplier.person = gPerson;
    nSupplier.supplier_name = rSupplier.supplier_name;
    nSupplier.contact_name = rSupplier.contact_name;
    nSupplier.contact_title = rSupplier.contact_title;
    nSupplier.url = rSupplier.url;
    nSupplier.logo = rSupplier.logo;
    nSupplier.note = rSupplier.note;
    nSupplier.our_id = rSupplier.our_id;

    const gSupplier = await nSupplier.save();
    return gSupplier;
    
    // try {
    //   const gSupplier = await nSupplier.save();
    //   console.log('gSupplier: ', gSupplier);
    //   return gSupplier;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to save supplier: ${JSON.stringify(rSupplier)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to save supplier',
    //     origin: '@supplier.repository.ts',
    //     supplier: rSupplier,
    //     error: error.stack,
    //   });
    // }


  }
  
  
  // Supplier
  async rebuild( rSupplier: UpdateSupplierInput ): Promise<Supplier> {
    
    // console.log('SupplierRepository: Supplier => rData: ', rSupplier);

    const fSupplier = await Supplier.findOneOrFail(rSupplier.supplier_id)

    const tuSupplier = Object.assign(fSupplier, rSupplier);

    // console.log('<<uS>> tuSupplier:', tuSupplier);

    await Supplier.save(tuSupplier);

    const supplier = this.fetchById(rSupplier.supplier_id)

    return supplier;

    
    // try {
    //   const uSupplier = await Supplier.save(tuSupplier);

    //   console.log('uSupplier: ', uSupplier);
    //   // return Supplier.findOne(rSupplier.supplier_id);
    //   return this.fetchById(rSupplier.supplier_id);
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to update supplier: ${JSON.stringify(rSupplier)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to update supplier',
    //     origin: '@supplier.repository.ts',
    //     supplier: rSupplier,
    //     error: error.stack,
    //   });
    // }
  }

  // Get_Supplier
  async fetchById( rId: number ): Promise<Supplier> {
    // console.log('SupplierRepository rId: ', rId);

    const fSupplier = await Supplier.findOne({ 
      relations: ["person"],
      where: { supplier_id: rId },
    });
    return fSupplier;

    // try {
    //   // fetch Supplier  
    //   const fSupplier = await Supplier.findOne({ 
    //     relations: ["person"],
    //     where: { supplier_id: rId },
    //   });
    //   console.log('fSupplier: ', fSupplier);
      
    //   try {
    //     // fetch Person
    //     const fPerson = await Person.findOne(fSupplier.person_id);
    //     fSupplier.person = fPerson;
    // } catch (error) {
    //     this.logger.error(
    //       `!> Failed to fetch person related to supplier! person_id: ${fSupplier.person_id} ;`,
    //        error.stack,
    //     );
    //     throw new InternalServerErrorException({
    //       message: '!> Failed to fetch person related to supplier',
    //       origin: '@supplier.repository.ts',
    //       person_id: fSupplier.person_id,
    //       error: error.stack,
    //     });
    //   }
    //   return fSupplier;
    // } catch (error) {
    //   this.logger.error(
    //     `!> Failed to fetch supplier by id: ${JSON.stringify(rId)} ;`,
    //      error.stack,
    //   );
    //   throw new InternalServerErrorException({
    //     message: '!> Failed to fetch supplier',
    //     origin: '@supplier.repository.ts',
    //     supplier_id: rId,
    //     error: error.stack,
    //   });
    // }

  }

}

// export class SupplierRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
