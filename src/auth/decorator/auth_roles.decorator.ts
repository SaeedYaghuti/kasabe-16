import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../auth/auth.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlAuthRoles = createParamDecorator(
  (data: string, context: ExecutionContext): Auth => {

    const ctx = GqlExecutionContext.create(context);
    const contxt = ctx.getContext();
    const req = contxt.req;

    const roles = data ? req.auth[data] : req.auth.roles;



    // console.log('<CurrentAuth| ctx>', ctx);
    // console.log('<CurrentAuth| contxt>', contxt);
    // console.log('<CurrentAuth| req>', req);
    console.log('<GqlAuthRoles| roles>', roles);
    
    return roles;
  },
);
