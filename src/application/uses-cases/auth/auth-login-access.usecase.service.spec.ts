import { Test } from '@nestjs/testing';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../../domain/dtos/user/user.dto';
import { AuthLoginAccessUseCase } from './auth-login-access.usecase.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigServiceMock, JwtServiceMock } from 'src/common/mock';
describe('AuthLoginAccessUseCase', () => {
  let authLoginAccessUseCase: AuthLoginAccessUseCase;
  let jwtService: JwtServiceMock;
  let config: ConfigServiceMock;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [AuthLoginAccessUseCase, JwtServiceMock, ConfigService],
    }).compile();

    authLoginAccessUseCase = moduleRef.get<AuthLoginAccessUseCase>(
      AuthLoginAccessUseCase,
    );
    jwtService = moduleRef.get<JwtService>(JwtService);
    config = moduleRef.get<ConfigService>(ConfigService);
  });
  describe('run', () => {
    const userData: UserDto = {
      _id: undefined,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    it('should call jwtService sign with correct parameters', async () => {
      const jwtServiceSpy = jest
        .spyOn(jwtService, 'sign')
        .mockReturnValue('testAccessToken');
      const configServiceSpy = jest
        .spyOn(config, 'get')
        .mockReturnValue('jwtSecret');
      const result = await authLoginAccessUseCase.run(userData);
      expect(result).toEqual({
        user: {
          _id: undefined,
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        accessToken: 'testAccessToken',
      });
      expect(config.get).toHaveBeenCalledWith('JWT_SECRET');
      //   expect(config.get).toBe('jwtSecret');
      expect(configServiceSpy).toHaveBeenCalledTimes(1);
      expect(jwtServiceSpy).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: undefined },
        { secret: 'jwtSecret' },
      );
    });
    it('should throw HttpException with HttpStatus.CONFLICT when an error occurs', async () => {
      const signSpy = jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new HttpException('error_dummy', HttpStatus.CONFLICT);
      });
      await expect(authLoginAccessUseCase.run(userData)).rejects.toThrowError(
        new HttpException('error_dummy', HttpStatus.CONFLICT),
      );
      signSpy.mockRestore();
    });
  });
});
