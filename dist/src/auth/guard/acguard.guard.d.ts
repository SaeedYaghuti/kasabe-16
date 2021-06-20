import { ExecutionContext } from '@nestjs/common';
import { ACGuard } from 'nest-access-control';
import { Auth } from '../auth/auth.entity';
export declare class GqlACGuard extends ACGuard {
    protected getRequest(context: ExecutionContext): any;
    protected getAuth(context: ExecutionContext): Promise<Auth>;
}
