import { Repository } from 'typeorm';
import { OrderDetails } from './order_details.entity';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
export declare class OrderDetailsRepository extends Repository<OrderDetails> {
    private logger;
    buildDetails(rOrderDetails: CreateOrderDetailsInput): Promise<OrderDetails>;
    getOrderDetailsById(rId: number): Promise<OrderDetails>;
    rebuildDetails(rOrderDetails: UpdateOrderDetailsInput): Promise<OrderDetails>;
}
