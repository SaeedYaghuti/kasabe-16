"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var PersonRole;
(function (PersonRole) {
    PersonRole["CUSTOMER"] = "CUSTOMER";
    PersonRole["SUPPLIER"] = "SUPPLIER";
    PersonRole["SHIPPER"] = "SHIPPER";
    PersonRole["STAFF"] = "STAFF";
})(PersonRole = exports.PersonRole || (exports.PersonRole = {}));
type_graphql_1.registerEnumType(PersonRole, {
    name: "PersonRole",
    description: "show person role"
});
//# sourceMappingURL=person_role.enum.js.map