import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create_address.input';
import { UpdateAddressInput } from './dto/update_address.input';
import { Address } from './address.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class AddressResolver {
    private addressService;
    constructor(addressService: AddressService);
    addressTestQuery(message: string): Promise<MessageType>;
    addressTestMutation(message: string): Promise<MessageType>;
    build(address: CreateAddressInput): Promise<Address>;
    rebuild(address: UpdateAddressInput): Promise<Address>;
    fetchById(address_id: number): Promise<Address>;
}
