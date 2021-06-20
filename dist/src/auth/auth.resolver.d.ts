import { Auth } from './auth/auth.entity';
import { AuthService } from './auth.service';
import { MessageType } from '../util/type/message.type';
import { CreateAuthInput } from './auth/dto/create.auth.input';
import { LoginAuthInput } from './auth/dto/login_auth.input';
import { LoginToken } from './role/dto/login_token.type';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    authTestQuery(message: string): Promise<MessageType>;
    authTestMutation(message: string): Promise<MessageType>;
    testGuardQuery(message: string): Promise<MessageType>;
    whoAmI(auth: Auth): Promise<Auth>;
    testAC(auth: Auth): Promise<Auth>;
    testRBAC(authRoles: any): Promise<string>;
    build(auth: CreateAuthInput): Promise<Auth>;
    loginAuth(loginAuthInput: LoginAuthInput): Promise<LoginToken>;
}
