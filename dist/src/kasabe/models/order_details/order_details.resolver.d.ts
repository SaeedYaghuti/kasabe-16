import { OrderDetailsService } from './order_details.service';
import { MessageType } from '../../../util/type/message.type';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetails } from './order_details.entity';
export declare class OrderDetailsResolver {
    private orderDetailsService;
    constructor(orderDetailsService: OrderDetailsService);
    orderDetailsTestQuery(message: string): Promise<MessageType>;
    orderDetailsTestMutation(message: string): Promise<MessageType>;
    buildDetails(orderDetails: CreateOrderDetailsInput): Promise<OrderDetails>;
    rebuildDetails(orderDetails: UpdateOrderDetailsInput): Promise<OrderDetails>;
    getOrderDetailsById(rId: number): Promise<OrderDetails>;
}
