import { BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { Order } from '../order/order.entity';
export declare class Shipper extends BaseEntity {
    shipper_id: number;
    person: Person;
    person_id: number;
    shipper_name: string;
    contact_name: string;
    contact_title: string;
    url: string;
    logo: string;
    note: string;
    our_id: string;
    order: Order[];
}
