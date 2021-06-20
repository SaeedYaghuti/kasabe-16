import { OrderStatus } from '../../order/order_status.enum';
export declare class CreateOrderDetailsInput {
    product_id: number;
    quantity: number;
    shipper_id?: number;
    required_date?: Date;
    ship_date?: Date;
    freight?: number;
    status?: OrderStatus;
}
