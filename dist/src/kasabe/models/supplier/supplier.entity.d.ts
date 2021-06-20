import { BaseEntity } from 'typeorm';
import { Person } from '../person/person.entity';
import { CreateSupplierInput } from './dto/create_supplier.input';
export declare class Supplier extends BaseEntity {
    supplier_id: number;
    person: Person;
    person_id: number;
    supplier_name: string;
    contact_name: string;
    contact_title: string;
    url: string;
    logo: string;
    note: string;
    our_id: string;
    static of(rSupplier: CreateSupplierInput): Supplier;
    checkDataValidation(): Promise<void>;
}
