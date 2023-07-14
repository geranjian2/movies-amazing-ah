import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUSER_SHARED, JWT_SECRET } from 'src/common/constants';
import { UserMapper } from 'src/common/mappers';
import { UserDto } from 'src/domain/dtos';
import { IUserRepository } from 'src/domain/repository/user.repository';

@Injectable()
export class AuthLoginAccessUseCase {
  constructor(
    @Inject(IUSER_SHARED.IUSERREPOSITORY)
    private userRepository: IUserRepository,
    private userMapper: UserMapper,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async run(data: UserDto): Promise<{ user: UserDto; accessToken: string }> {
    try {
      const { _id, ...user } = data;
      const payload = { sub: _id };

      const userLogin = new UserDto(user);
      return {
        user: userLogin,
        accessToken: await this.jwtService.sign(payload, {
          secret: this.config.get<string>(JWT_SECRET),
        }),
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
