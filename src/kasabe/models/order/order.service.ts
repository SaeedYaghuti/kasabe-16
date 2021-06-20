import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderInput } from './dto/create_order.input';
import { UpdateOrderInput } from './dto/update_order.input';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(
        // Order
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  Order
    async build(order: CreateOrderInput): Promise<Order> {
        console.log('service build() is running');
        const gOrder = await this.orderRepository.build(order);
        console.log('service build() db resutlt order:> ');
        console.log(gOrder);
        return gOrder;
    }
    async rebuild(order: UpdateOrderInput): Promise<Order> {
        console.log('service rebuild() is running');
        const gOrder = await this.orderRepository.rebuild(order);
        console.log('service rebuild() db resutlt order:> ');
        console.log(gOrder);
        return gOrder;
    }
    async fetchById ( rId: number ): Promise<Order> {
        console.log('service fetchById() is running');
        const fOrder = await this.orderRepository.fetchById(rId);
        console.log('service fetchById() db resutlt fOrder:> ');
        console.log(fOrder);
        return fOrder;
    }
    //#endregion
 
}
