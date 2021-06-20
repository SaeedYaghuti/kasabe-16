import { Repository } from 'typeorm';
import { CreateShipperInput } from './dto/create_shipper.input';
import { Shipper } from './shipper.entity';
import { UpdateShipperInput } from './dto/update_shipper.input';
export declare class ShipperRepository extends Repository<Shipper> {
    private logger;
    build(rShipper: CreateShipperInput): Promise<Shipper>;
    rebuild(rShipper: UpdateShipperInput): Promise<Shipper>;
    fetchById(rId: number): Promise<Shipper>;
}
