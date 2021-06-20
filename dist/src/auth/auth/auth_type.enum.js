"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var AuthType;
(function (AuthType) {
    AuthType["CUSTOMER"] = "CUSTOMER";
    AuthType["SUPPLIER"] = "SUPPLIER";
    AuthType["SHIPPER"] = "SHIPPER";
    AuthType["ADMIN"] = "ADMIN";
    AuthType["EDITOR"] = "EDITOR";
    AuthType["ACCOUNTER"] = "ACCOUNTER";
    AuthType["CASHIER"] = "CASHIER";
    AuthType["SALESMAN"] = "SALESMAN";
    AuthType["SUBSCRIBED"] = "SUBSCRIBED";
    AuthType["MERCHANT"] = "MERCHANT";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
type_graphql_1.registerEnumType(AuthType, {
    name: "AuthType",
    description: "show auth type"
});
//# sourceMappingURL=auth_type.enum.js.map