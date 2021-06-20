import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerInput } from './dto/create_customer.input';
import { UpdateCustomerInput } from './dto/update_customer.input';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
    constructor(
        // Customer
        @InjectRepository(CustomerRepository)
        private customerRepository: CustomerRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Customer
    async build(customer: CreateCustomerInput): Promise<Customer> {
        console.log('service build() is running');
        const gCustomer = await this.customerRepository.build(customer);
        console.log('service build() db resutlt customer:> ');
        console.log(gCustomer);
        return gCustomer;
    }
    async rebuild(customer: UpdateCustomerInput): Promise<Customer> {
        console.log('service rebuild() is running');
        const gCustomer = await this.customerRepository.rebuild(customer);
        console.log('service rebuild() db resutlt customer:> ');
        console.log(gCustomer);
        return gCustomer;
    }
    async fetchById ( rId: number ): Promise<Customer> {
        console.log('service fetchById() is running');
        const fCustomer = await this.customerRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fCustomer:> ');
        console.log(fCustomer);
        return fCustomer;
    }
    //#endregion
 
}
