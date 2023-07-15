import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  AuthLoginAccessUseCase,
  AuthRegisterUseCase,
  AuthService,
} from 'src/application/uses-cases';
import { MapperModule } from 'src/common/mappers/mapper.module';
import { MongoModule } from 'src/infrastructure/implementations/mongo';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWT_SECRET } from 'src/common/constants';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '1s' },
      }),
    }),
    MongoModule,
    MapperModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRegisterUseCase,
    AuthLoginAccessUseCase,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtService,
  ],
})
export class HttpAuthModule {}
