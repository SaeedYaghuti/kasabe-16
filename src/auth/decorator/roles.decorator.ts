import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Auth } from '../auth/auth.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
