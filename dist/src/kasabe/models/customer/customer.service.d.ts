import { CreateCustomerInput } from './dto/create_customer.input';
import { UpdateCustomerInput } from './dto/update_customer.input';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
export declare class CustomerService {
    private customerRepository;
    constructor(customerRepository: CustomerRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(customer: CreateCustomerInput): Promise<Customer>;
    rebuild(customer: UpdateCustomerInput): Promise<Customer>;
    fetchById(rId: number): Promise<Customer>;
}
