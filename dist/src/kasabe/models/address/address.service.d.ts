import { CreateAddressInput } from './dto/create_address.input';
import { UpdateAddressInput } from './dto/update_address.input';
import { Address } from './address.entity';
import { AddressRepository } from './address.repository';
export declare class AddressService {
    private addressRepository;
    constructor(addressRepository: AddressRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(address: CreateAddressInput): Promise<Address>;
    rebuild(address: UpdateAddressInput): Promise<Address>;
    fetchById(rId: number): Promise<Address>;
}
