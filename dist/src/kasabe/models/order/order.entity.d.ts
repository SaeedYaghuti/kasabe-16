import { BaseEntity } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Shipper } from '../shipper/shipper.entity';
import { OrderStatus } from './order_status.enum';
import { OrderDetails } from '../order_details/order_details.entity';
import { CreateOrderInput } from './dto/create_order.input';
export declare class Order extends BaseEntity {
    order_id: number;
    order_number: string;
    customer: Customer;
    customer_id: number;
    shipper: Shipper;
    shipper_id: number;
    order_date: Date;
    required_date: Date;
    ship_date: Date;
    freight: number;
    status: OrderStatus;
    order_details: OrderDetails[];
    static of(rOrder: CreateOrderInput): Order;
    checkDataValidation(): Promise<void>;
}
