import { BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Order } from '../order/order.entity';
export declare class Customer extends BaseEntity {
    customer_id: number;
    person: Person;
    person_id: number;
    customer_name: string;
    password: string;
    order: Order[];
}
