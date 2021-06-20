import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create_customer.input';
import { UpdateCustomerInput } from './dto/update_customer.input';
import { Customer } from './customer.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class CustomerResolver {
    private customerService;
    constructor(customerService: CustomerService);
    customerTestQuery(message: string): Promise<MessageType>;
    customerTestMutation(message: string): Promise<MessageType>;
    build(customer: CreateCustomerInput): Promise<Customer>;
    fetchById(rId: number): Promise<Customer>;
    rebuild(customer: UpdateCustomerInput): Promise<Customer>;
}
