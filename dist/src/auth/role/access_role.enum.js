"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var AccessRole;
(function (AccessRole) {
    AccessRole["CUSTOMER"] = "CUSTOMER";
    AccessRole["SUPPLIER"] = "SUPPLIER";
    AccessRole["SHIPPER"] = "SHIPPER";
    AccessRole["STAFF"] = "STAFF";
})(AccessRole = exports.AccessRole || (exports.AccessRole = {}));
type_graphql_1.registerEnumType(AccessRole, {
    name: "AccessRole",
    description: "show auth role"
});
//# sourceMappingURL=access_role.enum.js.map