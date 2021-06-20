"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_status_enum_1 = require("../../../../kasabe/models/order/order_status.enum");
const create_order_details_inputs_1 = require("../order_details/create.order_details.inputs");
exports.CreateOrderInputs = [
    {
        order_number: "order01",
        customer_id: 1,
        shipper_id: 1,
        order_date: new Date(),
        required_date: new Date(),
        ship_date: new Date(),
        freight: 2.5,
        status: order_status_enum_1.OrderStatus.PENDING,
        order_details: create_order_details_inputs_1.CreateOrderDetailsInputs.slice(0, 2)
    }
];
//# sourceMappingURL=create.orders.inputs.js.map