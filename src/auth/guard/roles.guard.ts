import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

const matchRole = (validRoles: string[], authRoles: string[]) => authRoles.some(role => validRoles.includes(role));

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        console.log('<RolesGuard| roles>', roles);

        if(!roles) {
            return true;
        }

        // const req = GqlExecutionContext.create(context).getContext().req;
        const req = this.getRequest(context);
        
        console.log('<RolesGuard| req>', req);

        const auth = req.auth;

        console.log('<RolesGuard| auth>', auth);

        return true;

        if(!auth?.roles) return false;

         

        return matchRole(roles, auth.roles);
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const cntxt = ctx.getContext();
        const req = cntxt.req;
        
        const args = ctx.getArgs();
        // console.log("<GqlAuthGuard| args>", args);
        // console.log("<GqlAuthGuard| cntxt>", cntxt);

        // console.log("<###GqlAuthGuard| req>", req);
        // console.log("<###GqlAuthGuard| req.body>", req.body);

        // console.log("<GqlAuthGuard| req.client>", req.client);


        return req;
    }

    // getRequest(context: ExecutionContext) {
    //     const ctx = GqlExecutionContext.create(context);
    //     const cntxt = ctx.getContext();
    //     const req = cntxt.req;
        
    //     const args = ctx.getArgs();
    //     console.log("<GqlAuthGuard| args>", args);
    //     // console.log("<GqlAuthGuard| cntxt>", cntxt);

    //     // console.log("<###GqlAuthGuard| req>", req);
    //     // console.log("<###GqlAuthGuard| req.body>", req.body);

    //     // console.log("<GqlAuthGuard| req.client>", req.client);


    //     return req;
    // }

}