"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kasabe_1 = require("../../../../kasabe");
exports.UpdateOrderDetailsInputs = [
    {
        order_details_id: 1,
        quantity: 10,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 10.5,
        status: kasabe_1.OrderStatus.PACKAGED,
    },
    {
        order_details_id: 2,
        quantity: 20,
        shipper_id: 1,
        required_date: new Date(),
        ship_date: new Date(),
        freight: 20.5,
        status: kasabe_1.OrderStatus.PACKAGED,
    }
];
//# sourceMappingURL=update.order_details.input.js.map