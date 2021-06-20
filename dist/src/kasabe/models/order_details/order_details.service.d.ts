import { OrderDetailsRepository } from './order_details.repository';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetails } from './order_details.entity';
export declare class OrderDetailsService {
    private orderDetailsRepository;
    constructor(orderDetailsRepository: OrderDetailsRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    buildDetails(orderDetails: CreateOrderDetailsInput): Promise<OrderDetails>;
    rebuildDetails(orderDetails: UpdateOrderDetailsInput): Promise<OrderDetails>;
    getOrderDetailsById(rId: number): Promise<OrderDetails>;
}
