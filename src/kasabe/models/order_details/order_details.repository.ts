import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { Product } from '../product/product.entity';
import { OrderDetails } from './order_details.entity';
import { CreateOrderDetailsInput } from './dto/create_order_details.input';
import { UpdateOrderDetailsInput } from './dto/update_order_details.input';
import { OrderDetailsResolver } from './order_details.resolver';

@EntityRepository(OrderDetails)
export class OrderDetailsRepository extends Repository<OrderDetails> {
  private logger = new Logger('OrderDetailsRepository');

  // OrderDetails
  async buildDetails( rOrderDetails: CreateOrderDetailsInput ): Promise<OrderDetails> {
    console.log('OrderDetailsRepository rData: ', rOrderDetails);

    const nOrderDetails = OrderDetails.of(rOrderDetails);

    const gOrderDetails = OrderDetails.save(nOrderDetails);

    return gOrderDetails;

  } // CreateOrderDetails End

  // Get
  async getOrderDetailsById( rId: number ): Promise<OrderDetails> {
    console.log('OrderDetailsRepository rId: ', rId);

    const fOrderDetails = await OrderDetails.findOne({
      where: { order_details_id: rId },
      // relations: ["person", "order"],
      relations: ["order", "product", "shipper"],
    });

    return fOrderDetails;

  }
  
  
  // OrderDetails
  async rebuildDetails( rOrderDetails: UpdateOrderDetailsInput ): Promise<OrderDetails> {
    console.log('OrderDetailsRepository rData: ', rOrderDetails);

    const fOrderDetails = await OrderDetails.findOneOrFail({ order_details_id: rOrderDetails.order_details_id});

    Object.assign(fOrderDetails, rOrderDetails);

    const uOrderDetails = await OrderDetails.save(fOrderDetails);

    return await this.getOrderDetailsById(uOrderDetails.order_details_id);

  } // Update OrderDetails End
 
}  