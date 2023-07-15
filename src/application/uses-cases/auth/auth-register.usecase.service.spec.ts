import { Test } from '@nestjs/testing';

import { IUserRepository } from 'src/domain/repository/user.repository';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRegisterUseCase } from './auth-register.usecase.service';
import { IUSER_SHARED } from 'src/common/constants';
import { UserModel } from 'src/domain/models';
import { RegisterDto } from 'src/domain/dtos';

describe('AuthRegisterUseCase', () => {
  let useCase: AuthRegisterUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const userRepositoryMock: Partial<IUserRepository> = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthRegisterUseCase,
        {
          provide: IUSER_SHARED.IUSERREPOSITORY,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    useCase = moduleRef.get<AuthRegisterUseCase>(AuthRegisterUseCase);
    userRepository = moduleRef.get<IUserRepository>(
      IUSER_SHARED.IUSERREPOSITORY,
    );
  });

  describe('run', () => {
    const data: RegisterDto = {
      name: 'Dummy',
      email: 'test@example.com',
      password: '123456',
    };
    it('should throw BadRequestException if user already exists', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce({ email: 'test@example.com' });

      await expect(useCase.run(data)).rejects.toThrowError(HttpException);
      expect(findSpy).toHaveBeenCalledWith({ email: data.email });
    });

    it('should save user and return response', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce(null);
      const saveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce('response');
      const data: any = { email: 'test@example.com' };

      const result = await useCase.run(data);

      expect(findSpy).toHaveBeenCalledWith({ email: data.email });
      expect(saveSpy).toHaveBeenCalledWith(data);
      expect(result).toBe('response');
    });

    it('should throw HttpException if an error occurs', async () => {
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockRejectedValueOnce(new Error('Custom error'));
      const data: any = { email: 'test@example.com' };

      await expect(useCase.run(data)).rejects.toThrowError(HttpException);
      expect(findSpy).toHaveBeenCalledWith({ email: data.email });
    });
  });
});
