import { CreateOrderInput } from './dto/create_order.input';
import { UpdateOrderInput } from './dto/update_order.input';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: OrderRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(order: CreateOrderInput): Promise<Order>;
    rebuild(order: UpdateOrderInput): Promise<Order>;
    fetchById(rId: number): Promise<Order>;
}
