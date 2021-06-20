import { UpdateOrderDetailsInput } from '../../order_details/dto/update_order_details.input';
import { OrderStatus } from '../order_status.enum';
export declare class UpdateOrderInput {
    order_id: number;
    shipper_id: number;
    required_date: Date;
    ship_date: Date;
    freight: number;
    status: OrderStatus;
    order_details: UpdateOrderDetailsInput[];
}
