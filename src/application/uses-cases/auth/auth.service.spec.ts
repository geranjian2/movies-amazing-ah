import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IUserRepository } from 'src/domain/repository/user.repository';
import { UserDto } from 'src/domain/dtos';
import { NotFoundException } from '@nestjs/common';
import { IUSER_SHARED } from 'src/common/constants';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const userRepositoryMock: Partial<IUserRepository> = {
      find: jest.fn(),
      findUserValidatePassword: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IUSER_SHARED.IUSERREPOSITORY,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userRepository = moduleRef.get<IUserRepository>(
      IUSER_SHARED.IUSERREPOSITORY,
    );
  });

  describe('validateUserById', () => {
    it('should return a UserDto when user is found', async () => {
      const user = { _id: 'userId', email: 'test@example.com' };
      const findSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce(user);

      const result = await authService.validateUserById('userId');

      expect(findSpy).toHaveBeenCalledWith({ _id: 'userId' });
      expect(result).toEqual(new UserDto(user));
    });
  });

  describe('validateUser', () => {
    it('should return a UserDto when user and password are valid', async () => {
      const user = { _id: 'userId', email: 'test@example.com' };
      const findUserValidatePasswordSpy = jest
        .spyOn(userRepository, 'findUserValidatePassword')
        .mockResolvedValueOnce(user);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(findUserValidatePasswordSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual(new UserDto(user));
    });

    it('should throw NotFoundException when user and password are incorrect', async () => {
      const findUserValidatePasswordSpy = jest
        .spyOn(userRepository, 'findUserValidatePassword')
        .mockResolvedValueOnce(null);

      await expect(
        authService.validateUser('test@example.com', 'password'),
      ).rejects.toThrowError(NotFoundException);

      expect(findUserValidatePasswordSpy).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
