import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/common/constants';

import { UserDto } from 'src/domain/dtos';

@Injectable()
export class AuthLoginAccessUseCase {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async run(data: UserDto): Promise<{ user: UserDto; accessToken: string }> {
    try {
      const { _id, ...user } = data;
      const payload = { sub: _id };
      const userLogin = new UserDto(user);
      const jwt = await this.jwtService.sign(payload, {
        secret: this.config.get<string>(JWT_SECRET),
      });
      return {
        user: userLogin,
        accessToken: jwt,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
