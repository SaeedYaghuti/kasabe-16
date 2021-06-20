import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../auth/auth.repository';
import { Auth } from '../auth/auth.entity';
import * as config from 'config';
import { JwtPayload } from './jwt-payload.interface';

// const jwtConfig = config.get('jwt');

@Injectable()
// 🚧 step 1) JwtStrategy extract the token from AuthHeader
// 🚧 step 2) validate the token: if invalid current req will stop and send 401 Unautherized
// 🚧 step 3) calling validate() function; mybe auth is locked
// 🚧 step 4) append validate() return to req.auth 
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<Auth> {
    const { authname } = payload;

    // console.log('<jwt.strategy| validate| authname>', authname);

    const fAuth = await this.authRepository.findOne({ authname });

    // console.log('<jwt.strategy| validate| fAuth>', fAuth);

    if (!fAuth) {
      // throw new UnauthorizedException();
      throw new UnauthorizedException("<<jwt.strategy| validate| !fAuth is true>>");
      // throw new Error("<<jwt.strategy| validate| !fAuth is true>>");
    }

    return fAuth;
  }
}
