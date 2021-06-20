import { ShipperRepository } from './shipper.repository';
import { CreateShipperInput } from './dto/create_shipper.input';
import { UpdateShipperInput } from './dto/update_shipper.input';
import { Shipper } from './shipper.entity';
export declare class ShipperService {
    private shipperRepository;
    constructor(shipperRepository: ShipperRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(shipper: CreateShipperInput): Promise<Shipper>;
    rebuild(shipper: UpdateShipperInput): Promise<Shipper>;
    fetchById(rId: number): Promise<Shipper>;
}
