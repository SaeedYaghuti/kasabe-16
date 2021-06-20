"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PACKAGED"] = "PACKAGED";
    OrderStatus["DELEVIRED"] = "DELEVIRED";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["CANCELED"] = "CANCELED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
type_graphql_1.registerEnumType(OrderStatus, {
    name: "OrderStatus",
    description: "show order status"
});
//# sourceMappingURL=order_status.enum.js.map