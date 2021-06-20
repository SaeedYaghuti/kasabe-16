import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads', }),
    AuthModule,
  ],
  providers: [
    FileService,
    // JwtStrategy,
  ],
  controllers: [FileController]
})
export class FileModule {}
