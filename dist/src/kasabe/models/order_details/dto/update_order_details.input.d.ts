import { OrderStatus } from '../../order/order_status.enum';
export declare class UpdateOrderDetailsInput {
    order_details_id?: number;
    quantity?: number;
    shipper_id?: number;
    required_date?: Date;
    ship_date?: Date;
    freight?: number;
    status?: OrderStatus;
}
