import { OrderStatus } from '../../../../kasabe/models/order/order_status.enum';
import { UpdateOrderDetailsInputs } from '../order_details/update.order_details.input';
import { UpdateOrderInput } from '../../../../kasabe/models/order/dto/update_order.input';

export const UpdateOrderInputs: UpdateOrderInput[] = [
    {
        order_id: 1,
        shipper_id: 2,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 0.25,
        status: OrderStatus.PAID,
        order_details: UpdateOrderDetailsInputs.slice(0,2),
    }
]
