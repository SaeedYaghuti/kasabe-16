"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_type_enum_1 = require("../../../auth/auth/auth_type.enum");
exports.AuthEntities = [
    {
        authname: "saeid",
        password: "1234",
        salt: "itsouldbesalt",
        auth_type: auth_type_enum_1.AuthType.ADMIN,
        roles: [auth_type_enum_1.AuthType.ADMIN]
    },
    {
        authname: "ibrahim",
        password: "1234",
        salt: "itsouldbesalt",
        auth_type: auth_type_enum_1.AuthType.MERCHANT,
        roles: [auth_type_enum_1.AuthType.MERCHANT]
    },
];
//# sourceMappingURL=auth.entities.js.map