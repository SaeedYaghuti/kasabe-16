import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import * as config from 'config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthResolver } from './auth.resolver';

// const jwtConfig = config.get('jwt');


@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'auth',
      session: false,
    }),
    // 👌 sign() to create token
    JwtModule.register({
      // secret: process.env.JWT_SECRET || config.get('jwt.secret'),
      secret: 'topSecret51',
      // secret: 'topSecret51',
      signOptions: {
        // expiresIn: jwtConfig.expiresIn,
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }), 
  ],
  controllers: [],
  providers: [
    JwtStrategy, 

    AuthService, 
    AuthResolver,
  ],
  // exports: [JwtStrategy, PassportModule],
  // 👌 others can be able to import AuthModule
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
