"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_type_enum_1 = require("../../../auth/auth/auth_type.enum");
exports.BuildAuthInputs = [
    {
        authname: "saeid",
        password: "1234",
        auth_type: [auth_type_enum_1.AuthType.ADMIN]
    },
    {
        authname: "ibrahim",
        password: "1234",
        auth_type: [auth_type_enum_1.AuthType.MERCHANT]
    },
];
//# sourceMappingURL=build.auth.inputs.js.map