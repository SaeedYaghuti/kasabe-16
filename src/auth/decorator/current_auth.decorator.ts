import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../auth/auth.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext): Auth => {

    const ctx = GqlExecutionContext.create(context);
    const contxt = ctx.getContext();
    const req = contxt.req;
    const auth = req.auth;



    // console.log('<CurrentAuth| ctx>', ctx);
    // console.log('<CurrentAuth| contxt>', contxt);
    // console.log('<CurrentAuth| req>', req);
    console.log('<CurrentAuth| auth>', auth);
    
    return auth;
  },
);
