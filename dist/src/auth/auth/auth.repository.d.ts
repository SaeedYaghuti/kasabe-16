import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { CreateAuthInput } from './dto/create.auth.input';
import { UpdateAuthInput } from './dto/update.auth.input';
import { LoginAuthInput } from './dto/login_auth.input';
export declare class AuthRepository extends Repository<Auth> {
    private logger;
    build(rAuth: CreateAuthInput): Promise<Auth>;
    validateLoginInput(loginAuthInput: LoginAuthInput): Promise<string>;
    rebuild(rAuth: UpdateAuthInput): Promise<Auth>;
    fetchById(rId: number): Promise<Auth>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<Auth>;
    validateAuthPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>;
}
