import { AuthRepository } from './auth/auth.repository';
import { Auth } from './auth/auth.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthInput } from './auth/dto/create.auth.input';
import { LoginAuthInput } from './auth/dto/login_auth.input';
import { UpdateAuthInput } from './auth/dto/update.auth.input';
import { LoginToken } from './auth/dto/login_token.type';
export declare class AuthService {
    private jwtService;
    private authRepository;
    private logger;
    constructor(jwtService: JwtService, authRepository: AuthRepository);
    testQuery(message: string): Promise<{
        message: string;
    }>;
    build(auth: CreateAuthInput): Promise<Auth>;
    loginAuth(loginAuthInput: LoginAuthInput): Promise<LoginToken>;
    rebuild(auth: UpdateAuthInput): Promise<Auth>;
    fetchById(rId: number): Promise<Auth>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<Auth>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
