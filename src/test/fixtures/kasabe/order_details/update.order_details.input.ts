import { OrderStatus } from "../../../../kasabe";
import { UpdateOrderDetailsInput } from '../../../../kasabe';

export const UpdateOrderDetailsInputs: UpdateOrderDetailsInput[] = [
    {
        // price => will be taken at run-time from product
        order_details_id: 1,
        quantity: 10,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 10.5,
        status: OrderStatus.PACKAGED,
    },
    {
        // price => will be taken at run-time from product
        order_details_id: 2,
        quantity: 20,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 20.5,
        status: OrderStatus.PACKAGED,
    }
]
