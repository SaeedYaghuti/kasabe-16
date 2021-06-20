import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailsRepository } from './order_details.repository';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetails } from './order_details.entity';

@Injectable()
export class OrderDetailsService {
    constructor(
        // OrderDetails
        @InjectRepository(OrderDetailsRepository)
        private orderDetailsRepository: OrderDetailsRepository,
    ) {}

    async testQuery(message: string) {
        return await { message }
    }

    //#region  OrderDetails
    async buildDetails(orderDetails: CreateOrderDetailsInput): Promise<OrderDetails> {
        console.log('service buildDetails() is running');
        const gOrderDetails = await this.orderDetailsRepository.buildDetails(orderDetails);
        console.log('service buildDetails() db resutlt orderDetails:> ');
        console.log(gOrderDetails);
        return gOrderDetails;
    }
    async rebuildDetails(orderDetails: UpdateOrderDetailsInput): Promise<OrderDetails> {
        console.log('service rebuildDetails() is running');
        const gOrderDetails = await this.orderDetailsRepository.rebuildDetails(orderDetails);
        console.log('service rebuildDetails() db resutlt orderDetails:> ');
        console.log(gOrderDetails);
        return gOrderDetails;
    }
    async getOrderDetailsById ( rId: number ): Promise<OrderDetails> {
        console.log('service getOrderDetailsById() is running');
        const fOrderDetails = await this.orderDetailsRepository.getOrderDetailsById(rId);
        console.log('service getOrderDetailsById() db resutlt fOrderDetails:> ');
        console.log(fOrderDetails);
        return fOrderDetails;
    }
    //#endregion
 
}
