import { CreateOrderDetailsInput } from '../../../../kasabe/models/order_details/dto/create_order_details.input';
import { OrderStatus } from '../../../../kasabe/models/order/order_status.enum';

export const CreateOrderDetailsInputs: CreateOrderDetailsInput[] = [
    {
        // price => will be taken at run-time from product
        product_id: 1,
        quantity: 1,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 1.5,
        status: OrderStatus.PENDING,
    },
    {
        // price => will be taken at run-time from product
        product_id: 2,
        quantity: 2,
        shipper_id: 2,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 2.5,
        status: OrderStatus.PENDING,
    }
]
