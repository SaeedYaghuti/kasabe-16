"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_status_enum_1 = require("../../../../kasabe/models/order/order_status.enum");
exports.CreateOrderDetailsInputs = [
    {
        product_id: 1,
        quantity: 1,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 1.5,
        status: order_status_enum_1.OrderStatus.PENDING,
    },
    {
        product_id: 2,
        quantity: 2,
        shipper_id: 2,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 2.5,
        status: order_status_enum_1.OrderStatus.PENDING,
    }
];
//# sourceMappingURL=create.order_details.inputs.js.map