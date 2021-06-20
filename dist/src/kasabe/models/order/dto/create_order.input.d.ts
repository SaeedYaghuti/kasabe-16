import { OrderStatus } from '../order_status.enum';
import { CreateOrderDetailsInput } from '../../order_details/dto/create_order_details.input';
export declare class CreateOrderInput {
    order_number: string;
    customer_id: number;
    shipper_id: number;
    order_date: Date;
    required_date: Date;
    ship_date: Date;
    freight: number;
    status: OrderStatus;
    order_details: CreateOrderDetailsInput[];
}
