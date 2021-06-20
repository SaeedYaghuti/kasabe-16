import { SupplierRepository } from './supplier.repository';
import { CreateSupplierInput } from './dto/create_supplier.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { Supplier } from './supplier.entity';
export declare class SupplierService {
    private supplierRepository;
    constructor(supplierRepository: SupplierRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(supplier: CreateSupplierInput): Promise<Supplier>;
    rebuild(supplier: UpdateSupplierInput): Promise<Supplier>;
    fetchById(rId: number): Promise<Supplier>;
}
