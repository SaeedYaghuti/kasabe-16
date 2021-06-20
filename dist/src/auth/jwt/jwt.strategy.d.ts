import { AuthRepository } from '../auth/auth.repository';
import { Auth } from '../auth/auth.entity';
import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthRepository);
    validate(payload: JwtPayload): Promise<Auth>;
}
export {};
