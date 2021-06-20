import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAddressInput } from './dto/create_address.input';
import { UpdateAddressInput } from './dto/update_address.input';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
    constructor(
        // Address
        @InjectRepository(AddressRepository)
        private addressRepository: AddressRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Address
    async build(address: CreateAddressInput): Promise<Address> {
        console.log('service build() is running');
        const gAddress = await this.addressRepository.build(address);
        console.log('service build() db resutlt address:> ');
        console.log(gAddress);
        return gAddress;
    }
    async rebuild(address: UpdateAddressInput): Promise<Address> {
        console.log('service rebuild() is running');
        const gAddress = await this.addressRepository.rebuild(address);
        console.log('service rebuild() db resutlt address:> ');
        console.log(gAddress);
        return gAddress;
    }
    async fetchById ( rId: number ): Promise<Address> {
        console.log('service fetchById() is running');
        const fAddress = await this.addressRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fAddress:> ');
        console.log(fAddress);
        return fAddress;
    }
    //#endregion
 
}
