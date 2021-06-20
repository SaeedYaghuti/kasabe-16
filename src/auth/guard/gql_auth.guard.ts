import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
    
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

}