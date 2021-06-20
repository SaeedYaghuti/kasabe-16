import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipperRepository } from './shipper.repository';
import { CreateShipperInput } from './dto/create_shipper.input';
import { UpdateShipperInput } from './dto/update_shipper.input';
import { Shipper } from './shipper.entity';

@Injectable()
export class ShipperService {
    constructor(
        // Shipper
        @InjectRepository(ShipperRepository)
        private shipperRepository: ShipperRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Shipper
    async build(shipper: CreateShipperInput): Promise<Shipper> {
        console.log('service build() is running');
        const gShipper = await this.shipperRepository.build(shipper);
        console.log('service build() db resutlt shipper:> ');
        console.log(gShipper);
        return gShipper;
    }
    async rebuild(shipper: UpdateShipperInput): Promise<Shipper> {
        console.log('service rebuild() is running');
        const gShipper = await this.shipperRepository.rebuild(shipper);
        console.log('service rebuild() db resutlt shipper:> ');
        console.log(gShipper);
        return gShipper;
    }
    async fetchById ( rId: number ): Promise<Shipper> {
        // console.log('service fetchById() is running');
        const fShipper = await this.shipperRepository.fetchById(rId);
        // console.log('service fetchById() db resutlt fShipper:> ');
        console.log(fShipper);
        return fShipper;
    }
    //#endregion
 
}
