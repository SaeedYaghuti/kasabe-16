import { Repository } from 'typeorm';
import { CreateAddressInput } from './dto/create_address.input';
import { Address } from './address.entity';
import { UpdateAddressInput } from './dto/update_address.input';
export declare class AddressRepository extends Repository<Address> {
    private logger;
    build(rAddress: CreateAddressInput): Promise<Address>;
    fetchById(rId: number): Promise<Address>;
    rebuild(rAddress: UpdateAddressInput): Promise<Address>;
}
