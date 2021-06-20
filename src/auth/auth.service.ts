import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthRepository } from './auth/auth.repository';
import { Auth } from './auth/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { json } from 'express';
import { CreateAuthInput } from './auth/dto/create.auth.input';
import { LoginAuthInput } from './auth/dto/login_auth.input';
import { UpdateAuthInput } from './auth/dto/update.auth.input';
import { LoginToken } from './auth/dto/login_token.type';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    // 👌 sign() to generate token
    private jwtService: JwtService,

    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
    
  ) {}

  async testQuery(message: string) {
    return await { message }
  }

  // equal to sign-up
  async build(auth: CreateAuthInput): Promise<Auth> {
      console.log('service build() is running');
      const gAuth = await this.authRepository.build(auth);
      console.log('service build() db resutlt auth:> ');
      console.log(gAuth);
      return gAuth;
  }

  async loginAuth( loginAuthInput: LoginAuthInput, ): Promise<LoginToken> {
      
      const authname = await this.authRepository.validateLoginInput(
          loginAuthInput,
      );

      if (!authname) {
          throw new UnauthorizedException('Invalid authname or password!');
      }

      const payload: JwtPayload = { authname };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
  }

  // ❓ not checked
  async rebuild(auth: UpdateAuthInput): Promise<Auth> {
      console.log('service rebuild() is running');
      const gAuth = await this.authRepository.rebuild(auth);
      console.log('service rebuild() db resutlt auth:> ');
      console.log(gAuth);
      return gAuth;
  }

  // ❓ not checked
  async fetchById ( rId: number ): Promise<Auth> {
      console.log('service fetchById() is running');
      const fAuth = await this.authRepository.fetchById(rId);
      console.log('service fetchById() db resutlt fAuth:> ');
      console.log(fAuth);
      return fAuth;
  }

    // X
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<Auth> {
      return this.authRepository.signUp(authCredentialsDto);
    }

    // X
    async signIn(
      authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
      const authname = await this.authRepository.validateAuthPassword(
        authCredentialsDto,
      );

      if (!authname) {
        throw new UnauthorizedException('Invalid authname or password!');
      }

      const payload: JwtPayload = { authname };
      const accessToken = await this.jwtService.sign(payload);

      this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

      return { accessToken };
    }
}
