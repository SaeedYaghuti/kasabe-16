import { Repository } from 'typeorm';
import { CreateSupplierInput } from './dto/create_supplier.input';
import { Supplier } from './supplier.entity';
import { UpdateSupplierInput } from './dto/update_supplier.input';
export declare class SupplierRepository extends Repository<Supplier> {
    private logger;
    build(rSupplier: CreateSupplierInput): Promise<Supplier>;
    rebuild(rSupplier: UpdateSupplierInput): Promise<Supplier>;
    fetchById(rId: number): Promise<Supplier>;
}
