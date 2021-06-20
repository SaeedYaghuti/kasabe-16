"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentAuth = common_1.createParamDecorator((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const contxt = ctx.getContext();
    const req = contxt.req;
    const auth = req.auth;
    console.log('<CurrentAuth| auth>', auth);
    return auth;
});
//# sourceMappingURL=current_auth.decorator.js.map