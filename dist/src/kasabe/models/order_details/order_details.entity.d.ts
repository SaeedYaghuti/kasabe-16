import { BaseEntity } from 'typeorm';
import { Shipper } from '../shipper/shipper.entity';
import { OrderStatus } from '../order/order_status.enum';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
export declare class OrderDetails extends BaseEntity {
    order_details_id: number;
    order: Order;
    order_id: number;
    product: Product;
    product_id: number;
    msrp: number;
    discount: number;
    quantity: number;
    price: number;
    shipper: Shipper;
    shipper_id: number;
    required_date: Date;
    ship_date: Date;
    freight: number;
    status: OrderStatus;
    static of(rOrderDetails: CreateOrderDetailsInput): OrderDetails;
    checkDataValidation(): Promise<void>;
}
