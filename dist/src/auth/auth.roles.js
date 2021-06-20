"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_builder_class_1 = require("nest-access-control/roles-builder.class");
const auth_type_enum_1 = require("./auth/auth_type.enum");
exports.roles = new roles_builder_class_1.RolesBuilder();
exports.roles
    .grant(auth_type_enum_1.AuthType.CUSTOMER)
    .createOwn('video')
    .deleteOwn('video')
    .readAny('video')
    .createOwn('file')
    .deleteOwn('file')
    .readAny('file')
    .grant(auth_type_enum_1.AuthType.ADMIN)
    .extend(auth_type_enum_1.AuthType.CUSTOMER)
    .updateAny('video')
    .deleteAny('video');
//# sourceMappingURL=auth.roles.js.map