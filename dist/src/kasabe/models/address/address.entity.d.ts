import { BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
export declare class Address extends BaseEntity {
    address_id: number;
    person: Person;
    person_id: number;
    address_title: string;
    address_line1: string;
    address_line2: string;
    location: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
    email: string;
    phone: string;
    fax: string;
}
