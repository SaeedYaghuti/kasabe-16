import { OrderService } from './order.service';
import { CreateOrderInput } from './dto/create_order.input';
import { UpdateOrderInput } from './dto/update_order.input';
import { Order } from './order.entity';
import { MessageType } from '../../../util/type/message.type';
export declare class OrderResolver {
    private orderService;
    constructor(orderService: OrderService);
    orderTestQuery(message: string): Promise<MessageType>;
    orderTestMutation(message: string): Promise<MessageType>;
    build(order: CreateOrderInput): Promise<Order>;
    fetchById(rId: number): Promise<Order>;
    rebuild(order: UpdateOrderInput): Promise<Order>;
}
