"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nest_access_control_1 = require("nest-access-control");
let GqlACGuard = class GqlACGuard extends nest_access_control_1.ACGuard {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const cntxt = ctx.getContext();
        const req = cntxt.req;
        const args = ctx.getArgs();
        return req;
    }
    async getAuth(context) {
        const req = this.getRequest(context);
        return req.auth;
    }
};
GqlACGuard = __decorate([
    common_1.Injectable()
], GqlACGuard);
exports.GqlACGuard = GqlACGuard;
//# sourceMappingURL=acguard.guard.js.map