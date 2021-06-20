import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierRepository } from './supplier.repository';
import { CreateSupplierInput } from './dto/create_supplier.input';
import { UpdateSupplierInput } from './dto/update_supplier.input';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
    constructor(
        // Supplier
        @InjectRepository(SupplierRepository)
        private supplierRepository: SupplierRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Supplier
    async build(supplier: CreateSupplierInput): Promise<Supplier> {
        console.log('service build() is running');
        const gSupplier = await this.supplierRepository.build(supplier);
        console.log('service build() db resutlt supplier:> ');
        console.log(gSupplier);
        return gSupplier;
    }
    async rebuild(supplier: UpdateSupplierInput): Promise<Supplier> {
        console.log('service rebuild() is running');
        const gSupplier = await this.supplierRepository.rebuild(supplier);
        console.log('service rebuild() db resutlt supplier:> ');
        console.log(gSupplier);
        return gSupplier;
    }
    async fetchById ( rId: number ): Promise<Supplier> {
        // console.log('service fetchById() is running');
        const fSupplier = await this.supplierRepository.fetchById(rId);
        // console.log('service fetchById() db resutlt fSupplier:> ');
        console.log(fSupplier);
        return fSupplier;
    }
    //#endregion
 
}
