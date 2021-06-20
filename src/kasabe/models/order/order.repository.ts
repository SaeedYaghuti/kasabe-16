import { Repository, EntityRepository } from 'typeorm';
import { Query, Logger, InternalServerErrorException } from '@nestjs/common';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create_order.input';
import { OrderDetails } from '../order_details/order_details.entity';
import { Product } from '../product/product.entity';
import { UpdateOrderInput } from './dto/update_order.input';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  
  async build( rOrder: CreateOrderInput ): Promise<Order> {
    
    console.log('OrderRepository rOrder: ', rOrder);

    const orderDetailsEntities: OrderDetails[] = [];

    // convert detailsacionDto to trnasaction Entity
    for (const detailEl of rOrder.order_details) {

      const nOrderDetails = new OrderDetails();
      nOrderDetails.product_id = detailEl.product_id;
      nOrderDetails.quantity = detailEl.quantity;
      nOrderDetails.shipper_id = detailEl.shipper_id;
      nOrderDetails.required_date = new Date(detailEl.required_date);
      nOrderDetails.ship_date = new Date(detailEl.ship_date);
      nOrderDetails.status = detailEl.status;

      const fProduct = await Product.findOneOrFail(detailEl.product_id);
      nOrderDetails.msrp = fProduct.msrp;
      nOrderDetails.discount = fProduct.discount;
      nOrderDetails.price = fProduct.price;

      orderDetailsEntities.push(nOrderDetails);
    } // for End

    const nOrder = Order.of(rOrder);

    Object.assign(nOrder, rOrder);

    nOrder.order_details = orderDetailsEntities;

    const gOrder = await Order.save(nOrder);

    console.log('gOrder: ', gOrder);

    const fOrder = await this.fetchById(gOrder.order_id);

    return fOrder;

  } 
  
  // X Depricated
  async build0( rOrder: CreateOrderInput ): Promise<Order> {
    console.log('OrderRepository rData: ', rOrder);

    const orderDetailsEntities: OrderDetails[] = [];

    // convert detailsacionDto to trnasaction Entity
    for (const detailEl of rOrder.order_details) {
      const nOrderDetails = new OrderDetails();
      nOrderDetails.product_id = detailEl.product_id;

      // fetch product's specific data from db
      try {
        const fProduct = await Product.findOne(detailEl.product_id);
        nOrderDetails.msrp = fProduct.msrp;
        nOrderDetails.discount = fProduct.discount;
        nOrderDetails.price = fProduct.price;
      } catch (error) {
        this.logger.warn(
          `!> Failed to create new OrderDetails when fetch product by id: ${JSON.stringify(detailEl.product_id)};`
        );
      }
      nOrderDetails.quantity = detailEl.quantity;
      nOrderDetails.shipper_id = detailEl.shipper_id;
      nOrderDetails.required_date = new Date(detailEl.required_date);
      nOrderDetails.ship_date = new Date(detailEl.ship_date);
      nOrderDetails.status = detailEl.status;

      orderDetailsEntities.push(nOrderDetails);
    } // for End

    const nOrder = new Order();
    nOrder.order_number = rOrder.order_number;
    nOrder.customer_id = rOrder.customer_id;
    nOrder.shipper_id = rOrder.shipper_id;
    nOrder.order_date = new Date(rOrder.order_date);
    nOrder.required_date = new Date(rOrder.required_date);
    nOrder.ship_date = new Date(rOrder.ship_date);
    nOrder.freight = rOrder.freight;
    nOrder.status = rOrder.status;
    nOrder.order_details = orderDetailsEntities;
    
    try {
      const gOrder = await nOrder.save();
      console.log('gOrder: ', gOrder);
      return gOrder;
    } catch (error) {
      this.logger.error(
        `!> Failed to save order: ${JSON.stringify(rOrder)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to save order',
        origin: '@order.repository.ts',
        order: rOrder,
      });
    }

  } 
  
  
  // update: order, details without changing price to current price of product
  // TODO: Should defrentiate between Addmin and customer
  async rebuild( rOrder: UpdateOrderInput ): Promise<Order> {
    
    console.log('OrderRepository rOrder: ', rOrder);

    // Step One: fetch order
    const tuOrder = await Order.findOneOrFail({ 

      relations: ["order_details"],

      where: { order_id: rOrder.order_id },

    });

    // console.log('<rebuild| tuOrder| before_change >', tuOrder);

    // added by eager 
    delete tuOrder.customer;
    delete tuOrder.shipper;
    
    // step two: update order_details 
    // convert detailsacionDto to trnasaction Entity
    for (const detailEl of tuOrder.order_details) {

      const rDetail = rOrder?.order_details.find(d => d.order_details_id === detailEl.order_details_id);
      
      if(!rDetail) break;

      // we shouldn't allow to get extra field heart price, msrp 
      // TODO: some element can be update only by admin
      // TODO: some element only could be update under constraint
      Object.assign(detailEl, rDetail);
  
    } 

    // step three: update order
    delete rOrder.order_details;
    
    Object.assign(tuOrder, rOrder);

    console.log('<rebuild| tuOrder>', tuOrder);

    const uOrder = await Order.save(tuOrder);

    return await this.fetchById(uOrder.order_id);

  } 
  
  // X Depricated
  async rebuild0( rOrder: UpdateOrderInput ): Promise<Order> {
    console.log('OrderRepository rData: ', rOrder);

    const orderDetailsEntities: OrderDetails[] = [];

    // convert detailsacionDto to trnasaction Entity
    for (const detailEl of rOrder.order_details) {
      const nOrderDetails = new OrderDetails();
      nOrderDetails.order_details_id = detailEl.order_details_id;
      // nOrderDetails.product_id = detailEl.product_id;
      nOrderDetails.quantity = detailEl.quantity;
      nOrderDetails.shipper_id = detailEl.shipper_id;
      nOrderDetails.required_date = new Date(detailEl.required_date);
      nOrderDetails.ship_date = new Date(detailEl.ship_date);
      nOrderDetails.freight = detailEl.freight;
      nOrderDetails.status = detailEl.status;

      // fetch product's specific data from db
      // try {
      //   const fProduct = await Product.findOne(detailEl.product_id);
      //   nOrderDetails.msrp = fProduct.msrp;
      //   nOrderDetails.discount = fProduct.discount;
      //   nOrderDetails.price = fProduct.price;
      // } catch (error) {
      //   this.logger.warn(
      //     `!> Failed to update OrderDetails when fetch product by id: ${JSON.stringify(detailEl.product_id)};`
      //   );
      // }

      orderDetailsEntities.push(nOrderDetails);
    } // for End

    const nOrder = new Order();
    nOrder.order_id = rOrder.order_id;
    // nOrder.order_number = rOrder.order_number;
    // nOrder.customer_id = rOrder.customer_id;
    nOrder.shipper_id = rOrder.shipper_id;
    // nOrder.order_date = new Date(rOrder.order_date);
    nOrder.required_date = new Date(rOrder.required_date);
    nOrder.ship_date = new Date(rOrder.ship_date);
    nOrder.freight = rOrder.freight;
    nOrder.status = rOrder.status;
    nOrder.order_details = orderDetailsEntities;
    
    try {
      await nOrder.save();
      const fOrder = await Order.findOne(rOrder.order_id);
      console.log('fOrder: ', fOrder);
      return fOrder;
    } catch (error) {
      this.logger.error(
        `!> Failed to update order: ${JSON.stringify(rOrder)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to update order',
        origin: '@order.repository.ts',
        order: rOrder,
      });
    }

  } 


  async fetchById( rId: number ): Promise<Order> {

    const fOrder = await Order.findOne({ 
      relations: ["customer", "shipper", "order_details"],
      where: { address_id: rId },
    });

    console.log("<fetchById| fOrder>", fOrder);

    return fOrder;

  }
  
  // X depricated
  async fetchById0( rId: number ): Promise<Order> {
    console.log('OrderRepository rId: ', rId);

    try {
      const fOrder = await Order.findOne(rId);
      console.log('fOrder: ', fOrder);
      // const fcTree = await this.manager.getTreeRepository(Order).findTrees();
      // console.log('fcTree: ', fcTree);
      return fOrder;
    } catch (error) {
      this.logger.error(
        `!> Failed to fetch order by id: ${JSON.stringify(rId)} ;`,
         error.stack,
      );
      throw new InternalServerErrorException({
        message: '!> Failed to fetch order',
        origin: '@order.repository.ts',
        order_id: rId,
      });
    }
  }

}

// export class OrderRepositoryFake {
//   public async build(): Promise<void> {}
//   public async rebuild(): Promise<void> {}
//   public async fetchById(): Promise<void> {}
// }
