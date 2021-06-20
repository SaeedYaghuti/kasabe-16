import { Repository } from 'typeorm';
import { CreateCustomerInput } from './dto/create_customer.input';
import { Customer } from './customer.entity';
import { UpdateCustomerInput } from './dto/update_customer.input';
export declare class CustomerRepository extends Repository<Customer> {
    private logger;
    build(rCustomer: CreateCustomerInput): Promise<Customer>;
    fetchById(rId: number): Promise<Customer>;
    rebuild(rCustomer: UpdateCustomerInput): Promise<Customer>;
}
