import { ShipperService } from './shipper.service';
import { CreateShipperInput } from './dto/create_shipper.input';
import { UpdateShipperInput } from './dto/update_shipper.input';
import { Shipper } from './shipper.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class ShipperResolver {
    private shipperService;
    constructor(shipperService: ShipperService);
    shipperTestQuery(message: string): Promise<MessageType>;
    shipperTestMutation(message: string): Promise<MessageType>;
    build(shipper: CreateShipperInput): Promise<Shipper>;
    rebuild(shipper: UpdateShipperInput): Promise<Shipper>;
    fetchById(shipper_id: number): Promise<Shipper>;
}
