import { SupplierService } from './supplier.service';
import { CreateSupplierInput } from './dto/create_supplier.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { Supplier } from './supplier.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class SupplierResolver {
    private supplierService;
    constructor(supplierService: SupplierService);
    supplierTestQuery(message: string): Promise<MessageType>;
    supplierTestMutation(message: string): Promise<MessageType>;
    build(supplier: CreateSupplierInput): Promise<Supplier>;
    rebuild(supplier: UpdateSupplierInput): Promise<Supplier>;
    fetchById(supplier_id: number): Promise<Supplier>;
}
