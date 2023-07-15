import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

class JwtServiceMock {
  sign(payload: any): string {
    return 'mockedAccessToken';
  }

  verify(token: string): any {
    return { sub: 'mockedUserId' };
  }
}

export const jwtServiceMock = {
  provide: JwtService,
  useClass: JwtServiceMock,
};
class ConfigServiceMock {
  get(key: string): any {
    if (key === 'JWT_SECRET') {
      return 'mockedConfigValue';
    }
    return null;
  }
}

export const configServiceMock = {
  provide: ConfigService,
  useClass: ConfigServiceMock,
};
