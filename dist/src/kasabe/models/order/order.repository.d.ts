import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create_order.input';
import { UpdateOrderInput } from './dto/update_order.input';
export declare class OrderRepository extends Repository<Order> {
    private logger;
    build(rOrder: CreateOrderInput): Promise<Order>;
    build0(rOrder: CreateOrderInput): Promise<Order>;
    rebuild(rOrder: UpdateOrderInput): Promise<Order>;
    rebuild0(rOrder: UpdateOrderInput): Promise<Order>;
    fetchById(rId: number): Promise<Order>;
    fetchById0(rId: number): Promise<Order>;
}
