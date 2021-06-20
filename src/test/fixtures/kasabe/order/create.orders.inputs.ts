import { CreateOrderInput } from '../../../../kasabe/models/order/dto/create_order.input';
import { OrderStatus } from '../../../../kasabe/models/order/order_status.enum';
import { CreateOrderDetailsInputs } from '../order_details/create.order_details.inputs';

export const CreateOrderInputs: CreateOrderInput[] = [
    {
        order_number: "order01",
        customer_id: 1, 
        shipper_id: 1,
        order_date: new Date(),
        required_date: new Date(),
        ship_date: new Date(),
        freight: 2.5,
        status: OrderStatus.PENDING,
        order_details: CreateOrderDetailsInputs.slice(0,2) // 🎯 ToDo
    }
]
