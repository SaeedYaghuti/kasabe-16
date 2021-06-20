"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GqlAuthRoles = common_1.createParamDecorator((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const contxt = ctx.getContext();
    const req = contxt.req;
    const roles = data ? req.auth[data] : req.auth.roles;
    console.log('<GqlAuthRoles| roles>', roles);
    return roles;
});
//# sourceMappingURL=auth_roles.decorator.js.map