"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_status_enum_1 = require("../../../../kasabe/models/order/order_status.enum");
const update_order_details_input_1 = require("../order_details/update.order_details.input");
exports.UpdateOrderInputs = [
    {
        order_id: 1,
        shipper_id: 2,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 0.25,
        status: order_status_enum_1.OrderStatus.PAID,
        order_details: update_order_details_input_1.UpdateOrderDetailsInputs.slice(0, 2),
    }
];
//# sourceMappingURL=update.orders.inputs.js.map