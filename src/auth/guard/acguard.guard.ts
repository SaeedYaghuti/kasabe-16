import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard } from 'nest-access-control';
import { Auth } from '../auth/auth.entity';

@Injectable()
export class GqlACGuard extends ACGuard {

    protected getRequest(context: ExecutionContext) {
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
    
    protected async getAuth(context: ExecutionContext): Promise<Auth> {

        const req = this.getRequest(context);

        return req.auth;
    }

}